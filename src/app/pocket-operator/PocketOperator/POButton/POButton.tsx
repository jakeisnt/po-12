import { ReactNode } from "react";
import classes from "./button.module.scss";
import { cn } from "../../../lib/utils";

enum ButtonStatus {
  NONE = "none",
  NOTED = "noted",
  HIGHLIGHTED = "highlighted",
  ACTIVE = "active",
}

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  onRelease?: () => void;
  flipColors?: boolean;
  active?: boolean;
  hovered?: boolean;
  status?: ButtonStatus;
  disabledBecause?: string;
  ariaLabel?: string;
}

/**
 * Get class name for button status.
 */
const getClassName = (status: ButtonStatus) => {
  switch (status) {
    case ButtonStatus.ACTIVE:
      return classes.activeInput;
    case ButtonStatus.HIGHLIGHTED:
      return classes.highlightedInput;
    case ButtonStatus.NOTED:
      return classes.notedInput;
    default:
      return undefined;
  }
};

/**
 * Pocket operator button.
 */
const Button = ({
  children,
  onClick,
  onRelease,
  flipColors,
  status = ButtonStatus.NONE,
  disabledBecause,
  ariaLabel,
}: ButtonProps) => {
  const childIsPrimitive =
    typeof children === "string" || typeof children === "number";

  const buttonLabel =
    typeof children === "string" || typeof children === "number"
      ? `soundButton-${children}`
      : ariaLabel;

  return (
    <div
      className={cn(
        classes.toggle,
        "pocketOperatorMouseTarget",
        flipColors && classes.flipColors,
        buttonLabel
      )}
      style={{
        margin: -5,
      }}
    >
      {disabledBecause && disabledBecause !== "" && (
        <div className={classes.tooltip}>
          <span className={classes.tooltipText}>{disabledBecause}</span>
        </div>
      )}
      <div
        role="button"
        id={buttonLabel}
        aria-label={buttonLabel}
        tabIndex={disabledBecause ? -1 : 0}
        className={cn(classes.input, !disabledBecause && getClassName(status))}
        onPointerDown={(e) => {
          if (disabledBecause) {
            return;
          }

          onClick?.();

          typeof navigator !== "undefined" && navigator?.vibrate?.(100);
          e.currentTarget.classList.add(classes.userTriggeredActiveButton);

          // Prevent focus on click.
          e.preventDefault();
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onMouseEnter={(e) => {
          !disabledBecause &&
            e.currentTarget.classList.add(classes.userTriggeredHoverButton);
        }}
        onMouseLeave={(e) => {
          !disabledBecause &&
            e.currentTarget.classList.remove(classes.userTriggeredHoverButton);
        }}
        onPointerUp={(e) => {
          if (disabledBecause) {
            return;
          }

          onRelease?.();
          e.currentTarget.classList.remove(classes.userTriggeredActiveButton);
        }}
      />
      <span className={classes.button}></span>
      <div className={cn(classes.label, childIsPrimitive && classes.labelText)}>
        {children}
      </div>
      <span className={classes.light}></span>
      <div className={classes.lightPixel}></div>
    </div>
  );
};

export { ButtonStatus };
export default Button;
