function cloneMatrix(matrix) {
    var result = [];
    for (var i = 0; i < matrix.length; i++) {
        result[i] = [];
        for (var j = 0; j < matrix[0].length; j++) {
            result[i][j] = matrix[i][j];
        }
    }
    return {x: result, y: result, z: result};
}