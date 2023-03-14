import { useCallback, useEffect, useMemo } from "react";
import { z } from "zod";
import Form from "@components/Form";
import styles from "./Settings.module.css";
import { useForm } from "react-hook-form";

export default function Settings({ onUpdate, onDone, config }: Props) {
  const {
    intervals,
    workIntervalCountGoal,
    workIntervalsToLongBreak,
    isAutoNextEnabled,
  } = config;

  const workDuration = intervals["work"];
  const shortBreakDuration = intervals["short break"];
  const longBreakDuration = intervals["long break"];

  const initialFormValues = useMemo(
    () => ({
      "pomo goals": workIntervalCountGoal,
      "work duration": toMinutes(workDuration),
      "short break duration": toMinutes(shortBreakDuration),
      "long break duration": toMinutes(longBreakDuration),
      "work intervals to long break": workIntervalsToLongBreak,
      "auto next": isAutoNextEnabled,
    }),
    [
      workDuration,
      shortBreakDuration,
      longBreakDuration,
      isAutoNextEnabled,
      workIntervalCountGoal,
      workIntervalsToLongBreak,
    ]
  );

  const SettingsForm = useForm<z.infer<typeof SettingsSchema>>();
  const { reset } = SettingsForm;

  const onReset = useCallback(
    (values: z.infer<typeof SettingsSchema>) => reset(values),
    [reset]
  );

  useEffect(() => {
    onReset(initialFormValues);
  }, [initialFormValues, onReset]);

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
      // defaultValues={formValues}
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

// TODO: Move to constants and import
const initialIntervals = {
  work: 25,
  "short break": 5,
  "long break": 15,
  "goal achieved": 0,
};

const initialConfig = {
  intervals: initialIntervals,
  workIntervalCountGoal: 4,
  isAutoNextEnabled: true,
  workIntervalsToLongBreak: 4,
};

const defaultFormValues = {
  "pomo goals": initialConfig.workIntervalCountGoal,
  "work duration": initialConfig.intervals["work"],
  "short break duration": initialConfig.intervals["short break"],
  "long break duration": initialConfig.intervals["long break"],
  "work intervals to long break": initialConfig.workIntervalsToLongBreak,
  "auto next": initialConfig.isAutoNextEnabled,
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

// TODO: Move to types and import
type Config = {
  intervals: { [key: string]: number };
  workIntervalCountGoal: number;
  isAutoNextEnabled: boolean;
  workIntervalsToLongBreak: number;
};
