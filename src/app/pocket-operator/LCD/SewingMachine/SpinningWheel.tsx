import { isBetween, oneOver16, oneOver8 } from "../../utils"
import classes from "../lcd.module.scss"

const SpinningWheel = ({ currentBeat }: { currentBeat: number }) => {
  return (
    <>
      {/* even wheel items */}
      <g
        className={
          isBetween(currentBeat % oneOver8, 0, oneOver16)
            ? classes.visible
            : classes.hidden
        }>
        <path
          d="M68.0751 30L70.1672 32.1501L69.0921 33.1962L67 31.0461L68.0751 30Z"
          fill="currentColor"
        />
        <path
          d="M76.8935 30.8181L75.2572 33.3326L74 32.5145L75.6363 30L76.8935 30.8181Z"
          fill="currentColor"
        />
        <path
          d="M65 36.3241L67.9824 36L68.1445 37.4912L65.1621 37.8153L65 36.3241Z"
          fill="currentColor"
        />
        <path
          d="M70.6306 42.9209L70.9716 39.9403L72.4619 40.1109L72.1208 43.0914L70.6306 42.9209Z"
          fill="currentColor"
        />
        <path
          d="M77.8075 39.461L75 38.4038L75.5286 37L78.3362 38.0573L77.8075 39.461Z"
          fill="currentColor"
        />
      </g>

      {/* odd wheel items */}
      <g
        className={
          isBetween(currentBeat % oneOver8, oneOver16, oneOver8)
            ? classes.visible
            : classes.hidden
        }>
        <path d="M72.5 29L72.5 32L71 32L71 29L72.5 29Z" fill="currentColor" />
        <path
          d="M65.551 33L68.3413 34.1021L67.7902 35.4972L65 34.3951L65.551 33Z"
          fill="currentColor"
        />
        <path
          d="M75.1405 42.4304L73.3064 40.0564L74.4934 39.1393L76.3275 41.5134L75.1405 42.4304Z"
          fill="currentColor"
        />
        <path
          d="M78.844 34.9139L75.9177 35.575L75.5872 34.1119L78.5135 33.4508L78.844 34.9139Z"
          fill="currentColor"
        />
        <path
          d="M66.4722 40.6151L68.3837 38.3029L69.5398 39.2587L67.6283 41.5708L66.4722 40.6151Z"
          fill="currentColor"
        />
      </g>
    </>
  )
}

export default SpinningWheel
