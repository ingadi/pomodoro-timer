import { useEffect, useState, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue === null
      ? initialValue
      : JSON.parse(storedValue, (_, value) =>
          value === "Infinity" ? Infinity : value
        );
  });

  const handleChangeStoredValue = useCallback(
    (value: T) => setStoredValue(value),
    []
  );

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify(storedValue, (_, value) =>
        value === Infinity ? "Infinity" : value
      )
    );
  }, [key, storedValue]);

  return [storedValue, handleChangeStoredValue];
}
