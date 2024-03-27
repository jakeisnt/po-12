import { useRef, useState, useEffect, useCallback } from "react"
import { flushSync } from "react-dom"

const useCurrentBeat = (bpm: number) => {
  const [currentBeat, setCurrentBeat] = useState(0)
  const [playing, setPlaying] = useState(false)
  const intervalRef = useRef<any>()

  const startPlaying = useCallback((bpm: number) => {
    intervalRef.current = setInterval(
      () => {
        flushSync(() => setCurrentBeat((currentBeat) => currentBeat + 0.0625))
      },
      60000 / 4 / 16 / bpm,
    )

    setPlaying(true)
  }, [])

  // when the bpm changs, start a new interval with the new bpm
  useEffect(() => {
    if (!intervalRef.current) {
      return
    }

    clearInterval(intervalRef.current)
    startPlaying(bpm)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm])

  // when we start playing, we want to start the interval if it doesn't already exist.
  const play = useCallback(() => {
    if (intervalRef.current) {
      return
    }

    startPlaying(bpm)
  }, [bpm, startPlaying])

  // when we pause, we want to clear the interval if it exists completely.
  const pause = useCallback(() => {
    if (!intervalRef.current) {
      return
    }

    clearInterval(intervalRef.current)
    intervalRef.current = undefined
    setCurrentBeat(0)
    setPlaying(false)
  }, [])

  const togglePlaying = playing ? pause : play

  return { currentBeat, playing, togglePlaying, pause }
}

export default useCurrentBeat
