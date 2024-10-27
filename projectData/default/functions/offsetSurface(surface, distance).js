function offsetSurface(surface, distance) {
    var controlPoints = surface.controlPoints;
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var numControlPointsU = controlPoints.length;
    var numControlPointsV = controlPoints[0].length;
    var offsetControlPoints = new Array(numControlPointsU);
    for (var i = 0; i < numControlPointsU; i++) {
        offsetControlPoints[i] = new Array(numControlPointsV);
        for (var j = 0; j < numControlPointsV; j++) {
            var parameterU = knotsU[i + degreeU];
            var parameterV = knotsV[j + degreeV];
            var normal = computeSurfaceNormals({
                controlPoints: controlPoints,
                degreeU: degreeU,
                degreeV: degreeV,
                knotsU: knotsU,
                knotsV: knotsV
            }, parameterU, parameterV);
            offsetControlPoints[i][j] = {
                x: controlPoints[i][j].x + normal.x * distance,
                y: controlPoints[i][j].y + normal.y * distance,
                z: controlPoints[i][j].z + normal.z * distance
            };
        }
    }
    return createNurbsSurface(offsetControlPoints, degreeU, degreeV, knotsU, knotsV);
}