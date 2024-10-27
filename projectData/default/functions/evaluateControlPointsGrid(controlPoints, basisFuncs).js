function evaluateControlPointsGrid(controlPoints, basisFuncs) {
    var result = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < controlPoints.length; i++) {
        for (var j = 0; j < controlPoints[i].length; j++) {
            var cp = controlPoints[i][j];
            var weight = basisFuncs[i](cp.x, cp.y, cp.z);
            result.x += cp.x * weight;
            result.y += cp.y * weight;
            result.z += cp.z * weight;
        }
    }
    return result;
}