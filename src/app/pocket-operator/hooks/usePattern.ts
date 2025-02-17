import { useState, useMemo, useCallback } from "react";

import { useLocalStorage } from "./useLocalStorage";

import type { Note, Pattern } from "../PocketOperator/types";

// Pattern with all notes off.
// Used to disable everything at the end of every beat.
const ALL_OFF_PATTERN: Pattern = {
  notes: Array.from({ length: 16 }, () => []),
};

/**
 * Deep copy an array of patterns.
 */
const deepCopyPatterns = (patterns: Pattern[]) => {
  return [...patterns.map((p) => ({ ...p, notes: [...p.notes] }))];
};

/**
 * Is a pattern non-empty?
 */
const isNonEmpty = (pattern: Pattern) => {
  return pattern.notes.some((notes) => notes.length > 0);
};

// A default demo pattern.
const pattern1 = {
  notes: [
    [{ note: 1 }],
    [{ note: 2 }],
    [],
    [{ note: 3 }],
    [],
    [{ note: 1 }],
    [],
    [{ note: 1 }],
    [{ note: 1 }],
    [],
    [{ note: 3 }],
    [],
    [{ note: 1 }],
    [{ note: 1 }],
    [],
    [{ note: 3 }],
  ],
};

/**
 * Is a string valid JSON?
 */
const isValidJSON = (v: any) => {
  try {
    JSON.parse(v);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Is a note valid?
 *
 * A valid note is an object with a note property that is a number between 1-16.
 */
const isValidNote = (note: any): note is Note => {
  return (
    typeof note === "object" &&
    note?.note &&
    typeof note.note === "number" &&
    note.note >= 1 &&
    note.note <= 16
  );
};

/**
 * Is a single pattern valid?
 *
 * A valid pattern is an object with a notes property that is an array of 16 places.
 */
const isValidPattern = (pattern: any): pattern is Pattern[] => {
  if (!(typeof pattern === "object")) return false;
  if (pattern?.notes?.length !== 16) return false;
  return pattern.notes.every((place: any) => {
    if (!Array.isArray(place)) return false;
    return place.every(isValidNote);
  });
};

/**
 * Is a pattern set valid?
 *
 * A valid pattern set is an array of 16 patterns, each with 16 places.
 * Each place is an array of notes.
 */
const isValidPatternSet = (v: any): v is Pattern[] => {
  if (!Array.isArray(v)) return false;
  if (v.length !== 16) return false;
  return v.every(isValidPattern);
};

/**
 * If we have less than 16 patterns, fill the rest with the empty pattern.
 */
const padPatterns = (patterns: Pattern[]) => {
  const currentPatterns = patterns;

  while (patterns.length < 16) {
    patterns.push(ALL_OFF_PATTERN);
  }

  return currentPatterns;
};

/**
 * Use patterns.
 */
const usePatterns = () => {
  const [patterns, setPatterns] = useLocalStorage(
    "pocketOperatorPatternGroups",
    padPatterns([pattern1])
  );

  const [uploadingState, setUploadingState] = useState<
    "success" | "fail" | undefined
  >();

  /**
   * Enable or disable a note in a pattern.
   */
  const togglePatternNote = useCallback(
    (currentPattern: number, placeInPattern: number, noteInPlace: number) => {
      setPatterns((patterns) => {
        const newPatterns = deepCopyPatterns(patterns);

        const pattern = newPatterns[currentPattern - 1];
        const notesPlayed = pattern.notes[placeInPattern - 1];

        // if the note is already in the pattern, remove it
        if (notesPlayed.map((note) => note.note).includes(noteInPlace)) {
          newPatterns[currentPattern - 1].notes[placeInPattern - 1] =
            notesPlayed.filter((note) => note.note !== noteInPlace);
        } else {
          newPatterns[currentPattern - 1].notes[placeInPattern - 1] =
            notesPlayed.concat({ note: noteInPlace });
        }

        return newPatterns;
      });
    },
    []
  );

  /**
   * Read patterns from a file.
   */
  const setPatternsFromFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;

        if (typeof text === "string" && isValidJSON(text)) {
          const parsed = JSON.parse(text);
          if (isValidPatternSet(parsed)) {
            setPatterns(parsed);
            setUploadingState("success");
          } else {
            setUploadingState("fail");
          }
        } else {
          setUploadingState("fail");
        }

        setTimeout(() => {
          setUploadingState(undefined);
        }, 1000);
      };

      reader.readAsText(file);
    },
    [setPatterns]
  );

  /**
   * Get the indices of the supported patterns.
   *
   * A supported pattern is a pattern that is non-empty.
   */
  const supportedPatternIndices = useMemo(
    () =>
      patterns
        .map(isNonEmpty)
        .map((supported, i) => (supported ? i + 1 : -1))
        .filter((i) => i !== -1),
    [patterns]
  );

  /**
   * Reset the patterns to the default demo pattern.
   */
  const resetPatterns = useCallback(
    () => setPatterns(padPatterns([pattern1])),
    [setPatterns]
  );

  return {
    patterns,
    supportedPatternIndices,
    togglePatternNote,
    setPatternsFromFile,
    uploadingState,
    resetPatterns,
  };
};

export { usePatterns };
