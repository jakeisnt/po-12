import { useState, useMemo, useCallback } from "react"
import FixedMagnifyingGlass from "./MagnifyingGlass/FixedMagnifyingGlass"
import ProductTourNote from "./InstructionsPaper/ProductTourNote"
import { ProductTourIntro } from "./InstructionsPaper/ProductTourNote"
import { Step, TOUR_STEPS } from "./productTourInstructions"

/**
 * Get the current step we're showing to users.
 * @param currentStep the step we're on so far
 * @param subStepIndex the index of the substep in that step
 * @returns what we should be showing rihgt now.
 */
const getStepSoFar = (currentStep: Step, subStepIndex: number) => {
  const { substeps } = currentStep

  const currentText = (substeps ?? [])
    .slice(0, subStepIndex + 1)
    .map((substep) => substep.text ?? "")
    .join("")

  const classNameToClick = substeps[subStepIndex].classNameToClick

  return {
    text: currentText,
    classNameToClick,
  }
}

/**
 * Shows the steps of the product tour one by one.
 */
const ProductTourContents = ({ onFinish, tilt, restartTour }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0)

  const REVERSED_TOUR_STEPS = useMemo(() => TOUR_STEPS.toReversed(), [])

  // the current step of the product tour that we're on.
  const currentStep = getStepSoFar(
    TOUR_STEPS[currentStepIndex],
    currentSubStepIndex,
  )

  /**
   * Show the next step of the product tour.
   */
  const goToNextStep = useCallback(() => {
    if (
      currentStepIndex === TOUR_STEPS.length - 1 &&
      currentSubStepIndex === TOUR_STEPS[currentStepIndex].substeps.length - 1
    ) {
      onFinish()
      return
    }

    if (
      currentSubStepIndex ===
      TOUR_STEPS[currentStepIndex].substeps.length - 1
    ) {
      setCurrentStepIndex(currentStepIndex + 1)
      setCurrentSubStepIndex(0)
      return
    }

    setCurrentSubStepIndex(currentSubStepIndex + 1)
  }, [currentStepIndex, currentSubStepIndex, onFinish])

  const [classNameToClick, setClassNameToClick] = useState<string>()
  const highlightNextButton = useCallback((nextClassName: string) => {
    setClassNameToClick(nextClassName)
  }, [])

  return (
    <>
      <FixedMagnifyingGlass
        classNameToTarget={classNameToClick}
        onClick={goToNextStep}
      />
      {REVERSED_TOUR_STEPS.map((currentStepThing, reverseI) => {
        const i = REVERSED_TOUR_STEPS.length - 1 - reverseI
        const currentStep = getStepSoFar(
          currentStepThing,
          currentStepIndex === i ? currentSubStepIndex : 0,
        )

        return (
          <ProductTourNote
            key={`productTourNoteWithText-${currentStepThing.substeps[0].text}`}
            tilt={tilt}
            step={currentStep}
            hide={i < currentStepIndex}
            onClose={onFinish}
            restartTour={restartTour}
            isCurrentStep={i === currentStepIndex}
            highlightNextButton={highlightNextButton}
          />
        )
      })}
    </>
  )
}

/**
 * Configures the product tour. Helps the user progress thru.
 */
const ProductTour = ({
  productTourMode,
  setProductTourMode,
  onTourStart,
  tilt,
}) => {
  return (
    <>
      {productTourMode === "tour" && (
        <ProductTourContents
          tilt={tilt}
          onFinish={() => setProductTourMode("finished")}
          restartTour={() => setProductTourMode("intro")}
        />
      )}
      <ProductTourIntro
        tilt={tilt}
        onClickNo={() => setProductTourMode("finished")}
        onClickYes={() => {
          onTourStart()
          setProductTourMode("tour")
        }}
        show={productTourMode === "intro"}
      />
    </>
  )
}

export default ProductTour
