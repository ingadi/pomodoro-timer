import { useEffect } from "react";

export function useTimer(isActive: boolean, onTick: () => void) {
  useEffect(() => {
    const intervalId = isActive ? setInterval(onTick, 1000) : undefined;
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);
}
