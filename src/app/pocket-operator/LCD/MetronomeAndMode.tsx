import classes from "./lcd.module.scss";

import { getBPMMode, modeToBPM, modes } from "../utils";
import { cn } from "@/lib/utils";
import { ThinMetronomeLeft } from "../icons";

type MetronomeAndModeProps = {
  currentBeat: number;
  bpm: number;
  setBPM: (bpm: number) => void;
};

const MetronomeAndMode = ({
  currentBeat,
  bpm,
  setBPM,
}: MetronomeAndModeProps) => {
  return (
    <div className={classes.metronomeModeContainer}>
      <div
        className={classes.metronomeContainer}
        style={{
          transform: `scaleX(${currentBeat % 2 < 1 ? -1 : 1})`,
        }}
      >
        <ThinMetronomeLeft />
      </div>
      <div className={classes.modes}>
        {modes.map((mode, idx) => (
          <div
            className={cn(
              classes.mode,

              mode === getBPMMode(bpm) ? classes.visible : classes.hidden
            )}
            role="button"
            onClick={() => {
              const modeAsBPM = modeToBPM(mode);
              if (modeAsBPM) {
                setBPM(modeAsBPM);
              }
            }}
            key={`metronome-mode-${mode}`}
          >
            {mode}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetronomeAndMode;
