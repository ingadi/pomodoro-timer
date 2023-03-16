import { useCallback, useEffect } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";

export function useWorkInterval(): [number, () => void] {
  const [{ day, count }, updateStoredWorkInterval] =
    useLocalStorage<WorkInterval>("work-interval", defaultWorkInterval);

  useEffect(() => {
    day !== getDay() && updateStoredWorkInterval(defaultWorkInterval);
  }, [day, updateStoredWorkInterval]);

  const incrementWorkIntervalCount = useCallback(() => {
    updateStoredWorkInterval({ day, count: count + 1 });
  }, [day, count, updateStoredWorkInterval]);

  return [count, incrementWorkIntervalCount];
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
