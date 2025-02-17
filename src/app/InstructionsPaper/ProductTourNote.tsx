import { useState, useMemo, useEffect, useRef } from "react";

import InstructionsCardButton from "./InstructionsCardButton";
import classes from "./instructionsPaper.module.scss";
import { cn } from "@/lib/utils";

type ProductTourIntroProps = {
  onClickNo: () => void;
  onClickYes: () => void;
  tilt: { x: number; y: number };
  show: boolean;
};

const ProductTourIntro = ({
  onClickNo,
  onClickYes,
  tilt: { x, y },
  show,
}: ProductTourIntroProps) => {
  return (
    <div
      className={cn(
        classes.firstIntroCardBox,
        show && classes.firstIntroCardBoxShown
      )}
      style={{
        transform: `rotateX(${y}deg) rotateY(${x}deg)`,
        top: show ? "12%" : "-200px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div>
        This device plays audio! Turn up your volume. Would you like a tour?
      </div>
      <div>This will erase any current patterns.</div>
      <div className="flex justify-end w-full gap-8">
        <InstructionsCardButton onClick={onClickNo}>no</InstructionsCardButton>

        <InstructionsCardButton onClick={onClickYes}>
          yes
        </InstructionsCardButton>
      </div>
    </div>
  );
};

const delayInterval = 40;
const ProductTourNote = ({
  step,
  tilt: { x, y },
  hide,
  isCurrentStep,
  onClose,
  restartTour,
  highlightNextButton,
}) => {
  const rotationXSkew = useMemo(() => (Math.random() - 0.5) * 10, []);
  const rotationYSkew = useMemo(() => (Math.random() - 0.5) * 10, []);
  const rotationZSkew = useMemo(() => (Math.random() - 0.5) * 3, []);
  const positionSkew = useMemo(() => (Math.random() - 0.5) * 10, []);

  const [wordsDisplayed, setWordsDisplayed] = useState("");
  const wordsSeenSoFar = useRef("");
  const queuedLetters = useRef<{ char: string; classNameToClick: string }[]>(
    []
  );
  const delay = useRef(delayInterval * 25);

  useEffect(() => {
    // never update the words displayed if we're hiding things.
    if (!isCurrentStep) return;

    const queueLetter = () =>
      setTimeout(() => {
        const { char, classNameToClick } = queuedLetters.current.shift() ?? {};

        if (!char) {
          delay.current = delayInterval;
          return queueLetter();
        }

        // if we end a sentence, take a big breather.
        if (char === ".") {
          setWordsDisplayed((curWords) => (curWords += char));
          delay.current += delayInterval * 10;
          // a special character. queues the next button.
          // not visible to the user.
        } else if (char === "|") {
          highlightNextButton(classNameToClick);
        } else {
          setWordsDisplayed((curWords) => (curWords += char));
          // otherwise continue at the same letter rate.
          delay.current = delayInterval;
        }

        return queueLetter();
      }, delay.current);

    const curTimeout = queueLetter();
    return () => clearTimeout(curTimeout);
  }, [isCurrentStep]);

  useEffect(() => {
    const { text, classNameToClick } = step;
    const newText = text.replace(wordsSeenSoFar.current, "").split("");
    queuedLetters.current.push.apply(
      queuedLetters.current,
      newText.map((char) => ({
        char,
        classNameToClick,
      }))
    );
    wordsSeenSoFar.current = text;
  }, [step]);

  return (
    <div
      className={classes.introCardBox}
      style={{
        transform: `rotateX(${y * rotationXSkew}deg) rotateY(${
          x * rotationYSkew
        }deg) rotateZ(${rotationZSkew}deg)`,
        marginTop: `${positionSkew}px`,
        top: hide ? "-200px" : "12%",
      }}
    >
      <div>{wordsDisplayed}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          width: "100%",
          gap: "8px",
        }}
      >
        <InstructionsCardButton onClick={onClose}>
          skip tour
        </InstructionsCardButton>
        <InstructionsCardButton onClick={restartTour}>
          restart
        </InstructionsCardButton>
      </div>
    </div>
  );
};

export { ProductTourIntro };
export default ProductTourNote;
