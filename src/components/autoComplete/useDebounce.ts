import { useEffect, useRef } from 'react';

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

export default function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay: number = 500
) {
  const timerRef = useRef<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timerRef.current);
    timerRef.current = newTimer;
  }) as Func;

  useEffect(() => {
    return () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFunction;
}
