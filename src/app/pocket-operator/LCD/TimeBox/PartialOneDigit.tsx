import classes from "./timeBox.module.scss";

type PartialDigitProps = {
  active: boolean;
};

const PartialOneDigit = ({ active }: PartialDigitProps) => {
  return (
    <div className={classes.clockDigit}>
      <svg
        width="14"
        height="25"
        viewBox="0 0 14 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={active ? classes.visible : classes.hidden}
      >
        {/* top right */}
        <path d="M12 3V11L11 10V4L12 3Z" stroke="currentColor" />
        {/* bottom right */}
        <path d="M12 14V22L11 21V15L12 14Z" stroke="currentColor" />
      </svg>
    </div>
  );
};

export default PartialOneDigit;
