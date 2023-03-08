import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? initialValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  function handleChangeStoredValue(value: unknown) {
    setStoredValue(value);
  }

  return [storedValue, handleChangeStoredValue];
}
