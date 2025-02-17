import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTouchDevice = () =>
  (typeof window !== "undefined" && "ontouchstart" in window) ||
  (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
