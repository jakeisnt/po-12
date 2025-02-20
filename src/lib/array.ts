/**
 * Does the first array include any of the items in the second?
 */
const includes = <T>(arr1: T[], arr2: T[]) => {
  return arr2.some((item) => arr1.includes(item));
};

export { includes };
