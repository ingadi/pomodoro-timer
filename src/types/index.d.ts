export type Config = {
  intervals: { [key: string]: number };
  pomodoroGoal: number;
  isAutoNextEnabled: boolean;
  pomodorosBeforeLongBreak: number;
};

export type IntervalName =
  | "work"
  | "short break"
  | "long break"
  | "goal achievement";
