import styles from "./Settings.module.css";

export default function Settings({ onUpdate }: Props) {
  return (
    <>
      <p>Pomo goals</p>
      <p>Work duration</p>
      <p>Short break duration</p>
      <p>Long break duration</p>
      <p>Auto next</p>
    </>
  );
}

type Props = {
  onUpdate: (s: Config) => void;
};

type Config = {
  intervals: { [key: string]: number };
  workIntervalCountGoal: number;
  isAutoNextEnabled: boolean;
  workIntervalsToLongBreak: number;
};
