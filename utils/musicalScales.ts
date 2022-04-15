interface GenerateScale {
  root: number;
  mode: number;
  notes: string;
}

type Indexable = {
  [key: string]: string[];
};

export function generateScale({
  root,
  mode,
  notes,
}: GenerateScale): string[] | null {
  if (root < 0 || root > 11 || mode < 0 || mode > 6) return null;

  const ionianSequence = [2, 2, 1, 2, 2, 2, 1];
  const sequenceEnd = ionianSequence.slice(0, mode);
  const sequenceStart = ionianSequence.slice(mode, ionianSequence.length);
  const modeSequence = [...sequenceStart, ...sequenceEnd];
  const noteMapping: Indexable = {
    natural: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
    sharp: ["B♯", "C♯", "D", "D♯", "E", "E♯", "F♯", "G", "G♯", "A", "A♯", "B"],
    flat: ["C", "D♭", "D", "E♭", "F♭", "F", "G♭", "G", "A♭", "A", "B♭", "C♭"],
  };
  let scale = [root];

  for (let i = 0; i < modeSequence.length - 1; i++) {
    let note = scale[i] + modeSequence[i];
    scale = [...scale, note < 12 ? note : note - 12];
  }

  return scale.map((e, k) => noteMapping[notes][scale[k]]);
}

export function normalizePitch(pitch: number) {
  return pitch < 0 ? pitch + 12 : pitch > 11 ? pitch - 12 : pitch;
}
