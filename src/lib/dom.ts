/**
 * Find an element with the provided ClassName at the mouseevent's cursor location.
 * @param event the mouse event with location data to look for.
 * @param className The class name to look for on each element.
 * @returns
 */
const findElementAtCursor = (event: MouseEvent, className: string) => {
  let targetElement: HTMLElement | null = document.elementFromPoint(
    event.clientX,
    event.clientY
  ) as HTMLElement;
  while (targetElement && !targetElement.classList.contains(className)) {
    targetElement = targetElement.parentElement;
  }

  return targetElement;
};

/**
 * Check if the mouse event is within the bounding box.
 * @param event the mouse event to check.
 * @param bbox the bounding box to check against.
 * @returns true if the event is within the bounding box, false otherwise.
 */
const withinBbox = (
  event: MouseEvent,
  bbox: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
) => {
  return (
    event.clientX >= bbox.left &&
    event.clientX <= bbox.right &&
    event.clientY >= bbox.top &&
    event.clientY <= bbox.bottom
  );
};

export { findElementAtCursor, withinBbox };
