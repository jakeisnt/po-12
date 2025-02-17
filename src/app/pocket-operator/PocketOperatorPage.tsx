"use client";

import PocketOperator from "./PocketOperator";
import classes from "./pocketOperatorPage.module.scss";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePatterns } from "./hooks/usePattern";
import useCurrentBeat from "./hooks/useCurrentBeat";

import { MetronomeModes, getNextBPM, SelectingMode } from "./utils";
import InstructionsPaper from "./InstructionsPaper/InstructionsPaper";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import ProductTour from "./ProductTour";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useSelectedPattern from "./hooks/useSelectedPattern";

const defaultTilt = { x: 0, y: 0 };

const onMouseMove = () => {};

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

  const resetBPM = () => setBPM(MetronomeModes.HIP_HOP);

  return { bpm, setBPM, goToNextBPM, resetBPM };
};

/**
 * A couple more things I want to dial in before we're finished --
 * - animation state when switching tracks and not playing
 *   follows bpm, but does do the same thing.
 * - animation state when playing should show a wave effect where the
 *   current sound effect rolls over to the next one.
 * @returns
 */

const PocketOperatorWrapper = () => {
  const onTouchDevice = useIsTouchDevice();

  const [show, setShowing] = useState(false);
  const [pinned, setPinned] = useState(false);

  const [productTourMode, setProductTourMode] = useLocalStorage<
    "finished" | "intro" | "tour" | undefined
  >("pocketOperatorProductTourMode", undefined);

  // right when we start, transition in to showing the intro mode.
  // this makes sure the intro doesn't show up in the preview
  useEffect(() => {
    setTimeout(() => setProductTourMode((curMode) => curMode ?? "intro"), 100);
  }, [setProductTourMode]);

  const showInstructionsPaper =
    productTourMode === "finished" && (show || pinned);

  const {
    patterns,
    supportedPatternIndices,
    togglePatternNote,
    setPatternsFromFile,
    uploadingState,
    resetPatterns,
  } = usePatterns();

  const { bpm, setBPM, goToNextBPM, resetBPM } = useBPM();

  const [selectedSound, setSelectedSound] = useLocalStorage(
    "pocketOperatorSelectedSound",
    1
  );

  const resetSelectedSound = () => setSelectedSound(1);

  const [selectingMode, setSelectingMode] = useState<SelectingMode>(
    SelectingMode.DEFAULT
  );
  const resetSelectingMode = () => setSelectingMode(SelectingMode.DEFAULT);

  // are we currently recording?
  const [recording, setRecording] = useState<boolean>(false);

  const { currentBeat, playing, togglePlaying, pause } = useCurrentBeat(bpm);

  // the current index of the beat, or -1 if not playing
  // used to show how the beat progresses across the device
  const currentBeatIndex = useMemo(
    () => (playing ? Math.floor(currentBeat) % 16 : -1),
    [currentBeat, playing]
  );

  const {
    currentPattern,
    selectedPattern,
    queueSelectedPattern,
    queuedSelectedPattern,
    spoolState,
  } = useSelectedPattern({
    currentBeatIndex,
    patterns,
    playing,
    bpm,
  });

  return (
    <div
      className={classes.pocketOperatorPageContainer}
      onMouseMove={onMouseMove}
    >
      <div className={classes.container}>
        <div className={classes.pocketOperatorInTotal}>
          <PocketOperator
            className={classes.body}
            patternConfig={{
              patterns,
              supportedPatternIndices,
              togglePatternNote,
              setPatternsFromFile,
              uploadingState,
              bpm,
              setBPM,
              goToNextBPM,
              selectedSound,
              setSelectedSound,
              selectingMode,
              setSelectingMode,
              recording,
              setRecording,
              currentBeat,
              playing,
              togglePlaying,
              currentBeatIndex,
              currentPattern,
              selectedPattern,
              queueSelectedPattern,
              queuedSelectedPattern,
              spoolState,
            }}
          />
        </div>
      </div>

      <div
        className={
          onTouchDevice
            ? "absolute w-auto flex justify-center align-top"
            : "absolute left-10 top-10 w-10/100"
        }
        style={{
          transition: "top 0.2s ease",
          transitionDelay: "0.25s",
          top: showInstructionsPaper ? "26px" : "-130px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowing(true);
        }}
        onMouseEnter={onTouchDevice ? undefined : () => setShowing(true)}
      >
        <InstructionsPaper
          tilt={defaultTilt}
          // if on a touch device, paper should always be expanded kinda
          showing={show}
          setShowing={setShowing}
          pinned={pinned}
          setPinned={setPinned}
          onTouchDevice={onTouchDevice}
          takeTour={() => {
            setPinned(false);
            setShowing(false);
            setProductTourMode("intro");
          }}
        />
      </div>

      <ProductTour
        productTourMode={productTourMode}
        setProductTourMode={setProductTourMode}
        onTourStart={() => {
          resetPatterns();
          resetBPM();
          resetSelectedSound();
          resetSelectingMode();
          setRecording(false);
          pause();
        }}
        tilt={defaultTilt}
      />
    </div>
  );
};

export default PocketOperatorWrapper;
