import { isBetween } from "@/lib/math";

import classes from "../lcd.module.scss";

const SpoolFeeder = ({
  currentBeat,
  playing,
}: {
  currentBeat: number;
  playing: boolean;
}) => {
  let inactiveIndex;

  if (playing) {
    if (isBetween(currentBeat % 8, 7, 8)) {
      inactiveIndex = 7;
    } else if (isBetween(currentBeat % 8, 6, 7)) {
      inactiveIndex = 6;
    } else if (isBetween(currentBeat % 8, 5, 6)) {
      inactiveIndex = 5;
    } else if (isBetween(currentBeat % 8, 4, 5)) {
      inactiveIndex = 4;
    } else if (isBetween(currentBeat % 8, 3, 4)) {
      inactiveIndex = 3;
    } else if (isBetween(currentBeat % 8, 2, 3)) {
      inactiveIndex = 2;
    } else if (isBetween(currentBeat % 8, 1, 2)) {
      inactiveIndex = 1;
    } else {
      inactiveIndex = 0;
    }
  }

  return (
    <>
      {/* spool feeder string */}
      <path
        d="M25.5 15H27V16.5H25.5V15Z"
        fill="currentColor"
        className={inactiveIndex === 7 ? classes.hidden : classes.visible}
      />
      <path
        d="M26 13.75V12.84C26 12.5978 26.0879 12.3638 26.2474 12.1815L27.2012 11.0915C27.3911 10.8745 27.6654 10.75 27.9538 10.75H30"
        stroke="currentColor"
        strokeWidth="1.5"
        className={inactiveIndex === 6 ? classes.hidden : classes.visible}
      />

      <path
        d="M32 10H36.5V11.5H32V10Z"
        fill="currentColor"
        className={inactiveIndex === 5 ? classes.hidden : classes.visible}
      />
      <path
        d="M38 10H42.5V11.5H38V10Z"
        fill="currentColor"
        className={inactiveIndex === 4 ? classes.hidden : classes.visible}
      />
      <path
        d="M44 10H48.5V11.5H44V10Z"
        fill="currentColor"
        className={inactiveIndex === 3 ? classes.hidden : classes.visible}
      />

      <path
        d="M50 10H54.5V11.5H50V10Z"
        fill="currentColor"
        className={inactiveIndex === 2 ? classes.hidden : classes.visible}
      />

      <path
        d="M56 10H60.5V11.5H56V10Z"
        fill="currentColor"
        className={inactiveIndex === 1 ? classes.hidden : classes.visible}
      />
      <path
        d="M62 10H66.5V11.5H62V10Z"
        fill="currentColor"
        className={inactiveIndex === 0 ? classes.hidden : classes.visible}
      />
    </>
  );
};

export default SpoolFeeder;
