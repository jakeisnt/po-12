import classes from "./timeBox.module.scss";

const digitMap = {
  default: [0, 0, 0, 0, 0, 0, 0],
  0: [1, 1, 1, 0, 1, 1, 1],
  1: [0, 0, 0, 0, 1, 1, 0],
  2: [1, 0, 1, 1, 1, 0, 1],
  3: [1, 0, 0, 1, 1, 1, 1],
  4: [0, 1, 0, 1, 1, 1, 0],
  5: [1, 1, 0, 1, 0, 1, 1],
  6: [1, 1, 1, 1, 0, 1, 1],
  7: [1, 0, 0, 0, 1, 1, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 0, 1, 1, 1, 0],
  "-": [0, 0, 0, 1, 0, 0, 0],
};

/**
 * A single digit in a clock.
 */
const ClockDigit = ({ digit }: { digit: number | "-" }) => {
  const digitArray = digit !== undefined ? digitMap[digit] : digitMap.default;

  return (
    <div className={classes.clockDigit}>
      <svg
        width="14"
        height="25"
        viewBox="0 0 14 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* top */}
        <path
          d="M3 2L11 2L10 3L4 3L3 2Z"
          stroke="currentColor"
          className={digitArray[0] ? classes.visible : classes.hidden}
        />
        {/* top left */}
        <path
          d="M2 11L2 3L3 4L3 10L2 11Z"
          stroke="currentColor"
          className={digitArray[1] ? classes.visible : classes.hidden}
        />
        {/* bottom left */}
        <path
          d="M2 22L2 14L3 15L3 21L2 22Z"
          stroke="currentColor"
          className={digitArray[2] ? classes.visible : classes.hidden}
        />
        {/* middle */}
        <path
          d="M4 13.5L3 12.5L4 11.5H10L11 12.5L10 13.5H4Z"
          fill="currentColor"
          stroke="currentColor"
          className={digitArray[3] ? classes.visible : classes.hidden}
        />
        {/* top right */}
        <path
          d="M12 3V11L11 10V4L12 3Z"
          stroke="currentColor"
          className={digitArray[4] ? classes.visible : classes.hidden}
        />
        {/* bottom right */}
        <path
          d="M12 14V22L11 21V15L12 14Z"
          stroke="currentColor"
          className={digitArray[5] ? classes.visible : classes.hidden}
        />
        {/* bottom */}
        <path
          d="M11 23L3 23L4 22L10 22L11 23Z"
          stroke="currentColor"
          className={digitArray[6] ? classes.visible : classes.hidden}
        />
      </svg>
    </div>
  );
};

export default ClockDigit;
