import { useLocalStorage } from "./useLocalStorage";
import { useState, useEffect } from "react";
import type { Pattern } from "../../lib/types";
import { flushSync } from "react-dom";

/**
 * Use the selected pattern stored on local storage.
 */
const useSelectedPattern = ({
  currentBeatIndex,
  patterns,
  playing,
  bpm,
}: {
  currentBeatIndex: number;
  patterns: Pattern[];
  playing: boolean;
  bpm: number;
}) => {
  const [selectedPattern, setSelectedPattern] = useLocalStorage(
    "pocketOperatorSelectedPattern",
    1
  );

  const [queuedSelectedPattern, queueSelectedPattern] = useState<number | null>(
    null
  );

  const [prequeuedSelectedPattern, prequeueSelectedPattern] = useState<
    number | null
  >(null);

  // 0 is default
  const [spoolState, setQueuedSpoolState] = useState<number>(0);

  useEffect(() => {
    // if we have prequeued a selected pattern and we start the beat move it to the queue
    if (prequeuedSelectedPattern && currentBeatIndex === 12) {
      queueSelectedPattern(prequeuedSelectedPattern);
      prequeueSelectedPattern(null);
    } else if (queuedSelectedPattern && currentBeatIndex === 15) {
      // if we have a pattern queued, and we're at the start of a new beat, set it
      setSelectedPattern(queuedSelectedPattern);
      queueSelectedPattern(null);
    }
  }, [
    prequeuedSelectedPattern,
    prequeueSelectedPattern,
    queueSelectedPattern,
    queuedSelectedPattern,
    setSelectedPattern,
    currentBeatIndex,
  ]);

  const queueSelectedPatternExternal = (patternNumber: number) => {
    if (playing) {
      prequeueSelectedPattern(patternNumber);
    } else {
      // if not playing, we set the pattern right away,
      // but also trigger the queueing animation for a period of time
      queueSelectedPattern(patternNumber);
      setSelectedPattern(patternNumber);

      const queuedSpoolStateOffset = 60000 / bpm / 6;

      const updateSpoolState = (n: 0 | 1 | 2 | 3) =>
        flushSync(() => setQueuedSpoolState(n));

      setTimeout(() => updateSpoolState(1), queuedSpoolStateOffset);
      setTimeout(() => updateSpoolState(2), queuedSpoolStateOffset * 2);
      setTimeout(() => updateSpoolState(3), queuedSpoolStateOffset * 3);
      setTimeout(() => updateSpoolState(2), queuedSpoolStateOffset * 4);
      setTimeout(() => updateSpoolState(1), queuedSpoolStateOffset * 5);
      setTimeout(() => {
        updateSpoolState(0);
        queueSelectedPattern(null);
      }, queuedSpoolStateOffset * 6);
    }
  };

  // the currently selected pattern
  const currentPattern = patterns[selectedPattern - 1];

  return {
    currentPattern,
    selectedPattern,
    spoolState,
    queuedSelectedPattern,
    queueSelectedPattern: queueSelectedPatternExternal,
    setSelectedPattern,
  };
};

export default useSelectedPattern;
