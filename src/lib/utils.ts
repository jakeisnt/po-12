type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, unknown>;

/**
 * Merge class names
 * @param inputs - Class names to merge
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(input.toString());
    } else if (Array.isArray(input)) {
      classes.push(cn(...input));
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

/**
 * Check if the device is a touch device
 * @returns True if the device is a touch device
 */
export const isTouchDevice = () =>
  (typeof window !== "undefined" && "ontouchstart" in window) ||
  (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);


enum SelectingMode {
  SOUND = "sound",
  PATTERN = "pattern",
  DEFAULT = "default",
}

const oneOver8 = 0.125;
const oneOver16 = 0.0625;

type AnimationState = {
  hittingKick: boolean;
  hittingHighHat: boolean;
  hittingDrum: boolean;
  finishedHittingDrum: boolean;
  hittingClap: boolean;
  finishedHittingClap: boolean;
  hittingBell1: boolean;
  hittingBell2: boolean;
};

export type { AnimationState };

export { SelectingMode, oneOver16, oneOver8 };
