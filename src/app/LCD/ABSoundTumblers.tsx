import classes from "./lcd.module.scss";

type SoundTumblersProps = {
  tumblerALevel: number;
  tumblerBLevel: number;
};

/**
 * Two tumblers on the right of the device.
 * Visualizes the A and B levels provided.
 * Assumes values are between from 0 and 8.
 */
const SoundTumblers = ({
  tumblerALevel,
  tumblerBLevel,
}: SoundTumblersProps) => {
  return (
    <div className={classes.soundTumbler}>
      <svg
        width="50"
        height="72"
        viewBox="0 0 50 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* turn the tumbler A */}
        <g>
          <path
            d="M32 29.5L28 25.5V22.5H49V25.5L45.5 29.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M45 63L49 67L49 70L28 70L28 67L31.5 63"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* body of tumbler b */}
          <g>
            <rect
              x="32"
              y="59"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 0 ? classes.active : classes.hidden}
            />
            <rect
              x="32"
              y="55"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 1 ? classes.active : classes.hidden}
            />
            <rect
              x="32"
              y="51"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 2 ? classes.active : classes.hidden}
            />
            <rect
              x="32"
              y="47"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 3 ? classes.active : classes.hidden}
            />

            <rect
              x="32"
              y="43"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 4 ? classes.active : classes.hidden}
            />
            <rect
              x="32"
              y="39"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 5 ? classes.active : classes.hidden}
            />
            <rect
              x="32"
              y="35"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 6 ? classes.active : classes.hidden}
            />
            <rect
              x="32"
              y="31"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerBLevel > 7 ? classes.active : classes.hidden}
            />
          </g>
        </g>

        {/* tumbler A without label */}
        <g>
          <rect
            x="23"
            y="71.5"
            width="23"
            height="2.5"
            transform="rotate(-180 23 71.5)"
            fill="currentColor"
          />
          <path d="M23 69L0 69L4 63L19 63L23 69Z" fill="currentColor" />

          {/* the body of tumbler A */}
          <g>
            <rect
              x="5"
              y="59"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 0 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="55"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 1 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="51"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 2 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="47"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 3 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="43"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 4 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="39"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 5 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="35"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 6 ? classes.active : classes.hidden}
            />
            <rect
              x="5"
              y="31"
              width="14"
              height="2"
              fill="currentColor"
              className={tumblerALevel > 7 ? classes.active : classes.hidden}
            />
          </g>

          <rect x="0.5" y="21.5" width="23" height="2.5" fill="currentColor" />
          <path d="M0.5 24H23.5L19.5 30H4.50003L0.5 24Z" fill="currentColor" />
        </g>

        {/* the A label */}
        <g>
          <path
            d="M10.5 1.5L12.5 1.5L6.50001 17L4.50001 17L10.5 1.5Z"
            fill="currentColor"
          />
          <path
            d="M13 1.5L10.5 1.5L17.4286 17.0585L19.4916 17.0228L13 1.5Z"
            fill="currentColor"
          />
          <rect x="8" y="11.25" width="8" height="1.5" fill="currentColor" />
        </g>

        {/* the B label */}
        <g>
          <rect x="33" y="1.5" width="2" height="15.5" fill="currentColor" />
          <rect x="35" y="8" width="5" height="1.75" fill="currentColor" />
          <rect x="35" y="1.5" width="5" height="1.75" fill="currentColor" />
          <rect x="35" y="15.25" width="5" height="1.75" fill="currentColor" />
          <path
            d="M39 2.38H40.2188C40.7158 2.38 41.1893 2.59198 41.5203 2.96273V2.96273C41.8368 3.31718 42.0775 3.73253 42.2278 4.18332L42.3923 4.67684C42.4636 4.89089 42.5 5.11504 42.5 5.34066V5.34066C42.5 6.08298 42.2051 6.7949 41.6802 7.31979L41.5 7.50001L41 8.00001L40 8.50001L39 9.00001L41 9.50001L41.3675 9.68378C41.7864 9.89323 42.1688 10.1688 42.5 10.5V10.5V10.5C42.8201 10.8202 43 11.2544 43 11.7071V12.25V13.5C43 13.9 42.3333 14.6667 42 15L41.5764 15.4236C41.202 15.798 40.7175 16.0424 40.1939 16.1209V16.1209C40.0648 16.1403 39.9345 16.15 39.804 16.15H39"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
};

export default SoundTumblers;
