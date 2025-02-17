import React, { useState, useEffect, useRef } from "react";
import classes from "./magnifyingGlass.module.scss";

const withinBbox = (
  event: MouseEvent,
  bbox: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
) => {
  return (
    event.clientX >= bbox.left &&
    event.clientX <= bbox.right &&
    event.clientY >= bbox.top &&
    event.clientY <= bbox.bottom
  );
};

/**
 * Get the border radius configuration.
 * @param elem  the element to get the config from
 * @param borderRadiusOffset the offset from the element to introduce if needed
 */
const getBorderRadiusConfig = (elem: Element, borderRadiusOffset: number) => {
  const style = window.getComputedStyle(elem);

  const currentBorderRadius = Number.parseInt(style.borderRadius, 10);
  const borderTopLeftRadius = Number.parseInt(style.borderTopLeftRadius, 10);
  const borderTopRightRadius = Number.parseInt(style.borderTopRightRadius, 10);
  const borderBottomLeftRadius = Number.parseInt(
    style.borderBottomLeftRadius,
    10
  );
  const borderBottomRightRadius = Number.parseInt(
    style.borderBottomRightRadius,
    10
  );
  return {
    borderRadius: `${currentBorderRadius + borderRadiusOffset}px`,
    borderTopLeftRadius: borderTopLeftRadius
      ? `${borderTopLeftRadius + borderRadiusOffset}px`
      : undefined,
    borderTopRightRadius: borderTopRightRadius
      ? `${borderTopRightRadius + borderRadiusOffset}px`
      : undefined,
    borderBottomLeftRadius: borderBottomLeftRadius
      ? `${borderBottomLeftRadius + borderRadiusOffset}px`
      : undefined,
    borderBottomRightRadius: borderBottomRightRadius
      ? `${borderBottomRightRadius + borderRadiusOffset}px`
      : undefined,
  };
};

// constants -> configuration for the glass.
const radius = 65;
const surroundPadding = 10;
const radiusDiff = 5;
const borderRadiusOffset = 2;

const defaultBorderRadiusConfig = {
  borderRadius: "100%",
};

/**
 * Magnifying glass fixed to a particular element.
 */
const FixedMagnifyingGlass = ({ classNameToTarget, onClick }) => {
  const [targetedElement, setTargetedElement] = useState<Element | null>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [offsetRadius, setOffsetRadius] = useState(0); // initial radius of the circle

  const [width, setWidth] = useState(radius);
  const [height, setHeight] = useState(radius);
  const [borderRadiusConfig, setBorderRadiusConfig] = useState<any>(
    defaultBorderRadiusConfig
  );

  const [glassCircle, setGlassCircle] = useState<HTMLDivElement | null>(null);

  // whenever the class name to target changes, change the targeted element
  useEffect(() => {
    const element = document.querySelector(`.${classNameToTarget}`);
    if (!element) {
      console.warn("Could not find element with class name", classNameToTarget);
    }
    setTargetedElement(element);
  }, [classNameToTarget]);

  // if the targeted element changes, adjust the cached width, height, etc
  useEffect(() => {
    if (!targetedElement) {
      return;
    }

    // set up the targeted element
    const bbox = targetedElement.getBoundingClientRect();

    const nextWidth = bbox.width + surroundPadding;
    const nextHeight = bbox.height + surroundPadding;

    setPosition({
      x: bbox.left + bbox.width / 2,
      y: bbox.top + bbox.height / 2,
    });

    setWidth(nextWidth);
    setHeight(nextHeight);

    setBorderRadiusConfig(
      getBorderRadiusConfig(targetedElement, borderRadiusOffset)
    );

    // allow for the position to update when the window resizes
    const handleResize = () => {
      if (!targetedElement) {
        return;
      }

      const bbox = targetedElement.getBoundingClientRect();

      setPosition({
        x: bbox.left + bbox.width / 2,
        y: bbox.top + bbox.height / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [targetedElement]);

  const mouseDownFiredWithinBbox = useRef(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      mouseDownFiredWithinBbox.current =
        (targetedElement &&
          withinBbox(event, targetedElement.getBoundingClientRect())) ||
        false;

      if (mouseDownFiredWithinBbox.current) {
        setOffsetRadius((prevRadius) => prevRadius - radiusDiff);
      }
    };

    const handleMouseUp = () => {
      setOffsetRadius(0);

      if (mouseDownFiredWithinBbox.current) {
        // remove the mousemove listener so we don't change the position anymore
        // it's okay to do this because we know the onClick will reset which
        // element this is highlighting
        window.removeEventListener("pointerup", handleMouseUp);
        window.removeEventListener("pointerdown", handleMouseDown);

        onClick();
        mouseDownFiredWithinBbox.current = false;
      }
    };

    window.addEventListener("pointerup", handleMouseUp);
    window.addEventListener("pointerdown", handleMouseDown);

    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
      window.removeEventListener("pointerdown", handleMouseDown);
    };
  }, [glassCircle, targetedElement, onClick]);

  return (
    <div
      className={classes.magnifyingGlassContainer}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className={classes.magnifyingGlass}>
        <div
          className={classes.lens}
          ref={setGlassCircle}
          style={{
            width: `${width + offsetRadius}px`,
            height: `${height + offsetRadius}px`,
            ...borderRadiusConfig,
          }}
        >
          <div className={classes.lensBody} style={{ ...borderRadiusConfig }} />
        </div>
      </div>
    </div>
  );
};

export default FixedMagnifyingGlass;
