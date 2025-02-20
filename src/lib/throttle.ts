/**
 * Throttle a function call to only be invoked every <wait> ms.
 * @param func  function to throttle.
 * @param wait time to wait - in ms
 */
function throttle(func: (...args: unknown[]) => void, wait: number) {
  let context: unknown, args: unknown, result: unknown;
  let timeout: unknown = null;
  let previous = 0;
  const later = () => {
    previous = Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function (...innerArgs: unknown[]) {
    const now = Date.now();
    if (!previous) previous = now;
    const remaining = wait - (now - previous);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = innerArgs;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout as ReturnType<typeof setTimeout>);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export { throttle };
