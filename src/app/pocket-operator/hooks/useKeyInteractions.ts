import { useState, useMemo, useEffect } from "react"
import { SelectingMode } from "../utils"

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
}

// invoke button click events
const useKeyInteractions = ({
  onButtonClick,
  setSelectingMode,
  setRecording,
  setPlaying,
  goToNextBPM,
}) => {
  const [keyedButtons, setKeyedButtons] = useState<number[]>([])

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
    [setSelectingMode, setRecording, setPlaying, goToNextBPM],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the pressed key corresponds to a button number
      const buttonNumber = parseInt(event.key)

      if (!isNaN(buttonNumber)) {
        // Trigger the button click event
        onButtonClick(buttonNumber)
        setKeyedButtons((prev) => [...prev, buttonNumber])
      } else if (keymap[event.key]) {
        onButtonClick(keymap[event.key])
        setKeyedButtons((prev) => [...prev, keymap[event.key]])
      } else if (keyActions[event.key]) {
        keyActions[event.key]()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const buttonNumber = parseInt(event.key)

      if (!isNaN(buttonNumber)) {
        setKeyedButtons((prev) => prev.filter((key) => key !== buttonNumber))
      } else if (keymap[event.key]) {
        setKeyedButtons((prev) =>
          prev.filter((key) => key !== keymap[event.key]),
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [onButtonClick, keyActions])

  return { keyedButtons }
}

export default useKeyInteractions
