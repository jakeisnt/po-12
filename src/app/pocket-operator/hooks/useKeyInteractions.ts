import { useState, useMemo, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { SelectingMode } from "../utils";

/**
 * Map of keys to button numbers.
 * Allows the user to use the keyboard to trigger button clicks.
 */
const keymap = {
  q: 5,
  w: 6,
  e: 7,
  r: 8,
  a: 9,
  s: 10,
  d: 11,
  f: 12,
  z: 13,
  x: 14,
  c: 15,
  v: 16,
};

/**
 * Allow the user to interact with the pocket operator with their keyboard.
 */
const useKeyInteractions = ({
  onButtonClick,
  setSelectingMode,
  setRecording,
  setPlaying,
  goToNextBPM,
}: {
  onButtonClick: Dispatch<SetStateAction<number>>;
  setSelectingMode: Dispatch<SetStateAction<SelectingMode>>;
  setRecording: Dispatch<SetStateAction<boolean>>;
  setPlaying: () => void;
  goToNextBPM: () => void;
}) => {
  const [keyedButtons, setKeyedButtons] = useState<number[]>([]);

  const keyActions = useMemo(
    () => ({
      " ": () => setPlaying(),
      ".": () => setRecording((recording) => !recording),
      Escape: () => setSelectingMode(SelectingMode.DEFAULT),
      j: () => setSelectingMode(SelectingMode.SOUND),
      k: () => setSelectingMode(SelectingMode.PATTERN),
      l: () => goToNextBPM(),
      ö: () => setRecording((recording) => !recording),
      ";": () => setRecording((recording) => !recording),
    }),
    [setSelectingMode, setRecording, setPlaying, goToNextBPM]
  );

  useEffect(() => {
    /**
     * Add a button to the keyed buttons array when a key is pressed.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      const buttonNumber = Number.parseInt(event.key);

      if (!isNaN(buttonNumber)) {
        onButtonClick(buttonNumber);
        setKeyedButtons((prev) => [...prev, buttonNumber]);
      } else if (keymap[event.key as keyof typeof keymap]) {
        onButtonClick(keymap[event.key as keyof typeof keymap]);
        setKeyedButtons((prev) => [
          ...prev,
          keymap[event.key as keyof typeof keymap],
        ]);
      } else if (keyActions[event.key as keyof typeof keyActions]) {
        keyActions[event.key as keyof typeof keyActions]();
      }
    };

    /**
     * Remove a button from the keyed buttons array when a key is released.
     */
    const handleKeyUp = (event: KeyboardEvent) => {
      const buttonNumber = Number.parseInt(event.key);

      if (!isNaN(buttonNumber)) {
        setKeyedButtons((prev) => prev.filter((key) => key !== buttonNumber));
      } else if (keymap[event.key as keyof typeof keymap]) {
        setKeyedButtons((prev) =>
          prev.filter((key) => key !== keymap[event.key as keyof typeof keymap])
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onButtonClick, keyActions]);

  return { keyedButtons };
};

export default useKeyInteractions;
