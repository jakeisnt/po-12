import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { flushSync } from "react-dom";

/**
 * Listen to the current beat of the pocket operator.
 */
const useCurrentBeat = (bpm: number) => {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Start the pocket operator's continuous playback.
   */
  const startPlaying = useCallback((bpm: number) => {
    intervalRef.current = setInterval(() => {
      flushSync(() => setCurrentBeat((currentBeat) => currentBeat + 0.0625));
    }, 60000 / 4 / 16 / bpm);

    setPlaying(true);
  }, []);

  /**
   * When the bpm changes, start a new interval with the new bpm.
   */
  useEffect(() => {
    if (!intervalRef.current) {
      return;
    }

    clearInterval(intervalRef.current);
    startPlaying(bpm);
  }, [bpm]);

  /**
   * Start the pocket operator's continuous playback.
   */
  const play = useCallback(() => {
    if (intervalRef.current) {
      return;
    }

    startPlaying(bpm);
  }, [bpm, startPlaying]);

  /**
   * Pause the pocket operator's continuous playback.
   */
  const pause = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCurrentBeat(0);
    setPlaying(false);
  }, []);

  /**
   * Toggle the playing state of the pocket operator.
   */
  const togglePlaying = useMemo(() => (playing ? pause : play), [playing]);

  return { currentBeat, playing, togglePlaying, pause };
};

export default useCurrentBeat;
