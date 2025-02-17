import classes from "./knob.module.scss";
import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction, useState } from "react";

type POKnob = {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  minLevel?: number;
  maxLevel?: number;
  knobStartAngle?: number;
  knobEndAngle?: number;
  className?: string;
};

/**
 * Draggable knob.
 *
 * Maps a discrete 'level' to a continuous turning knob.
 * sets min and max angles for the knob to turn between
 * that correspond to the provided minLevel and maxLevel.
 *
 * <level> must support floats -> external component's
 * responsibility to round to nearest integer if necessary.
 */
const POKnob = ({
  level,
  setLevel,
  minLevel = 0,
  maxLevel = 8,
  knobStartAngle = 90,
  knobEndAngle = 270,
  className,
}: POKnob) => {
  const [isActivelyRotating, setIsActivelyRotating] = useState(false);

  const rotation = (level / maxLevel) * knobEndAngle + knobStartAngle;

  const setRotation = (rotation: number) => {
    const level = ((rotation - knobStartAngle) / knobEndAngle) * maxLevel;

    // setLevel(Math.max(Math.min(level, maxLevel), minLevel))
    setLevel((prevLevel: number) => {
      // if we cross over a whole number (level), send a slight 'ticking' vibration
      // if (Math.floor(level) !== Math.floor(prevLevel)) {
      //   typeof navigator !== "undefined" && navigator?.vibrate?.(50);
      // }

      return Math.max(Math.min(level, maxLevel), minLevel);
    });
  };

  return (
    <div
      className={cn(
        classes.knobContainer,
        "pocketOperatorMouseTarget",
        className
      )}
      onTouchStart={(e) => {
        e.preventDefault();
        const start = e.touches[0].clientY;
        const isRightHalf =
          e.touches[0].clientX >
          e.currentTarget.getBoundingClientRect().left +
            e.currentTarget.clientWidth / 2;

        const handleTouchMove = (e: TouchEvent) => {
          const end = e.touches[0].clientY;
          const diff = start - end;
          const direction = isRightHalf ? -1 : 1;
          setRotation(rotation + diff * direction);
        };

        const handleTouchUp = () => {
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleTouchUp);
          setIsActivelyRotating(false);
        };

        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchUp);

        setIsActivelyRotating(true);
        // typeof navigator !== "undefined" && navigator?.vibrate?.(200);
      }}
      onWheel={(e) => {
        const isLeftHalf =
          e.clientX <
          e.currentTarget.getBoundingClientRect().left +
            e.currentTarget.clientWidth / 2;
        const direction = (e.deltaY < 0 ? 1 : -1) * (isLeftHalf ? -1 : 1);
        setRotation(rotation + direction * 5); // Adjust the 5 to control sensitivity
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        const start = e.clientY;

        const isRightHalf =
          e.clientX >
          e.currentTarget.getBoundingClientRect().left +
            e.currentTarget.clientWidth / 2;

        const handleMouseMove = (e: MouseEvent) => {
          const end = e.clientY;
          const diff = start - end;
          const direction = isRightHalf ? -1 : 1;
          setRotation(rotation + diff * direction);
        };

        const handleMouseUp = () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          setIsActivelyRotating(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        setIsActivelyRotating(true);
      }}
    >
      <div className={classes.knobTopFastener} />
      <div className={classes.knobBottomFastener} />
      <div
        className={cn(classes.knob, isActivelyRotating && classes.knobActive)}
      >
        <div
          className={classes.knobOval}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
    </div>
  );
};

export default POKnob;
