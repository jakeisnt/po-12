import { useState, useEffect } from "react";

/**
 * If there is only one digit in the number, prefix it with one zero.
 */
const padBeforeWithZeroIfOneDigit = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

/**
 * Convert a time string (in minutes and seconds)
 * to a three or four digit numner.
 */
const timeStringToNums = (time: string) => {
  const chars = time.toString().split("");
  const nums = chars
    .map((c) => Number.parseInt(c, 10))
    .filter((num) => !isNaN(num));

  if (nums.length === 3) {
    nums.unshift(0);
  }

  return nums;
};

/**
 * Listen to the time at a coherent pace
 */
const useTime = () => {
  const [timeDigits, setTimeDigits] = useState([0, 0, 0, 0]);
  const [amPM, setAmPM] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      let hours = date.getHours();
      const minutes = date.getMinutes();

      // Convert to 12-hour format
      if (hours > 12) {
        hours -= 12;
        setAmPM("PM");
      } else {
        setAmPM("AM");
      }

      // show 12 for both midnight and noon
      if (hours === 0) {
        hours = 12;
      }

      const newTime = `${padBeforeWithZeroIfOneDigit(hours)}:${padBeforeWithZeroIfOneDigit(minutes)}`;
      setTimeDigits(timeStringToNums(newTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeDigits, amPM };
};

export default useTime;
