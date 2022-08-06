interface GenerateHeptatonicScale {
  root: number;
  mode: number;
}

type Indexable = {
  [key: string]: any;
};

export function generateHeptatonicScale({
  root,
  mode,
}: GenerateHeptatonicScale): number[] {
  if (root < 0 || root > 11 || mode < 0 || mode > 1) return [];

  const modes = [
    [2, 2, 1, 2, 2, 2, 1],
    [2, 1, 2, 2, 1, 2, 2],
  ];

  let scale = [root];

  for (let i = 0; i < modes[mode].length - 1; i++) {
    let note = scale[i] + modes[mode][i];
    scale = [...scale, note < 12 ? note : note - 12];
  }

  return scale;
}

// export function generateHeptatonicScale({
//   root,
//   mode,
// }: GenerateHeptatonicScale): number[] | null {
//   if (root < 0 || root > 11 || mode < 0 || mode > 6) return null;

//   const ionianSequence = [2, 2, 1, 2, 2, 2, 1];
//   const sequenceEnd = ionianSequence.slice(0, mode);
//   const sequenceStart = ionianSequence.slice(mode, ionianSequence.length);
//   const modeSequence = [...sequenceStart, ...sequenceEnd];

//   let scale = [root];

//   for (let i = 0; i < modeSequence.length - 1; i++) {
//     let note = scale[i] + modeSequence[i];
//     scale = [...scale, note < 12 ? note : note - 12];
//   }

//   return scale;
// }

export function generateMajorCircleOfFifths() {
  let scales = [
    {
      root: 0,
      degree: 0,
      scale: generateHeptatonicScale({ root: 0, mode: 0 }),
    },
  ];

  let steps = 0;
  let noteAcc = normalizePitch(-5);

  while (steps < 7) {
    scales.push({
      root: noteAcc,
      degree: 2,
      scale: generateHeptatonicScale({ root: noteAcc, mode: 0 }),
    });

    noteAcc = normalizePitch(noteAcc - 5);
    steps++;
  }

  steps = 0;
  noteAcc = 5;

  while (steps < 7) {
    scales.unshift({
      root: noteAcc,
      degree: 1,
      scale: generateHeptatonicScale({ root: noteAcc, mode: 0 }),
    });

    noteAcc = normalizePitch(noteAcc + 5);
    steps++;
  }

  return scales;
}

interface PitchToNote {
  pitch: number;
  degree: number;
}

export function pitchToNote({ pitch, degree }: PitchToNote) {
  if (degree < 0 || degree > 2) return null;

  const noteSequences = [
    ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
    ["C", "D♭", "D", "E♭", "F♭", "F", "G♭", "G", "A♭", "A", "B♭", "C♭"],
    ["B♯", "C♯", "D", "D♯", "E", "E♯", "F♯", "G", "G♯", "A", "A♯", "B"],
  ];

  return noteSequences[degree][pitch];
}

export function normalizePitch(pitch: number) {
  return pitch < 0 ? pitch + 12 : pitch > 11 ? pitch - 12 : pitch;
}

// export function isScaleTheoretical(scale: number[]) {
//   const ionianSequence = [2, 2, 1, 2, 2, 2, 1];
//   const scaleRepeatRoot = [...scale, scale[0]];
//   let scaleAscending: number[] = [];

//   for (let i = 0; i < scaleRepeatRoot.length; i++) {
//     const current = scaleRepeatRoot[i];
//     let prev;
//     if (i > 0) prev = scaleRepeatRoot[i - 1];

//     scaleAscending = [
//       ...scaleAscending,
//       prev > current ? current + 12 : current,
//     ];
//   }

//   const scaleIntervals = scaleAscending.map((e, k) => {
//     if (k < scaleAscending.length) return scaleAscending[k + 1] - e;
//   });

//   const corrections = scaleIntervals.map((e, k) => e - ionianSequence[k]);

//   return corrections;
//   // return corrections.some((e) => e > 1 || e < -1);
// }

// function fixScale(scale) {
//   for (let i = 0; i < scale.length; i++) {
//     if (i > 0 && scale[i] < scale[i - 1]) {
//       scale[i] += 12;
//     }
//   }

//   return scale;
// }
