export type Config = {
  intervals: { [key: string]: number };
  pomodoroGoal: number;
  isAutoNextEnabled: boolean;
  pomodorosBeforeLongBreak: number;
};

// export type IntervalName = "short break" | "work" | "long break";
export type IntervalName = "short break" | "work" | "long break";
