export enum SharpsOrFlats {
  Natural,
  Flat,
  Sharp,
}

interface ScaleConstructor {
  root: number;
  sharpsOrFlats: SharpsOrFlats;
  mode: number;
  intervals?: number[];
}

export interface Scale {
  root: number;
  sharpsOrFlats: SharpsOrFlats;
  mode: number;
  intervals: number[];
  notes: number[];
}

export class Scale {
  constructor({
    root,
    sharpsOrFlats,
    mode,
    intervals = Scale.intervalSequences.heptatonicNaturalMajor,
  }: ScaleConstructor) {
    this.root = root;
    this.sharpsOrFlats = sharpsOrFlats;
    this.mode = mode;
    this.intervals = intervals;
    this.notes = Scale.generateScale({ root, mode, intervals });
  }

  public static intervalSequences = {
    heptatonicNaturalMajor: [2, 2, 1, 2, 2, 2, 1],
    pentatonicNaturalMajor: [2, 2, 3, 2, 3],
  };

  static generateScale({
    root,
    mode,
    intervals,
  }: {
    root: number;
    mode: number;
    intervals: number[];
  }): number[] {
    if (root < 0 || root > 11 || mode < 0 || mode > intervals.length - 1)
      return [];

    const sequenceEnd = intervals.slice(0, mode);
    const sequenceStart = intervals.slice(mode, intervals.length);
    const modeSequence = [...sequenceStart, ...sequenceEnd];

    let scale = [root];

    for (let i = 0; i < modeSequence.length - 1; i++) {
      let note = scale[i] + modeSequence[i];
      scale = [...scale, Scale.normalizePitch(note)];
    }

    return scale;
  }

  static normalizePitch(pitch: number) {
    return Math.abs(pitch - Math.floor(pitch / 12) * 12);
  }

  static pitchToNote({
    pitch,
    sharpsOrFlats,
  }: {
    pitch: number;
    sharpsOrFlats: number;
  }): string {
    if (sharpsOrFlats < 0 || sharpsOrFlats > 2) return "";

    const noteSequences = [
      ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
      ["C", "D♭", "D", "E♭", "F♭", "F", "G♭", "G", "A♭", "A", "B♭", "C♭"],
      ["B♯", "C♯", "D", "D♯", "E", "E♯", "F♯", "G", "G♯", "A", "A♯", "B"],
    ];

    return noteSequences[sharpsOrFlats][pitch];
  }

  static noteAlphabetToUnicode(note: string) {
    return note.replace("#", "♯").replace("b", "♭");
  }

  static noteUnicodeToAlphabet(note: string) {
    return note.replace("♯", "#").replace("♭", "b");
  }

  static generateCircleOfInterval({
    root,
    mode,
    iterations,
    intervals,
  }: {
    root: number;
    mode: number;
    iterations: number;
    intervals: number[];
  }) {
    let scales: Scale[] = [
      {
        root,
        mode,
        sharpsOrFlats: 0,
        intervals,
        notes: Scale.generateScale({
          root,
          mode,
          intervals: intervals,
        }),
      },
    ];

    let steps = 0;
    let noteAcc = Scale.normalizePitch(-5);

    while (steps < iterations) {
      scales.push({
        root: noteAcc,
        mode,
        sharpsOrFlats: 2,
        intervals,
        notes: Scale.generateScale({
          root: noteAcc,
          mode,
          intervals: intervals,
        }),
      });

      noteAcc = Scale.normalizePitch(noteAcc - 5);
      steps++;
    }

    steps = 0;
    noteAcc = 5;

    while (steps < iterations) {
      scales.unshift({
        root: noteAcc,
        mode,
        sharpsOrFlats: 1,
        intervals,
        notes: Scale.generateScale({
          root: noteAcc,
          mode,
          intervals: intervals,
        }),
      });

      noteAcc = Scale.normalizePitch(noteAcc + 5);
      steps++;
    }

    return scales;
  }
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
