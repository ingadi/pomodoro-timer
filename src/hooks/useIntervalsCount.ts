import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IntervalName } from "@types";

export function useIntervalsCount(): [
  { [key: string]: number },
  (arg: IntervalName) => void
] {
  const [{ day, count }, setIntervalsCount] = useLocalStorage(
    "intervals-count",
    defaultIntervalsCount
  );

  useEffect(() => {
    day !== getDay() && setIntervalsCount(defaultIntervalsCount);
  }, [day, setIntervalsCount]);

  function handleIntervalsCountIncrement(intervalName: IntervalName) {
    setIntervalsCount({
      day,
      count: { ...count, [intervalName]: count[intervalName] + 1 },
    });
  }

  return [count, handleIntervalsCountIncrement];
}

function getDay() {
  // Sunday - Saturday : 0 - 6
  return new Date().getDay() as Day;
}

const defaultIntervalsCount = {
  day: getDay(),
  count: {
    work: 0,
    "short break": 0,
    "long break": 0,
  },
};

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
