import { useEffect, useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

/**
 * Hook that manages a value in localStorage
 * @param key - The key to store the value under
 * @param initialValue - The initial value to store
 * @returns [value, setValue]
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item));
    }

    // the key should never change
    // eslint-disable-next-line react-_hooks/exhaustive-deps
  }, []);

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      setStoredValue((curValue) => {
        const newValue = value instanceof Function ? value(curValue) : value;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
        return newValue;
      });
    },
    // the key should never change
    // eslint-disable-next-line react-_hooks/exhaustive-deps
    []
  );

  return [storedValue, setValue];
};

export { useLocalStorage };
