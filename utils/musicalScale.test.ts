import { generateScale, normalizePitch, pitchToNote } from "./musicalScales";

test("Scale of root 11 and mode 0 and Flat notes returns Cb Ionian/Major", () => {
  expect(generateScale({ root: 11, mode: 0 })).toStrictEqual([
    11, 1, 3, 4, 6, 8, 10,
  ]);
});

test("Scale of root 11 and mode 1 and Flat notes returns Cb Dorian", () => {
  expect(generateScale({ root: 11, mode: 1 })).toStrictEqual([
    11, 1, 2, 4, 6, 8, 9,
  ]);
});

test("Scale of root 11 and mode 6 and Flat notes returns Cb Locrian", () => {
  expect(generateScale({ root: 11, mode: 6 })).toStrictEqual([
    11, 0, 2, 4, 5, 7, 9,
  ]);
});

test("C Major scale gets mapped to correct notes", () => {
  expect(
    pitchToNote({ scale: [0, 2, 4, 5, 7, 9, 11], degree: "natural" })
  ).toStrictEqual(["C", "D", "E", "F", "G", "A", "B"]);
});

test("Cb Major scale gets mapped to correct notes", () => {
  expect(
    pitchToNote({ scale: [11, 1, 3, 4, 6, 8, 10], degree: "flat" })
  ).toStrictEqual(["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"]);
});

test("C# Major scale gets mapped to correct notes", () => {
  expect(
    pitchToNote({ scale: [1, 3, 5, 6, 8, 10, 0], degree: "sharp" })
  ).toStrictEqual(["C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯"]);
});

test("Pitch 12 will be normalized to 0", () => {
  expect(normalizePitch(12)).toStrictEqual(0);
});

test("Pitch -1 will be normalized to 11", () => {
  expect(normalizePitch(-1)).toStrictEqual(11);
});
