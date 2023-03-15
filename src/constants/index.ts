const defaultIntervals = {
  work: 1500,
  "short break": 300,
  "long break": 900,
  "goal achieved": 0,
} as const;

export const defaultConfig = {
  intervals: defaultIntervals,
  workIntervalCountGoal: 0,
  isAutoNextEnabled: false,
  workIntervalsToLongBreak: 4,
} as const;
