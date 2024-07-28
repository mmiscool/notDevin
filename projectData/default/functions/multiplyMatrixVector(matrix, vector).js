function multiplyMatrixVector(matrix, vector) {
  let result = {x: 0, y: 0, z: 0};
  for (let i = 0; i < matrix.length; i++) {
    let sum = {x: 0, y: 0, z: 0};
    for (let j = 0; j < vector.y.length; j++) {
      if (j < vector.y.length - 1) {
        sum.x += matrix[i][j] * vector.y[j];
        sum.y += matrix[i][j + 1] * vector.y[j];
        sum.z += matrix[i][j + 2] * vector.y[j];
      } else {
        sum.x += matrix[i][j] * vector.y[j];
      }
    }
    result.x += sum.x;
    result.y += sum.y;
    result.z += sum.z;
  }
  return {x: result.x, y: result.y, z: result.z};
}