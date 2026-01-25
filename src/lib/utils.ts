import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nullthrows<T>(
  value: T | null | undefined,
  message?: string,
): NonNullable<T> {
  if (value != null) {
    return value;
  }
  throw new TypeError(
    message ?? `Expected value not to be null or undefined but got ${value}`,
  );
}

export type OptionalWrapper<T> = {
  value: T;
  exists: boolean;
};
