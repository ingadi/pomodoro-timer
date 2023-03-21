import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useWorkIntervalCount(): [number, () => void] {
  const [{ day, count }, setWorkInterval] = useLocalStorage<WorkInterval>(
    "work-interval",
    defaultWorkInterval
  );

  useEffect(() => {
    day !== getDay() && setWorkInterval(defaultWorkInterval);
  }, [day, setWorkInterval]);

  function handleIncrementWorkIntervalCount() {
    setWorkInterval({ day, count: count + 1 });
  }

  return [count, handleIncrementWorkIntervalCount];
}

function getDay() {
  // Sunday - Saturday : 0 - 6
  return new Date().getDay() as Day;
}

const defaultWorkInterval = {
  day: getDay(),
  count: 0,
};

type WorkInterval = {
  day: Day;
  count: number;
};

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
