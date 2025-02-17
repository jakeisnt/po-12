import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Check if the current device is a touch device.
 * @returns Whether the current device supports touch input
 */
const isTouchDevice = () =>
  (typeof window !== "undefined" && "ontouchstart" in window) ||
  (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);

/**
 * Hook that detects if the current device is a touch device.
 * Re-checks when device orientation/aspect ratio changes.
 *
 * @example
 * const isTouchDevice = useIsTouchDevice();
 *
 * // In your JSX:
 * {isTouchDevice ? (
 *   <TouchControls />
 * ) : (
 *   <MouseControls />
 * )}
 *
 * @returns {boolean} Whether the current device supports touch input
 */
const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  const prevTouchRef = useRef(false);

  /**
   * Check if the device is a touch device and update the state if it has changed
   */
  const checkTouch = useCallback(() => {
    const current = isTouchDevice();
    if (current !== prevTouchRef.current) {
      prevTouchRef.current = current;
      setIsTouch(current);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    checkTouch();

    const resizeObserver = new ResizeObserver(checkTouch);
    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, [checkTouch]);

  return isTouch;
};

export { useIsTouchDevice, isTouchDevice };
