import classes from "../lcd.module.scss"
import { isBetween } from "../../utils"

const SpoolStamp = ({
  currentBeat,
  lightningLeftEnabled,
  lightningRightEnabled,
}) => {
  return (
    <>
      {/* stamp up */}
      <g
        className={
          isBetween(currentBeat % 2, 0, 1) ? classes.visible : classes.hidden
        }>
        <rect x="24" y="60" width="4" height="1" fill="currentColor" />
        <rect x="25" y="58" width="1.5" height="2" fill="currentColor" />
      </g>
      {/* stamp down */}
      <g
        className={
          isBetween(currentBeat % 2, 1, 2) ? classes.visible : classes.hidden
        }>
        <rect x="24" y="64" width="4" height="1" fill="currentColor" />
        <rect x="25" y="62" width="1.5" height="2" fill="currentColor" />
      </g>

      {/* right lightning bolt */}
      <g className={lightningRightEnabled ? classes.visible : classes.hidden}>
        <path d="M44 60.5L32.5 64L44 55L44 60.5Z" fill="currentColor" />
        <path
          d="M40.9575 58.9734L52.642 56.1496L40.637 64.464L40.9575 58.9734Z"
          fill="currentColor"
        />
      </g>

      {/* left lightning bolt */}
      <g className={lightningLeftEnabled ? classes.visible : classes.hidden}>
        <path
          d="M10.5 57L20.5 64L6.00016 59.9993L10.5 57Z"
          fill="currentColor"
        />
        <path
          d="M12.3083 61.3155L3.00006 55.0001L16.181 57.3943L12.3083 61.3155Z"
          fill="currentColor"
        />
      </g>
    </>
  )
}

export default SpoolStamp
