import { useEffect } from "react";

export function useTitle(title = "Pomodoro timer") {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
