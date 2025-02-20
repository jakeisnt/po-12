"use client";

import useTime from "@/hooks/useTime";
import { useState, useEffect } from "react";
import classes from "./timeBox.module.scss";
import { cn } from "@/lib/utils";
import PartialOneDigit from "./PartialOneDigit";
import ClockDigit from "./ClockDigit";

type TimeBoxProps = {
  bpm: number;
  selectedSound: number;
  playing: boolean;
};

/**
 * Handle displaying the BPM when needed.
 * @param bpm the current BPM.
 */
const useDisplayBPM = (bpm: number) => {
  const [displayBPM, setDisplayBPM] = useState(false);

  useEffect(() => {
    setDisplayBPM(true);
    const timeoutFn = setTimeout(() => setDisplayBPM(false), 2000);
    return () => {
      clearTimeout(timeoutFn);
    };
  }, [bpm]);

  return displayBPM;
};

/**
 * Display the time at the top left of the screen.
 */
const TimeBox = ({ bpm, selectedSound, playing }: TimeBoxProps) => {
  const { timeDigits, amPM } = useTime();
  const displayBPM = useDisplayBPM(bpm);
  const displaySelectedSound = playing && selectedSound;

  return (
    <div className={classes.timeBox}>
      {/** to avoid occupying extra space, TE has two vertical bars left
       * to represent a digit that is just a 1 if we need to prefix the time display with it */}
      <PartialOneDigit
        active={
          !!(!displayBPM && (displaySelectedSound || timeDigits[0] === 1))
        }
      />
      {displayBPM && (
        <>
          <ClockDigit digit={Math.floor(bpm / 100)} />
          <ClockDigit digit={Math.floor((bpm % 100) / 10)} />
          <ClockDigit digit={bpm % 10} />
        </>
      )}
      {!displayBPM && displaySelectedSound && (
        <>
          <ClockDigit digit={"-"} />
          <ClockDigit digit={Math.floor(Math.floor(selectedSound / 10))} />
          <ClockDigit digit={selectedSound % 10} />
        </>
      )}
      {!displayBPM && !displaySelectedSound && (
        <>
          <ClockDigit digit={timeDigits[1]} />
          <ClockDigit digit={timeDigits[2]} />
          <ClockDigit digit={timeDigits[3]} />
        </>
      )}
      <div className={classes.amPMContainer}>
        <div className={cn(classes.amPMBox)}>
          <div
            className={cn(
              classes.amPMText,
              amPM === "AM" ? classes.visible : classes.hidden
            )}
          >
            AM
          </div>
        </div>
        <div className={cn(classes.amPMBox)}>
          <div
            className={cn(
              classes.amPMText,
              amPM === "PM" ? classes.visible : classes.hidden
            )}
          >
            PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBox;
