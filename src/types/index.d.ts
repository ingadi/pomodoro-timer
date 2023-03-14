export type Config = {
  intervals: { [key: string]: number };
  workIntervalCountGoal: number;
  isAutoNextEnabled: boolean;
  workIntervalsToLongBreak: number;
};

export type IntervalName =
  | "work"
  | "short break"
  | "long break"
  | "goal achieved";
