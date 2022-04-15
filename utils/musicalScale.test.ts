import { generateScale, normalizePitch } from "./musicalScales";

test("Scale of root 0 and mode 0 and Natural notes returns C Ionian/Major", () => {
  expect(generateScale({ root: 0, mode: 0, notes: "natural" })).toStrictEqual([
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ]);
});

test("Scale of root 11 and mode 0 and Flat notes returns Cb Ionian/Major", () => {
  expect(generateScale({ root: 11, mode: 0, notes: "flat" })).toStrictEqual([
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
    "A♭",
    "B♭",
  ]);
});

test("Scale of root 11 and mode 1 and Flat notes returns Cb Dorian", () => {
  expect(generateScale({ root: 11, mode: 1, notes: "flat" })).toStrictEqual([
    "C♭",
    "D♭",
    "D",
    "F♭",
    "G♭",
    "A♭",
    "A",
  ]);
});

test("Scale of root 11 and mode 6 and Flat notes returns Cb Locrian", () => {
  expect(generateScale({ root: 11, mode: 6, notes: "flat" })).toStrictEqual([
    "C♭",
    "C",
    "D",
    "F♭",
    "F",
    "G",
    "A",
  ]);
});

test("Pitch 12 will be normalized to 0", () => {
  expect(normalizePitch(12)).toStrictEqual(0);
});

test("Pitch -1 will be normalized to 11", () => {
  expect(normalizePitch(-1)).toStrictEqual(11);
});
