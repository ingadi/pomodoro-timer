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
    pomodoroGoal,
    pomodorosBeforeLongBreak,
    isAutoNextEnabled,
  } = config;

  const initialFormValues = {
    "daily pomodoro goal": pomodoroGoal,
    "work duration": toMinutes(intervals["work"]),
    "short break duration": toMinutes(intervals["short break"]),
    "long break duration": toMinutes(intervals["long break"]),
    "pomodoros before long break": pomodorosBeforeLongBreak,
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
    },
    pomodoroGoal: data["daily pomodoro goal"],
    isAutoNextEnabled: data["auto next"],
    pomodorosBeforeLongBreak: data["pomodoros before long break"],
  };
}

function toSeconds(minutes: number) {
  return minutes * 60;
}

function toMinutes(seconds: number) {
  return Math.floor(seconds / 60);
}

const defaultFormValues = {
  "daily pomodoro goal": defaultConfig.pomodoroGoal,
  "work duration": toMinutes(defaultConfig.intervals["work"]),
  "short break duration": toMinutes(defaultConfig.intervals["short break"]),
  "long break duration": toMinutes(defaultConfig.intervals["long break"]),
  "work intervals before long break": defaultConfig.pomodorosBeforeLongBreak,
  "auto next": defaultConfig.isAutoNextEnabled,
};

const SettingsSchema = z.object({
  "work duration": z
    .number({ invalid_type_error: "Required" })
    .describe(
      `Work duration (Pomodoro) // ${defaultFormValues["work duration"]}`
    )
    .min(1, "Must be 1 more"),
  "short break duration": z
    .number({ invalid_type_error: "Required" })
    .describe(
      `Short break duration // ${defaultFormValues["short break duration"]}`
    )
    .min(1, "Must be 1 or more"),
  "long break duration": z
    .number({ invalid_type_error: "Required" })
    .describe(
      `Long break duration // ${defaultFormValues["long break duration"]}`
    )
    .min(1, "Must be 1 or more"),
  "pomodoros before long break": z
    .number({ invalid_type_error: "Required" })
    .describe(
      `Pomodoros before long break // ${defaultFormValues["work intervals before long break"]}`
    )
    .min(1, "Must be 1 or more"),
  "daily pomodoro goal": z
    .number({ invalid_type_error: "Required" })
    .describe(
      `Daily pomodoro goal // ${defaultFormValues["daily pomodoro goal"]}`
    )
    .min(0),
  "auto next": z.boolean().describe("Auto next"),
});

type Props = {
  config: Config;
  onUpdate: (s: Config) => void;
  onDone: () => void;
};

type FormValues = z.infer<typeof SettingsSchema>;
