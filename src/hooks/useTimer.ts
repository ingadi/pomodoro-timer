import { useEffect } from "react";

//TODO: add effect event

export function useTimer(isActive: boolean, onTick: () => void, delay = 1000) {
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(onTick, delay);
    return () => clearInterval(interval);
  }, [onTick, delay, isActive]);
}
