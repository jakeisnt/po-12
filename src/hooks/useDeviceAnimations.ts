import { useCallback, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { includes } from "@/lib/array";

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

// Utility to add/remove animation classes
function triggerDomAnimation(
  selector: string,
  className: string,
  duration: number
) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), duration);
  });
}

// Map animation types to selectors and class names
const animationMap = {
  kick: { selector: '[data-anim="kick"]', className: "anim-kick" },
  highHat: { selector: '[data-anim="highHat"]', className: "anim-highHat" },
  drum: { selector: '[data-anim="drum"]', className: "anim-drum" },
  clap: { selector: '[data-anim="clap"]', className: "anim-clap" },
  bell1: { selector: '[data-anim="bell1"]', className: "anim-bell1" },
  bell2: { selector: '[data-anim="bell2"]', className: "anim-bell2" },
};

const useDeviceAnimations = ({
  soundsPlaying,
  bpm,
}: {
  soundsPlaying: number[];
  bpm: number;
}) => {
  const oneBeatInterval = 60000 / 16 / bpm;

  const hittingBellAnimation = useCallback((oneBeatInterval: number) => {
    const bellInterval = oneBeatInterval / 2;
    // Bell 1
    triggerDomAnimation(
      animationMap.bell1.selector,
      animationMap.bell1.className,
      bellInterval * 4
    );
    // Bell 2
    triggerDomAnimation(
      animationMap.bell2.selector,
      animationMap.bell2.className,
      bellInterval * 4
    );
  }, []);

  const hittingDrumAnimation = useCallback((oneBeatInterval: number) => {
    triggerDomAnimation(
      animationMap.drum.selector,
      animationMap.drum.className,
      oneBeatInterval
    );
  }, []);

  const hittingClapAnimation = useCallback((oneBeatInterval: number) => {
    triggerDomAnimation(
      animationMap.clap.selector,
      animationMap.clap.className,
      oneBeatInterval
    );
  }, []);

  const hittingHighHatAnimation = useCallback((oneBeatInterval: number) => {
    triggerDomAnimation(
      animationMap.highHat.selector,
      animationMap.highHat.className,
      oneBeatInterval
    );
  }, []);

  const hittingKickAnimation = useCallback((oneBeatInterval: number) => {
    triggerDomAnimation(
      animationMap.kick.selector,
      animationMap.kick.className,
      oneBeatInterval
    );
  }, []);

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

  useLayoutEffect(() => {
    setTimeout(() => {
      interpretSounds(oneBeatInterval, soundsPlaying);
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundsPlaying, interpretSounds]);

  const triggerAnimation = useCallback(
    (sound: number) => {
      flushSync(() => interpretSounds(oneBeatInterval, [sound + 1]));
    },
    [interpretSounds, oneBeatInterval]
  );

  return { triggerAnimation };
};

export default useDeviceAnimations;
