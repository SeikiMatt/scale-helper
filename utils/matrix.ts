export function areMatricesOfEqualSize(
  matrix: any[][],
  matrixToCompare: any[][]
) {
  const areRowsEqual = matrix.length === matrixToCompare.length;
  const areColsEqual = matrix.every(
    (_, key) => matrix[key].length === matrixToCompare[key].length
  );

  return areColsEqual === areRowsEqual;
}

export function compareMatrices(matrix: any[][], matrixToCompare: any[][]) {
  if (!areMatricesOfEqualSize(matrix, matrixToCompare)) return null;

  let totalItems = 0;
  let totalMatches = 0;
  let differences: number[][] = [];

  matrix.forEach((row, x) => {
    row.forEach((_, y) => {
      totalItems++;
      if (matrix[x][y] === matrixToCompare[x][y]) totalMatches++;
      else differences.push([x, y]);
    });
  });

  return { similarity: totalMatches / totalItems, differences };
}
