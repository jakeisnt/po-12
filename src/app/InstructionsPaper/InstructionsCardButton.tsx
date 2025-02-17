import type { ReactNode } from "react";

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
      style={{
        border: "1px solid black",
        opacity: 0.6,
        padding: "4px",
        borderRadius: "3px",
        maxHeight: "18px",
        verticalAlign: "text-bottom",
        margin: 0,
        fontSize: "12px",
        borderColor: "black",
        minWidth: "40px",
        display: disabled ? "none" : "block",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        "&:hover": {
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          opacity: 1,
        },
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <div style={{ marginTop: "-3px" }}>{children}</div>
    </button>
  );
};

export default InstructionsCardButton;
