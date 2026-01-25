import { useEffect, useRef } from "react";

export default function usePrevious<T>(val: T): T | undefined {
  const ref = useRef<undefined | T>(undefined);
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
}
