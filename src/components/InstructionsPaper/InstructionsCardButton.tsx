import type { ReactNode } from "react";
import classes from "./instructionsCardButton.module.scss";
import { cn } from "@/lib/utils";

type InstructionsCardButtonProps = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
};

/**
 * A button that is used within the instructions paper.
 */
const InstructionsCardButton = ({
  onClick,
  children,
  disabled = false,
}: InstructionsCardButtonProps) => {
  return (
    <button
      className={cn(
        classes.instructionsCardButton,
        disabled && classes.disabled
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={classes.buttonChildren}>{children}</div>
    </button>
  );
};

export default InstructionsCardButton;
