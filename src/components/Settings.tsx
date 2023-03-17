import { z } from "zod";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import Form from "@components/Form";
import { Config } from "@types";
import { defaultConfig } from "@constants";
import styles from "./Settings.module.css";

export default function Settings({ config, onUpdate, onDone }: Props) {
  const {
    intervals,
    workIntervalCountGoal,
    workIntervalsToLongBreak,
    isAutoNextEnabled,
  } = config;

  const initialFormValues = {
    "pomo goals": workIntervalCountGoal,
    "work duration": toMinutes(intervals["work"]),
    "short break duration": toMinutes(intervals["short break"]),
    "long break duration": toMinutes(intervals["long break"]),
    "work intervals to long break": workIntervalsToLongBreak,
    "auto next": isAutoNextEnabled,
  };

  const SettingsForm = useForm<FormValues>();
  const { reset } = SettingsForm;

  const formControls = (
    <div className={styles.controls}>
      <button
        className={styles.button}
        onClick={() => reset(defaultFormValues)}
        type="button"
      >
        Use default settings
      </button>
      <div className={styles.primary}>
        <button className={styles.button} onClick={onDone} type="button">
          Cancel
        </button>
        <button
          className={`${styles.button} ${styles["button-primary"]}`}
          type="submit"
        >
          Save changes
        </button>
      </div>
    </div>
  );

  return (
    <section className={styles.settings}>
      <header className={styles.header}>
        <h2>Settings</h2>
        <button className={styles.close} type="button" onClick={onDone}>
          <AiFillCloseCircle />
        </button>
      </header>
      <Form
        form={SettingsForm}
        schema={SettingsSchema}
        onSubmit={(data: z.infer<typeof SettingsSchema>) => {
          onUpdate(toConfig(data));
          onDone();
        }}
        renderAfter={() => formControls}
        props={{
          "work duration": {
            subLabel: "Mins",
          },
          "short break duration": {
            subLabel: "Mins",
          },
          "long break duration": {
            subLabel: "Mins",
          },
        }}
        defaultValues={initialFormValues}
      />
    </section>
  );
}

function toConfig(data: z.infer<typeof SettingsSchema>): Config {
  return {
    intervals: {
      work: toSeconds(data["work duration"]),
      "short break": toSeconds(data["short break duration"]),
      "long break": toSeconds(data["long break duration"]),
      "goal achieved": 0,
    },
    workIntervalCountGoal: data["pomo goals"],
    isAutoNextEnabled: data["auto next"],
    workIntervalsToLongBreak: data["work intervals to long break"],
  };
}

function toSeconds(minutes: number) {
  return minutes * 60;
}

function toMinutes(seconds: number) {
  return Math.floor(seconds / 60);
}

const defaultFormValues = {
  "pomo goals": defaultConfig.workIntervalCountGoal,
  "work duration": toMinutes(defaultConfig.intervals["work"]),
  "short break duration": toMinutes(defaultConfig.intervals["short break"]),
  "long break duration": toMinutes(defaultConfig.intervals["long break"]),
  "work intervals to long break": defaultConfig.workIntervalsToLongBreak,
  "auto next": defaultConfig.isAutoNextEnabled,
};

const SettingsSchema = z.object({
  "work duration": z
    .number()
    .describe(`Work duration // ${defaultFormValues["work duration"]}`)
    .min(25, "Must be 25 or more")
    .max(60, "Must be 60 or less"),
  "short break duration": z
    .number()
    .describe(
      `Short break duration // ${defaultFormValues["short break duration"]}`
    )
    .min(5, "Must be 5 or more")
    .max(60, "Must be 60 or less"),
  "long break duration": z
    .number()
    .describe(
      `Long break duration // ${defaultFormValues["long break duration"]}`
    )
    .min(15, "Must be 15 or more")
    .max(60, "Must be 60 or less"),
  "work intervals to long break": z
    .number()
    .describe(
      `Work intervals before long break // ${defaultFormValues["work intervals to long break"]}`
    )
    .min(2, "Must be 2 or more")
    .max(60, "Must be 60 or less"),
  "pomo goals": z
    .number()
    .describe(`Daily work intervals goal // ${defaultFormValues["pomo goals"]}`)
    .min(0),
  "auto next": z.boolean().describe("Auto next"),
});

type Props = {
  config: Config;
  onUpdate: (s: Config) => void;
  onDone: () => void;
};

type FormValues = z.infer<typeof SettingsSchema>;
