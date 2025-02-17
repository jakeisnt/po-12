import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import unmute from "./unmute";
import * as Tone from "tone";
import useSoundSourceURL from "./useSoundSourceURL";
const allowBackgroundPlayback = false;
const forceIOSBehavior = false;

/**
 * Loads a player
 * @param soundSourceUrl - The URL of the sound source
 * @param index - The index of the player
 * @returns A promise that resolves to a player
 */
const loadPlayer = (
  soundSourceUrl: string,
  index: number
): Promise<Tone.Player> =>
  new Promise<Tone.Player>((resolve, reject) => {
    try {
      const player = new Tone.Player({
        url: `${soundSourceUrl}${index}.wav`,
        onload: () => {
          const rawContext = player.context.rawContext;
          if (rawContext) {
            unmute(rawContext, allowBackgroundPlayback, forceIOSBehavior);
          }
          resolve(player);
        },
      }).toDestination();
    } catch (error) {
      reject(error);
    }
  });

/**
 * Loads all the players
 * @param soundSourceUrl - The URL of the sound source
 * @param playersRef - The ref to the players
 * @returns A promise that resolves to an array of players
 */
const loadPlayers = (
  soundSourceUrl: string,
  playersRef: MutableRefObject<Map<number, Tone.Player>>,
  prioritizeNotes?: number[]
) => {
  const indices = Array.from({ length: 16 }, (_, i) => i);

  if (prioritizeNotes?.length) {
    // Move prioritized indices to front
    prioritizeNotes.forEach((note) => {
      const idx = indices.indexOf(note);
      if (idx > -1) {
        indices.splice(idx, 1);
        indices.unshift(note);
      }
    });
  }

  const playerPromises = indices.map((i) =>
    loadPlayer(soundSourceUrl, i + 1).then((player) => {
      playersRef.current.set(i, player);
    })
  );

  return Promise.all(playerPromises);
};

/**
 * Load a player and play a note
 * @param soundSourceUrl - The URL of the sound source
 * @param bpm - The BPM of the player
 * @returns An object containing the play function, loading state, and error state
 */
const useSampler = () => {
  const soundSourceUrl = useSoundSourceURL();

  const playersRef = useRef<Map<number, Tone.Player>>(new Map());
  const [playersLoading, setPlayersLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Loads the players into memory.
   * @returns The players.
   */
  const loadPlayersIntoMemory = useCallback(
    async ({ prioritizeNotes }: { prioritizeNotes?: number[] } = {}) => {
      if (!playersRef.current.size && soundSourceUrl) {
        try {
          await loadPlayers(soundSourceUrl, playersRef, prioritizeNotes);
          setPlayersLoading(false);
        } catch (err) {
          setError(err);
          setPlayersLoading(false);
        }
      }
      return playersRef.current;
    },
    [soundSourceUrl]
  );

  useEffect(() => {
    loadPlayersIntoMemory();
  }, [loadPlayersIntoMemory]);

  /**
   * Plays a group of notes.
   * @param notes - The notes to play.
   */
  const play = useCallback(async (notes: number[]) => {
    // Only start audio context if not already started
    if (Tone.context.state !== "running") {
      await Tone.start();
      await Tone.loaded();
      Tone.context.lookAhead = 0;
    }

    if (!playersRef.current.size) {
      console.info("[useSampler.play] No players loaded. Loading players...");
    }

    const now = Tone.now();
    notes.forEach((note) => {
      const player = playersRef.current.get(note);
      if (player) {
        player.start(now);
      } else {
        console.error("[useSampler.play] No player found for note", note);
      }
    });
  }, []);

  return { play, loading: playersLoading, error };
};

export default useSampler;
