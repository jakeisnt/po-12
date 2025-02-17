import { useState, useRef, useCallback } from "react";
import { isTouchDevice } from "./utils";
import { useEffect } from "react";

// whenever the device aspect ration chagnes,
// re-poll the touch device status
const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(isTouchDevice());
  const ref = useRef(isTouch);

  const checkTouch = useCallback(() => {
    const current = isTouchDevice();
    if (current !== ref.current) {
      ref.current = current;
      setIsTouch(current);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resizeObserver = new ResizeObserver(checkTouch);
    resizeObserver.observe(window.document.documentElement);
    return () => {
      resizeObserver.unobserve(window.document.documentElement);
    };
  }, [checkTouch]);

  return isTouch;
};

export default useIsTouchDevice;
