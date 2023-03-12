import { z } from "zod";
import Form from "@components/Form";
import styles from "./Settings.module.css";

export default function Settings({ onUpdate, onDone, config }: Props) {
  const {
    intervals,
    workIntervalCountGoal,
    workIntervalsToLongBreak,
    isAutoNextEnabled,
  } = config;

  function handleResetToDefaults() {
    // onUpdate(initialConfig);
  }

  const formControls = (
    <>
      <button type="submit">Submit</button>
      <button onClick={onDone} type="button">
        Cancel
      </button>
      <button onClick={handleResetToDefaults} type="button">
        Reset to defaults
      </button>
    </>
  );

  return (
    <Form
      onSubmit={(data) => {
        console.info(JSON.stringify(data));
        onDone();
      }}
      renderAfter={() => formControls}
      schema={SettingsSchema}
      props={{
        "pomo goals": {
          label: "Daily pomo goal",
          defaultValue: workIntervalCountGoal,
        },
        "work duration": {
          label: "Work duration",
          defaultValue: intervals.work,
        },
        "short break duration": {
          label: "Short break duration",
          defaultValue: intervals["short break"],
        },
        "long break duration": {
          label: "Long break duration",
          defaultValue: intervals["long break"],
        },
        "work intervals to long break": {
          label: "Work intervals before long break",
          defaultValue: workIntervalsToLongBreak,
        },
        "auto next": {
          label: "Enable auto next",
          defaultValue: isAutoNextEnabled,
        },
      }}
    />
  );
}
const SettingsSchema = z.object({
  "pomo goals": z.number(),
  "work duration": z.number(),
  "short break duration": z.number(),
  "long break duration": z.number(),
  "work intervals to long break": z.number(),
  "auto next": z.boolean(),
});

const intervals = {
  work: 25,
  "short break": 5,
  "long break": 15,
  "goal achieved": 0,
};

const initialConfig = {
  intervals,
  workIntervalCountGoal: 4,
  isAutoNextEnabled: true,
  workIntervalsToLongBreak: 4,
};

type Props = {
  onUpdate: (s: Config) => void;
  onDone: () => void;
  config: Config;
};

type Config = {
  intervals: { [key: string]: number };
  workIntervalCountGoal: number;
  isAutoNextEnabled: boolean;
  workIntervalsToLongBreak: number;
};
