function calculatePoint(controlPoints, basisFunctions) {
    var result = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < controlPoints.length; i++) {
        var weight = basisFunctions[i];
        result.x += controlPoints[i].x * weight;
        result.y += controlPoints[i].y * weight;
        result.z += controlPoints[i].z * weight;
    }
    return result;
}