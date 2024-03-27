import classes from "./lcd.module.scss"
import { Dispatch, SetStateAction } from "react"

const selectPatternVariant = (patternVariant: number) => {
  const mapping = {
    1: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
    2: ["topLeft", "bottomRight"],
    3: ["topLeft", "mid", "topVert"],
    4: ["mid", "bottomLeft", "bottomRight", "bottom"],
    5: ["topLeft", "topRight"],
    6: ["topLeft", "mid", "bottomLeft"],
    7: ["topRight", "mid", "bottomRight"],
    8: ["mid", "bottom"],
    9: ["bottomLeft", "bottomRight"],
    10: ["mid"],
    11: ["bottomLeft", "bottomRight", "bottom"],
    12: ["mid", "bottom", "topVert", "bottomVert"],
    13: ["topLeft", "topRight", "mid", "bottomLeft", "bottomRight"],
    14: ["mid", "topVert", "bottomVert"],
    15: ["topLeft", "topRight", "bottom"],
    16: ["mid", "bottomLeft"],
  }

  if (!mapping[patternVariant]) {
    throw new Error(`Invalid pattern variant: ${patternVariant}`)
  }

  return mapping[patternVariant]
}

interface SinglePatternIndicatorProps {
  hideRHS?: boolean
  selectedPattern: number
  hidden?: boolean
}

const SinglePatternIndicator = ({
  hideRHS = false,
  selectedPattern,
  hidden = false,
}: SinglePatternIndicatorProps) => {
  const cfg = selectedPattern ? selectPatternVariant(selectedPattern) : []

  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* top left corner */}
      <rect
        y="7.08313"
        width="10"
        height="1.5"
        transform="rotate(-45 0 7.08313)"
        fill="currentColor"
        className={
          !hidden && cfg.includes("topLeft") ? classes.visible : classes.hidden
        }
      />
      {/* top right corner */}
      <rect
        x="13.0607"
        width="10"
        height="1.5"
        transform="rotate(45 13.0607 0)"
        fill="currentColor"
        className={
          !hidden && cfg.includes("topRight") ? classes.visible : classes.hidden
        }
      />
      {/* mid line */}
      <rect
        y="9"
        width="20"
        height="1.5"
        fill="currentColor"
        className={
          !hidden && cfg.includes("mid") ? classes.visible : classes.hidden
        }
      />
      {/* bottom left corner */}
      <rect
        x="1.06067"
        y="11"
        width="10"
        height="1.5"
        transform="rotate(45 1.06067 11)"
        fill="currentColor"
        className={
          !hidden && cfg.includes("bottomLeft")
            ? classes.visible
            : classes.hidden
        }
      />
      {/* bottom right corner */}
      <rect
        x="12"
        y="18.0711"
        width="10"
        height="1.5"
        transform="rotate(-45 12 18.0711)"
        fill="currentColor"
        className={
          !hidden && cfg.includes("bottomRight")
            ? classes.visible
            : classes.hidden
        }
      />
      {/* bottom line */}
      <rect
        y="20.5"
        width="20"
        height="1.5"
        fill="currentColor"
        className={
          !hidden && cfg.includes("bottom") ? classes.visible : classes.hidden
        }
      />

      {hideRHS ? null : (
        <>
          {/* top vertical line at end */}
          <rect
            x="22"
            y="1"
            width="1.5"
            height="8"
            fill="currentColor"
            className={
              !hidden && cfg.includes("topVert")
                ? classes.visible
                : classes.hidden
            }
          />
          {/* bottom vertical line at end */}
          <rect
            x="22"
            y="11"
            width="1.5"
            height="8"
            fill="currentColor"
            className={
              !hidden && cfg.includes("bottomVert")
                ? classes.visible
                : classes.hidden
            }
          />
        </>
      )}
    </svg>
  )
}

interface PatternIndicatorProps {
  selectedPattern: number
  setSelectedPattern: Dispatch<SetStateAction<number>>
  queuedSelectedPattern: number | null
  currentBeat: number
}

/* Indicates what pattern the user has selected */
const PatternIndicators = ({
  selectedPattern,
  queuedSelectedPattern,
  setSelectedPattern,
  currentBeat,
}: PatternIndicatorProps) => {
  return (
    <div
      className={classes.patternIndicator}
      role="button"
      onClick={() =>
        setSelectedPattern?.((currentPattern: number) =>
          currentPattern === 16 ? 1 : currentPattern + 1,
        )
      }>
      <SinglePatternIndicator
        hidden={currentBeat === 15}
        selectedPattern={
          currentBeat > 15 && queuedSelectedPattern
            ? queuedSelectedPattern
            : selectedPattern
        }
      />
      <SinglePatternIndicator
        hidden={currentBeat === 14}
        selectedPattern={
          currentBeat > 14 && queuedSelectedPattern
            ? queuedSelectedPattern
            : selectedPattern
        }
      />
      <SinglePatternIndicator
        hidden={currentBeat === 13}
        selectedPattern={
          currentBeat > 13 && queuedSelectedPattern
            ? queuedSelectedPattern
            : selectedPattern
        }
      />
      <SinglePatternIndicator
        hidden={currentBeat === 12}
        selectedPattern={
          currentBeat > 12 && queuedSelectedPattern
            ? queuedSelectedPattern
            : selectedPattern
        }
        hideRHS
      />
    </div>
  )
}

export default PatternIndicators
