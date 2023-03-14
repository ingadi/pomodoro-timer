import { z } from "zod";
import { useForm } from "react-hook-form";
import Form from "@components/Form";
import { Config } from "@types";
import { defaultConfig } from "@constants";
import styles from "./Settings.module.css";

export default function Settings({ onUpdate, onDone, config }: Props) {
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

  function onReset(formValues: FormValues) {
    reset(formValues);
  }

  const formControls = (
    <div className={styles.controls}>
      <button onClick={() => onReset(defaultFormValues)} type="button">
        Use default settings
      </button>
      <button type="submit">Submit</button>
      <button
        onClick={() => {
          onReset(initialFormValues);
          onDone();
        }}
        type="button"
      >
        Cancel
      </button>
    </div>
  );

  return (
    <Form
      form={SettingsForm}
      schema={SettingsSchema}
      onSubmit={(data: z.infer<typeof SettingsSchema>) => {
        console.info(JSON.stringify(data));
        onUpdate(toConfig(data));
        onDone();
      }}
      renderAfter={() => formControls}
      defaultValues={initialFormValues}
    />
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
  "pomo goals": z
    .number()
    .describe(`Pomo goals // ${defaultFormValues["pomo goals"]}`)
    .min(1, "Must be 1 or more"),
  "work duration": z
    .number()
    .describe(`Work duration // ${defaultFormValues["work duration"]}`)
    .min(25, "Must be 25 or more"),
  "short break duration": z
    .number()
    .describe(
      `Short break duration // ${defaultFormValues["short break duration"]}`
    )
    .min(5, "Must be 5 or more"),
  "long break duration": z
    .number()
    .describe(
      `Long break duration // ${defaultFormValues["long break duration"]}`
    )
    .min(15, "Must be 15 or more"),
  "work intervals to long break": z
    .number()
    .describe(
      `Work intervals before long break // ${defaultFormValues["work intervals to long break"]}`
    )
    .min(2, "Must be 2 or more"),
  "auto next": z.boolean().describe("Enable auto next"),
});

type Props = {
  onUpdate: (s: Config) => void;
  onDone: () => void;
  config: Config;
};

type FormValues = z.infer<typeof SettingsSchema>;
