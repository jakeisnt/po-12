/**
 * Fix a value between two others. (quantize).
 * @param min
 * @param max
 * @param val
 * @returns
 */
const fixBetween = (min: number, max: number, val: number) => {
  return Math.min(max, Math.max(min, val));
};

/**
 * Determine if a number is between two others.
 */
const isBetween = (num: number, lower: number, upper: number) =>
  num >= lower && num < upper;

export { fixBetween, isBetween };
