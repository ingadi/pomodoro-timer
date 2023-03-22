import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export function usePomodoroCount(): [number, () => void] {
  const [{ day, count }, setWorkInterval] = useLocalStorage<PomodoroCount>(
    "pomodoro-count",
    defaultPomodoroCount
  );

  useEffect(() => {
    day !== getDay() && setWorkInterval(defaultPomodoroCount);
  }, [day, setWorkInterval]);

  function handleIncrementPomodoroCount() {
    setWorkInterval({ day, count: count + 1 });
  }

  return [count, handleIncrementPomodoroCount];
}

function getDay() {
  // Sunday - Saturday : 0 - 6
  return new Date().getDay() as Day;
}

const defaultPomodoroCount = {
  day: getDay(),
  count: 0,
};

type PomodoroCount = {
  day: Day;
  count: number;
};

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
