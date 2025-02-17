import { cn } from "@/lib/utils";
import classes from "./instructionsPaper.module.scss";
import { useState } from "react";
import {
  OneButtonIcon,
  SixteenButtonIcon,
  DotgridIcon,
  SCurveIcon,
  MetronomeIcon,
  RecordIcon,
  PlayIcon,
} from "./icons";
import InstructionsCardButton from "./InstructionsCardButton";
import type { Dispatch, SetStateAction } from "react";

type InstructionsPaperProps = {
  tilt: { x: number; y: number };
  showing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
  takeTour: () => void;
  onTouchDevice: boolean;
};

/**
 * A paper that unfolds to reveal instructions that you can read.
 */
const InstructionsPaper = ({
  tilt: { x, y },
  showing,
  setShowing,
  pinned,
  setPinned,
  takeTour,
  onTouchDevice,
}: InstructionsPaperProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(classes.stage, (pinned || open) && classes.open)}
      style={{
        transform: `rotateX(${y}deg) rotateY(${x}deg)`,
        width: open ? "312px" : "250px",
        height: open ? "312px" : "200px",
        color: "rgba(0, 0, 0, 0.75)",
        textShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
        ...(!showing && !pinned && onTouchDevice
          ? {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginRight: "8px",
            }
          : {}),
      }}
      onClick={(e) => {
        e.stopPropagation();

        setOpen((open) => !open);
        setShowing((showing) => !showing);
      }}
      onMouseLeave={
        !onTouchDevice && open
          ? (e) => {
              e.preventDefault();
              setOpen(false);
              setShowing(false);
            }
          : undefined
      }
    >
      <div
        className={cn(classes.box, classes.box1)}
        style={{ pointerEvents: "all" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setOpen((open) => !open);
          setShowing((showing) => !showing);
        }}
        onMouseEnter={onTouchDevice ? undefined : () => setOpen(true)}
      >
        <div>
          PO-12 rhythm
          <br />
          manual
          <br />
          [po en]
          <br />
        </div>
      </div>
      <div className={cn(classes.box, classes.box2)}>
        <ul style={{ fontSize: "13px", width: "100%" }}>
          <li>
            [<OneButtonIcon /> - <SixteenButtonIcon />
            ]: play note
          </li>
          <li>
            [<DotgridIcon />
            ]: choose pattern
          </li>
          <li>
            [<SCurveIcon />
            ]: choose sound
          </li>
          <li>
            [<MetronomeIcon />
            ]: change bpm
          </li>
          <li>
            [<RecordIcon />
            ]: record
          </li>
          <li>
            [<PlayIcon />
            ]: play
          </li>
        </ul>
      </div>
      <div className={cn(classes.box, classes.box3)}>
        <ul
          style={{
            fontSize: "13px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "between",
            alignItems: "start",
          }}
        >
          <li
            style={{
              display: "flex",
              justifyContent: "between",
              width: "100%",
            }}
          >
            <div>{"] import"}</div> <div>{"export [→"}</div>
          </li>
        </ul>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "between",
            alignItems: "start",
          }}
        >
          <div className={classes.instructionsPaperKeymap}>
            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>1</div>
              <div className={classes.instructionsPaperCell}>2</div>
              <div className={classes.instructionsPaperCell}>3</div>
              <div className={classes.instructionsPaperCell}>4</div>
            </div>

            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>q</div>
              <div className={classes.instructionsPaperCell}>w</div>
              <div className={classes.instructionsPaperCell}>e</div>
              <div className={classes.instructionsPaperCell}>r</div>
            </div>

            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>a</div>
              <div className={classes.instructionsPaperCell}>s</div>
              <div className={classes.instructionsPaperCell}>d</div>
              <div className={classes.instructionsPaperCell}>f</div>
            </div>

            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>z</div>
              <div className={classes.instructionsPaperCell}>x</div>
              <div className={classes.instructionsPaperCell}>c</div>
              <div className={classes.instructionsPaperCell}>v</div>
            </div>
          </div>

          <div
            className={classes.instructionsPaperKeymap}
            style={{
              fontSize: "13px",
            }}
          >
            <div className={classes.instructionsPaperRow}>
              <SCurveIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>j</div>
            </div>
            <div className={classes.instructionsPaperRow}>
              <DotgridIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>k</div>
            </div>
            <div className={classes.instructionsPaperRow}>
              <MetronomeIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>l</div>
            </div>
            <div className={classes.instructionsPaperRow}>
              <RecordIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>&#183;</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(classes.box, classes.box4)}
        style={{
          fontSize: "10px",
          lineHeight: "0.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "between",
          alignItems: "start",
          gap: "4px",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: "8px",
            lineHeight: "0.5rem",
            paddingLeft: "10px",
            paddingTop: "10px",
          }}
        >
          This is an unlicensed partial reimplementation of a hardware device.
          All design credit goes to Teenage Engineering.
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "between",
            alignItems: "end",
          }}
        >
          <div className={classes.instructionsPaperKeymap}>
            <div className={classes.instructionsPaperRow}>
              <PlayIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>&#9141;</div>
            </div>
          </div>
          <a
            href="https://teenage.engineering/store/po-12"
            target="_blank"
            // className="text-gray-500 hover:text-gray-400"
            style={{
              color: "rgba(0, 0, 0, 0.75)",
              textDecoration: "none",
              "&:hover": {
                color: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            link: buy original
          </a>

          <a
            href="https://teenage.engineering/guides/po-12/en"
            target="_blank"
            // className="text-gray-500 hover:text-gray-400"
            style={{
              color: "rgba(0, 0, 0, 0.75)",
              textDecoration: "none",
              "&:hover": {
                color: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            link: full manual
          </a>

          <span>
            by{" "}
            <a
              href="https://twitter.com/@jakeissnt"
              target="_blank"
              style={{
                color: "rgba(0, 0, 0, 0.75)",
                textDecoration: "none",
                "&:hover": {
                  color: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              @jakeissnt
            </a>{" "}
          </span>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "between",
              alignItems: "baseline",
            }}
          >
            <InstructionsCardButton
              onClick={() => {
                setOpen(false);
                takeTour();
              }}
            >
              take tour
            </InstructionsCardButton>
            <InstructionsCardButton
              onClick={() => setPinned((pinned) => !pinned)}
              disabled={onTouchDevice}
            >
              {pinned ? "unpin" : "pin"}
            </InstructionsCardButton>
            <InstructionsCardButton
              onClick={() => {
                setOpen(false);
                setShowing(false);
                setPinned(false);
              }}
            >
              close
            </InstructionsCardButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPaper;
