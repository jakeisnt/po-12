import { getNextBPM } from "@/lib/bpm";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { MetronomeModes } from "@/lib/bpm";

/**
 * Manage the BPM.
 */
const useBPM = () => {
  const [bpm, setBPM] = useLocalStorage("bpm", MetronomeModes.HIP_HOP);

  /** Go to the next BPM, cycling through them. */
  const goToNextBPM = useCallback(
    () => setBPM((curBPM) => getNextBPM(curBPM)),
    [setBPM]
  );

  const resetBPM = useCallback(() => setBPM(MetronomeModes.HIP_HOP), [setBPM]);

  return { bpm, setBPM, goToNextBPM, resetBPM };
};

export default useBPM;
