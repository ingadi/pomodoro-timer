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

  const formValues = {
    "pomo goals": workIntervalCountGoal,
    "work duration": intervals["work"],
    "short break duration": intervals["short break"],
    "long break duration": intervals["long break"],
    "work intervals to long break": workIntervalsToLongBreak,
    "auto next": isAutoNextEnabled,
  };

  const form = useForm<z.infer<typeof SettingsSchema>>();
  const { reset } = form;

  function onReset(values: z.infer<typeof SettingsSchema>) {
    reset(values);
  }

  const formControls = (
    <div className={styles.controls}>
      <button onClick={() => onReset(defaultFormValues)} type="button">
        Use default settings
      </button>
      <button type="submit">Submit</button>
      <button
        onClick={() => {
          onReset(formValues);
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
      form={form}
      onSubmit={(data: z.infer<typeof SettingsSchema>) => {
        console.info(JSON.stringify(data));
        // onUpdate();
        onDone();
      }}
      renderAfter={() => formControls}
      schema={SettingsSchema}
      defaultValues={formValues}
    />
  );
}

// TODO: Derive placeholders from default config
const SettingsSchema = z.object({
  "pomo goals": z
    .number()
    .describe("Pomo goals // Infinity")
    .min(1, "Must be 1 or more"),
  "work duration": z
    .number()
    .describe("Work duration // 25")
    .min(25, "Must be 25 or more"),
  "short break duration": z
    .number()
    .describe("Short break duration // 25")
    .min(5, "Must be 5 or more"),
  "long break duration": z
    .number()
    .describe("Long break duration // 15")
    .min(15, "Must be 15 or more"),
  "work intervals to long break": z
    .number()
    .describe("Work interwvals before long break // 4")
    .min(2, "Must be 2 or more"),
  "auto next": z.boolean().describe("Auto next"),
});

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
