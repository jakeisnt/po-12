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
      className={`border opacity-60 px-1 text-sm shadow hover:shadow-md hover:opacity-100 ${
        disabled ? "hidden" : "block"
      }`}
      style={{
        borderRadius: "3px",
        maxHeight: "18px",
        verticalAlign: "text-bottom",
        margin: 0,
        fontSize: "12px",
        borderColor: "black",
        minWidth: "40px",
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
