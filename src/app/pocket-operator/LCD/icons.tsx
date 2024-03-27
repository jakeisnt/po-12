const SuccessIcon = ({ width = 19, height = 18, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6.85733"
        y="16.6858"
        width="6.86931"
        height="4"
        transform="rotate(-135 6.85733 16.6858)"
        fill="currentColor"
      />
      <rect
        x="5.14194"
        y="13.0415"
        width="14"
        height="3.79923"
        transform="rotate(-45 5.14194 13.0415)"
        fill="currentColor"
      />
    </svg>
  )
}

const FailIcon = ({ width = 19, height = 19, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 19 19"
      style={{ marginLeft: "4px" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="12.8995"
        y="15.7279"
        width="14"
        height="4"
        transform="rotate(-135 12.8995 15.7279)"
        fill="currentColor"
      />
      <rect
        x="3"
        y="12.8995"
        width="14"
        height="4"
        transform="rotate(-45 3 12.8995)"
        fill="currentColor"
      />
    </svg>
  )
}

const PlayingIcon = ({ width = 19, height = 19, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0417 9.50001L3.76044 16.356L3.76044 2.64398L15.0417 9.50001Z"
        fill="currentColor"
      />
    </svg>
  )
}

const RecordingIcon = ({ width = 18, height = 18, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 0C0.447715 0 0 0.447715 0 1V19C0 19.5523 0.447715 20 1 20H19C19.5523 20 20 19.5523 20 19V1C20 0.447715 19.5523 0 19 0H1ZM10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { SuccessIcon, FailIcon, PlayingIcon, RecordingIcon }
