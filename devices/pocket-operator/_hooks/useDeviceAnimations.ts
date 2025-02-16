import { useState, useCallback, useLayoutEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AnimationState } from "../utils";
import { flushSync } from "react-dom";

// does the first array include any of the items in the second?
const includes = <T>(arr1: T[], arr2: T[]) => {
  return arr2.some((item) => arr1.includes(item));
};

// hitting drum -> 2, 5, 11, 12
const hittingDrumSounds = [2, 5, 11, 12];
// hitting kick -> 1
const hittingKickSounds = [1];
// hitting high hat -> 3
const hittingHighHatSounds = [3];
// hitting bell -> 4, 7, 8, 13, 14
const hittingBellSounds = [4, 7, 8, 13, 14];
// hitting clap -> 6, 9, 10
const hittingClapSounds = [6, 9, 10];

const defaultAnimationState = {
  hittingKick: false,
  hittingHighHat: false,
  hittingDrum: false,
  finishedHittingDrum: false,
  hittingClap: false,
  finishedHittingClap: false,
  hittingBell1: false,
  hittingBell2: false,
};

// NOTES:
// only clear the arm state if the arm has to move.
// -> 'finished hitting clap' etc is innacurate because it stays true until the arms move again.
// - we don't support multi step animations yet.
// . i think we need to tick on every 1/4 beat, not every beat -> that's what the bell animation needs.
//   the others are all 'half speed' bell.
const useDeviceAnimations = ({
  soundsPlaying,
  bpm,
}: {
  soundsPlaying: number[];
  bpm: number;
}) => {
  const [animations, setAnimationsBase] = useState<AnimationState>(
    defaultAnimationState
  );

  const setAnimations = useCallback(
    (v: SetStateAction<AnimationState>) =>
      flushSync(() => setAnimationsBase(v)),
    [setAnimationsBase]
  );

  const oneBeatInterval = 60000 / 16 / bpm;

  const hittingBellAnimation = useCallback(
    (oneBeatInterval: number) => {
      const ringBell = () =>
        setAnimations((prev: AnimationState) => {
          return {
            ...prev,
            hittingBell1: !prev.hittingBell1,
            hittingBell2: !prev.hittingBell2,
          };
        });

      const setupBell = () => {
        setAnimations((prev) => {
          return {
            ...prev,
            hittingBell1: true,
            hittingBell2: false,
          };
        });
      };

      const finishBell = () => {
        setAnimations((prev) => {
          return {
            ...prev,
            hittingBell1: false,
            hittingBell2: false,
          };
        });
      };

      const bellInterval = oneBeatInterval / 2;
      setTimeout(setupBell, 0);
      setTimeout(ringBell, bellInterval);
      setTimeout(ringBell, bellInterval * 2);
      setTimeout(ringBell, bellInterval * 3);
      setTimeout(finishBell, bellInterval * 4);
    },
    [setAnimations]
  );

  const hittingDrumAnimation = useCallback(
    (oneBeatInterval: number) => {
      const drumInterval = oneBeatInterval;

      setAnimations((prev) => {
        return {
          ...prev,
          hittingDrum: true,
          finishedHittingDrum: false,
          finishedHittingClap: false,
        };
      });
      setTimeout(() => {
        setAnimations((prev) => {
          return {
            ...prev,
            hittingDrum: false,
            finishedHittingDrum: true,
          };
        });
      }, drumInterval);
    },
    [setAnimations]
  );

  const hittingClapAnimation = useCallback(
    (oneBeatInterval: number) => {
      const clapInterval = oneBeatInterval;

      setAnimations((prev) => {
        return {
          ...prev,
          hittingClap: true,
          finishedHittingClap: false,
          finishedHittingDrum: false,
        };
      });
      setTimeout(() => {
        setAnimations((prev) => {
          return {
            ...prev,
            hittingClap: false,
            finishedHittingClap: true,
          };
        });
      }, clapInterval);
    },
    [setAnimations]
  );

  const hittingHighHatAnimation = useCallback(
    (oneBeatInterval: number) => {
      const highHatInterval = oneBeatInterval;
      setAnimations((prev) => {
        return {
          ...prev,
          hittingHighHat: true,
          finishedHittingDrum: false,
          finishedHittingClap: false,
        };
      });
      setTimeout(() => {
        setAnimations((prev) => {
          return {
            ...prev,
            hittingHighHat: false,
            finishedHittingDrum: true,
          };
        });
      }, highHatInterval);
    },
    [setAnimations]
  );

  const hittingKickAnimation = useCallback(
    (oneBeatInterval: number) => {
      const kickInterval = oneBeatInterval;
      setAnimations((prev) => {
        return {
          ...prev,
          hittingKick: true,
        };
      });
      setTimeout(() => {
        setAnimations((prev) => {
          return {
            ...prev,
            hittingKick: false,
          };
        });
      }, kickInterval);
    },
    [setAnimations]
  );

  const interpretSounds = useCallback(
    (oneBeatInterval: number, soundsTriggered: number[]) => {
      if (soundsTriggered.length === 0) {
        return;
      }

      if (includes(soundsTriggered, hittingBellSounds)) {
        hittingBellAnimation(oneBeatInterval);
      }

      if (includes(soundsTriggered, hittingDrumSounds)) {
        hittingDrumAnimation(oneBeatInterval);
      }

      if (includes(soundsTriggered, hittingClapSounds)) {
        hittingClapAnimation(oneBeatInterval);
      }

      if (includes(soundsTriggered, hittingHighHatSounds)) {
        hittingHighHatAnimation(oneBeatInterval);
      }

      if (includes(soundsTriggered, hittingKickSounds)) {
        hittingKickAnimation(oneBeatInterval);
      }
    },
    [
      hittingBellAnimation,
      hittingDrumAnimation,
      hittingClapAnimation,
      hittingHighHatAnimation,
      hittingKickAnimation,
    ]
  );

  // every time a sound is triggered, update the animation state.
  useLayoutEffect(() => {
    setTimeout(() => {
      interpretSounds(oneBeatInterval, soundsPlaying);
    }, 1);
    // do not trigger sounds when the bpm changes.
    // only trigger sound animations when the soundsPlaying array changes.
    // eslint-disable-next-line react-_hooks/exhaustive-deps
  }, [soundsPlaying, interpretSounds]);

  // start an animation when a sound is pressed.
  // accepts a sound number as an argument.
  const triggerAnimation = useCallback(
    (sound: number) => {
      flushSync(() => interpretSounds(oneBeatInterval, [sound + 1]));
    },
    [interpretSounds, oneBeatInterval]
  );

  return { animationState: animations, triggerAnimation };
};

export default useDeviceAnimations;
