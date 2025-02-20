import Button, { ButtonStatus } from "./POButton";
import { SelectingMode } from "@/lib/utils";
import { useCallback } from "react";
import type { Pattern } from "../../lib/types";

type NumberedButtonProps = {
  playing: boolean;
  recording: boolean;
  buttonNumber: number;
  soundsPlaying: number[];
  onButtonClick: (buttonNumber: number) => void;
  selectedSound: number;
  selectedPattern: number;
  selectingMode: SelectingMode;
  currentBeat: number;
  currentBeatIndex: number;
  currentPattern: Pattern;
  supportedPatternIndices: number[];
  keyedButtons: number[];
};

/**
 * A button that can be pressed to trigger a sound.
 */
const NumberedButton = ({
  playing,
  recording,
  buttonNumber,
  soundsPlaying,
  onButtonClick,
  selectedSound,
  selectedPattern,
  selectingMode,
  currentBeat,
  currentBeatIndex,
  currentPattern,
  supportedPatternIndices,
  keyedButtons,
}: NumberedButtonProps) => {
  let status = ButtonStatus.NONE;

  switch (selectingMode) {
    case SelectingMode.SOUND:
      status =
        selectedSound === buttonNumber
          ? ButtonStatus.HIGHLIGHTED
          : ButtonStatus.NOTED;
      break;

    case SelectingMode.PATTERN:
      status =
        selectedPattern === buttonNumber
          ? ButtonStatus.HIGHLIGHTED
          : supportedPatternIndices.includes(buttonNumber)
          ? ButtonStatus.NOTED
          : status;
      break;

    default:
      if (recording) {
        // if we're recording, display the buttons that
        // the currently selected sound has in the current pattern.
        if (
          currentPattern.notes[buttonNumber - 1]
            .map((note) => note.note)
            .includes(selectedSound)
        ) {
          status = ButtonStatus.NOTED;
        }
      }
      if (playing) {
        status =
          soundsPlaying.includes(buttonNumber) && currentBeat % 1 < 0.5
            ? ButtonStatus.HIGHLIGHTED
            : status;
        status =
          currentBeatIndex === buttonNumber - 1 ? ButtonStatus.ACTIVE : status;
      }
  }

  // the button the user is pressing right now overrides all
  status = keyedButtons.includes(buttonNumber) ? ButtonStatus.ACTIVE : status;

  const onClick = useCallback(
    () => onButtonClick(buttonNumber),
    [buttonNumber, onButtonClick]
  );

  return (
    <Button onClick={onClick} status={status}>
      {buttonNumber}
    </Button>
  );
};

export default NumberedButton;
