import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IntervalName } from "@types";
import { defaultIntervals } from "@constants";

export function useIntervalData(): [
  IntervalData,
  (name: IntervalName) => void
] {
  const [intervalSessionData, setIntervalSessionData] = useLocalStorage(
    "interval-session",
    defaultIntervalData
  );

  const { day, intervals } = intervalSessionData;

  useEffect(() => {
    day !== getDay() && setIntervalSessionData(defaultIntervalData);
  }, [day, setIntervalSessionData]);

  function handleIntervalDataIncrement(intervalName: IntervalName) {
    setIntervalSessionData({
      day,
      intervals: {
        ...intervals,
        [intervalName]: {
          count: intervals[intervalName].count + 1,
          duration:
            intervals[intervalName].duration + defaultIntervals[intervalName],
        },
      },
    });
  }

  return [intervals, handleIntervalDataIncrement];
}

function getDay() {
  // Sunday - Saturday : 0 - 6
  return new Date().getDay() as Day;
}

const defaultIntervalData = {
  day: getDay(),
  intervals: {
    work: { count: 0, duration: 0 },
    "short break": { count: 0, duration: 0 },
    "long break": { count: 0, duration: 0 },
  },
};

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type IntervalData = typeof defaultIntervalData.intervals;
