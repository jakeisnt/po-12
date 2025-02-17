import classes from "../lcd.module.scss";

const SpoolList = ({ currentBeat, queuedSelectedPattern, spoolState }) => {
  let activeSpool = 0;

  if (queuedSelectedPattern) {
    if (currentBeat === 0) {
      activeSpool = spoolState;
    } else {
      const currentTime = currentBeat % 4;

      // spread the time in the interval [0, 4) into 5 equal parts,
      // each distributed to the following spool:
      // [0, 0.8) -> 1, 2, 3, 2, 1
      if (currentTime < 0.8) {
        activeSpool = 1;
      } else if (currentTime >= 0.8 && currentTime < 1.6) {
        activeSpool = 2;
      } else if (currentTime >= 1.6 && currentTime < 2.4) {
        activeSpool = 3;
      } else if (currentTime >= 2.4 && currentTime < 3.2) {
        activeSpool = 2;
      } else {
        activeSpool = 1;
      }
    }
  }

  return (
    <>
      {/* spool 0 */}
      <g className={activeSpool === 0 ? classes.visible : classes.hidden}>
        <path d="M67 14H76V16H67V14Z" fill="currentColor" />
        <path d="M68.5 13L74.5 13L76 14L67 14L68.5 13Z" fill="currentColor" />
        <path d="M76 7L67 7L67 5L76 5L76 7Z" fill="currentColor" />
        <path d="M74.5 8L68.5 8L67 7L76 7L74.5 8Z" fill="currentColor" />
        <path d="M74.5 8L68.5 8L67 7L76 7L74.5 8Z" fill="currentColor" />
        <rect x="68.5" y="8" width="6" height="5" fill="currentColor" />
      </g>

      {/* spool 1 */}
      <g className={activeSpool === 1 ? classes.visible : classes.hidden}>
        <path d="M79 14H88V16H79V14Z" fill="currentColor" />
        <path d="M80.5 13L86.5 13L88 14L79 14L80.5 13Z" fill="currentColor" />
        <path d="M88 7L79 7L79 5L88 5L88 7Z" fill="currentColor" />
        <path d="M86.5 8L80.5 8L79 7L88 7L86.5 8Z" fill="currentColor" />
        <path d="M86.5 8L80.5 8L79 7L88 7L86.5 8Z" fill="currentColor" />
        <rect x="80.5" y="8" width="6" height="5" fill="currentColor" />
      </g>

      {/* spool 2 */}
      <g className={activeSpool === 2 ? classes.visible : classes.hidden}>
        <path d="M92 14H101V16H92V14Z" fill="currentColor" />
        <path d="M93.5 13L99.5 13L101 14L92 14L93.5 13Z" fill="currentColor" />
        <path d="M101 7L92 7L92 5L101 5L101 7Z" fill="currentColor" />
        <path d="M99.5 8L93.5 8L92 7L101 7L99.5 8Z" fill="currentColor" />
        <path d="M99.5 8L93.5 8L92 7L101 7L99.5 8Z" fill="currentColor" />
        <rect x="93.5" y="8" width="6" height="5" fill="currentColor" />
      </g>

      {/* spool 3 */}
      <g className={activeSpool === 3 ? classes.visible : classes.hidden}>
        <path d="M104 14H113V16H104V14Z" fill="currentColor" />
        <path
          d="M105.5 13L111.5 13L113 14L104 14L105.5 13Z"
          fill="currentColor"
        />
        <path d="M113 7L104 7L104 5L113 5L113 7Z" fill="currentColor" />
        <path d="M111.5 8L105.5 8L104 7L113 7L111.5 8Z" fill="currentColor" />
        <path d="M111.5 8L105.5 8L104 7L113 7L111.5 8Z" fill="currentColor" />
        <rect x="105.5" y="8" width="6" height="5" fill="currentColor" />
      </g>
    </>
  );
};

export default SpoolList;
