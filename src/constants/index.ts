const defaultIntervals = {
  work: 1500,
  "short break": 300,
  "long break": 900,
} as const;

export const defaultConfig = {
  intervals: defaultIntervals,
  pomodoroGoal: 0,
  isAutoNextEnabled: false,
  pomodorosBeforeLongBreak: 4,
} as const;
