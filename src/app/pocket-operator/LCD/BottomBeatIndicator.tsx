import classes from "./lcd.module.scss";
import { cn } from "../../lib/utils";

type BottomBeatIndicatorProps = {
  numBeats?: number;
  currentBeat: number;
};

const BottomBeatIndicator = ({
  numBeats = 16,
  currentBeat,
}: BottomBeatIndicatorProps) => {
  return (
    <div className={classes.beatsContainer}>
      {Array.from(Array(numBeats).keys()).map((beat) => (
        <div
          className={cn(
            classes.beat,
            Math.floor(currentBeat % 16) === beat
              ? classes.active
              : classes.hidden
          )}
          key={beat}
        />
      ))}
      <div />
    </div>
  );
};

export default BottomBeatIndicator;
