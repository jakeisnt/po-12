const GoodEnoughArrow = ({ width = 17, height = 17 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="7" width="16" height="3" rx="1" fill="white" />
      <rect
        x="11.4656"
        y="0.918521"
        width="10.4952"
        height="3.25011"
        transform="rotate(47.0329 11.4656 0.918521)"
        fill="white"
      />
      <path
        d="M18.6794 8.64718L11 15.8008L8.78468 13.4227L16.4641 6.26904L18.6794 8.64718Z"
        fill="white"
      />
      <rect x="7.64999" y="0.19" width="4" height="3" rx="1.5" fill="white" />
      <rect x="7.39999" y="13.3" width="4" height="3" rx="1.5" fill="white" />
    </svg>
  );
};

export default GoodEnoughArrow;
