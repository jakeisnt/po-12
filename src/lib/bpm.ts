// modes that the metronome can be in
// each one is associated with a BPM - or should be!
enum MetronomeModes {
  HIP_HOP = 80,
  DISCO = 120,
  TECHNO = 140,
}

// Names of the different modes
enum MetronomeModeNames {
  HIP_HOP = "HIP-HOP",
  DISCO = "DISCO",
  TECHNO = "TECHNO",
}

const modes = [
  MetronomeModeNames.HIP_HOP,
  MetronomeModeNames.DISCO,
  MetronomeModeNames.TECHNO,
];

const getBPMMode = (bpm: number): string | undefined => {
  if (bpm === MetronomeModes.HIP_HOP) {
    return MetronomeModeNames.HIP_HOP;
  } else if (bpm === MetronomeModes.DISCO) {
    return MetronomeModeNames.DISCO;
  } else if (bpm === MetronomeModes.TECHNO) {
    return MetronomeModeNames.TECHNO;
  }
};

const modeToBPM = (
  mode:
    | MetronomeModeNames.HIP_HOP
    | MetronomeModeNames.DISCO
    | MetronomeModeNames.TECHNO
) => {
  if (mode === MetronomeModeNames.HIP_HOP) {
    return MetronomeModes.HIP_HOP;
  } else if (mode === MetronomeModeNames.DISCO) {
    return MetronomeModes.DISCO;
  } else if (mode === MetronomeModeNames.TECHNO) {
    return MetronomeModes.TECHNO;
  }
};

const getNextBPM = (bpm: number): number => {
  const mode = getBPMMode(bpm);

  if (mode === MetronomeModeNames.HIP_HOP) {
    return MetronomeModes.DISCO;
  } else if (mode === MetronomeModeNames.DISCO) {
    return MetronomeModes.TECHNO;
  } else if (mode === MetronomeModeNames.TECHNO) {
    return MetronomeModes.HIP_HOP;
  }

  return bpm;
};

export { getBPMMode, modeToBPM, getNextBPM, MetronomeModes, modes };
