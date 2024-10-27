function calculateCurveBoundingBox(curve) {
    var numSamples = 100;
    var parameters = [];
    for (var i = 0; i <= numSamples; i++) {
        parameters.push(i / numSamples);
    }
    var evaluatedPoints = evaluateNurbsCurveAtMultipleParams(curve, parameters);
    var minX = Infinity, minY = Infinity, minZ = Infinity;
    var maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (var i = 0; i < evaluatedPoints.length; i++) {
        var point = evaluatedPoints[i];
        if (point.x < minX)
            minX = point.x;
        if (point.y < minY)
            minY = point.y;
        if (point.z < minZ)
            minZ = point.z;
        if (point.x > maxX)
            maxX = point.x;
        if (point.y > maxY)
            maxY = point.y;
        if (point.z > maxZ)
            maxZ = point.z;
    }
    return {
        min: {
            x: minX,
            y: minY,
            z: minZ
        },
        max: {
            x: maxX,
            y: maxY,
            z: maxZ
        }
    };
}