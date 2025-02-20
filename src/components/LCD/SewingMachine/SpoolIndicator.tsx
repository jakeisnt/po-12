import { isBetween } from "@/lib/math";

import classes from "../lcd.module.scss";

const SpoolIndicator = ({ currentBeat }: { currentBeat: number }) => {
  const beatOp = currentBeat % 7;

  let activeIndex = 0;
  if (isBetween(beatOp, 0, 2)) {
    activeIndex = 0;
  } else if (isBetween(beatOp, 2, 3) || isBetween(beatOp, 6, 7)) {
    activeIndex = 1;
  } else if (isBetween(beatOp, 3, 4) || isBetween(beatOp, 5, 6)) {
    activeIndex = 2;
  } else if (isBetween(beatOp, 4, 5)) {
    activeIndex = 3;
  }

  return (
    <>
      <path
        d="M13.5 26H16.5V27.5H13.5V26Z"
        fill="currentColor"
        className={activeIndex === 0 ? classes.visible : classes.hidden}
      />
      <path
        d="M13.5 29H16.5V30.5H13.5V29Z"
        fill="currentColor"
        className={activeIndex === 1 ? classes.visible : classes.hidden}
      />
      <path
        d="M13.5 32H16.5V33.5H13.5V32Z"
        fill="currentColor"
        className={activeIndex === 2 ? classes.visible : classes.hidden}
      />

      <path
        d="M13.5 35H16.5V36.5H13.5V35Z"
        fill="currentColor"
        className={activeIndex === 3 ? classes.visible : classes.hidden}
      />
    </>
  );
};

export default SpoolIndicator;
