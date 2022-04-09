import { areMatricesOfEqualSize, compareMatrices } from "./matrix";

test("Matrices are of equal size", () => {
  const matrix = [[], [], [], [], []];
  const matrixToCompare = [[], [], [], [], []];
  expect(areMatricesOfEqualSize(matrix, matrixToCompare)).toBe(true);
});

test("Matrices are NOT of equal size", () => {
  const matrix = [[], [], [], []];
  const matrixToCompare = [[], [], [], [], []];
  expect(areMatricesOfEqualSize(matrix, matrixToCompare)).toBe(false);
});

test("Compared matrices are 100% equal", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
  ];
  const matrixToCompare = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
  ];
  expect(compareMatrices(matrix, matrixToCompare)).toStrictEqual({
    similarity: 1,
    differences: [],
  });
});

test("Compared matrices are 60% equal", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
  ];
  const matrixToCompare = [
    [100, 200, 300],
    [400, 500, 600],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
  ];
  expect(compareMatrices(matrix, matrixToCompare)).toStrictEqual({
    similarity: 0.6,
    differences: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  });
});
