import { useState, useCallback, useMemo } from "react"

import useIsTouchDevice from "../../../../hooks/useIsTouchDevice"

const settingsDefault = { factor: 10 }

/**
 * Register a 3D tilt effect on a container.
 * Container must use some 3d style and accept React event handlers.
 */
const use3DTilt = (settings: { factor: number } = settingsDefault) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const onTouchDevice = useIsTouchDevice()

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } =
        event.currentTarget.getBoundingClientRect()
      const mouseX = event.clientX - left
      const mouseY = event.clientY - top
      const tiltX = (mouseX / width - 0.5) * settings.factor
      const tiltY = (mouseY / height - 0.5) * settings.factor
      setTilt({ x: tiltX, y: tiltY })
    },

    // Do not change with the settings object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // useMemo to avoid unnecessary re-renders or function re-definitions
  const mouseMoveHandler = useMemo(
    () => (onTouchDevice ? undefined : handleMouseMove),
    [onTouchDevice, handleMouseMove],
  )

  return { tilt, onMouseMove: mouseMoveHandler }
}

export default use3DTilt
