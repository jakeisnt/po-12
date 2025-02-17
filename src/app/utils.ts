// modes that the metronome can be in
// each one is associated with a BPM - or should be!
enum MetronomeModes {
  HIP_HOP = 80,
  DISCO = 120,
  TECHNO = 140,
}

// Names of the different modes
enum MetronomeModeNames {
  HIP_HOP = "HIP-HOP",
  DISCO = "DISCO",
  TECHNO = "TECHNO",
}

const modes = [
  MetronomeModeNames.HIP_HOP,
  MetronomeModeNames.DISCO,
  MetronomeModeNames.TECHNO,
];

const getBPMMode = (bpm: number): string | undefined => {
  if (bpm === MetronomeModes.HIP_HOP) {
    return MetronomeModeNames.HIP_HOP;
  } else if (bpm === MetronomeModes.DISCO) {
    return MetronomeModeNames.DISCO;
  } else if (bpm === MetronomeModes.TECHNO) {
    return MetronomeModeNames.TECHNO;
  }
};

const modeToBPM = (
  mode:
    | MetronomeModeNames.HIP_HOP
    | MetronomeModeNames.DISCO
    | MetronomeModeNames.TECHNO
) => {
  if (mode === MetronomeModeNames.HIP_HOP) {
    return MetronomeModes.HIP_HOP;
  } else if (mode === MetronomeModeNames.DISCO) {
    return MetronomeModes.DISCO;
  } else if (mode === MetronomeModeNames.TECHNO) {
    return MetronomeModes.TECHNO;
  }
};

const getNextBPM = (bpm: number): number => {
  const mode = getBPMMode(bpm);

  if (mode === MetronomeModeNames.HIP_HOP) {
    return MetronomeModes.DISCO;
  } else if (mode === MetronomeModeNames.DISCO) {
    return MetronomeModes.TECHNO;
  } else if (mode === MetronomeModeNames.TECHNO) {
    return MetronomeModes.HIP_HOP;
  }

  return bpm;
};

enum SelectingMode {
  SOUND = "sound",
  PATTERN = "pattern",
  DEFAULT = "default",
}

/**
 * Determine if a number is between two others.
 */
const isBetween = (num: number, lower: number, upper: number) =>
  num >= lower && num < upper;

const oneOver8 = 0.125;
const oneOver16 = 0.0625;

type AnimationState = {
  hittingKick: boolean;
  hittingHighHat: boolean;
  hittingDrum: boolean;
  finishedHittingDrum: boolean;
  hittingClap: boolean;
  finishedHittingClap: boolean;
  hittingBell1: boolean;
  hittingBell2: boolean;
};

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

/**
 * Fix a value between two others. (quantize).
 * @param min
 * @param max
 * @param val
 * @returns
 */
const fixBetween = (min: number, max: number, val: number) => {
  return Math.min(max, Math.max(min, val));
};

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

export type { AnimationState };

export {
  getBPMMode,
  modeToBPM,
  getNextBPM,
  MetronomeModes,
  modes,
  SelectingMode,
  isBetween,
  oneOver16,
  oneOver8,
  fixBetween,
  throttle,
  findElementAtCursor,
};
