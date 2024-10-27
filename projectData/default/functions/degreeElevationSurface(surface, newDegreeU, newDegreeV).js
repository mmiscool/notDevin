function degreeElevationSurface(surface, newDegreeU, newDegreeV) {
    var controlPointsU = surface.controlPoints.length;
    var controlPointsV = surface.controlPoints[0].length;
    var currentDegreeU = surface.degreeU;
    var currentDegreeV = surface.degreeV;
    var newControlGrid = [];
    if (newDegreeU > currentDegreeU) {
        var elevatedU = elevateDegreeInDirection(surface.controlPoints, surface.knotsU, currentDegreeU, newDegreeU, controlPointsU, true);
        controlPointsU = elevatedU.newControlPointsLength;
        surface.knotsU = elevatedU.newKnots;
        surface.controlPoints = elevatedU.elevatedControlPoints;
    }
    if (newDegreeV > currentDegreeV) {
        var transposedSurface = transposeSurface(surface.controlPoints);
        var elevatedV = elevateDegreeInDirection(transposedSurface, surface.knotsV, currentDegreeV, newDegreeV, controlPointsV, false);
        controlPointsV = elevatedV.newControlPointsLength;
        var transposedBackControlPoints = transposeSurface(elevatedV.elevatedControlPoints);
        surface.knotsV = elevatedV.newKnots;
        surface.controlPoints = transposedBackControlPoints;
    }
    for (var i = 0; i < controlPointsU; i++) {
        newControlGrid[i] = [];
        for (var j = 0; j < controlPointsV; j++) {
            newControlGrid[i][j] = surface.controlPoints[i][j];
        }
    }
    return createNurbsSurface(newControlGrid, newDegreeU, newDegreeV, surface.knotsU, surface.knotsV);
}
function elevateDegreeInDirection(controlPoints, knots, currentDegree, newDegree, controlPointsLength, elevateInU) {
    var elevatedControlPoints = [];
    var newKnots = [];
    var n = controlPointsLength - 1;
    var pd = newDegree - currentDegree;
    for (var r = 0; r <= n; r++) {
        elevatedControlPoints[r] = elevateInU ? controlPoints[r].slice() : controlPoints[r];
    }
    for (var i = 0; i <= n + pd; i++) {
        var alpha = basisFunction(currentDegree + pd, knots, knots[i + currentDegree + 1]);
        for (var j = Math.max(0, i - pd); j <= Math.min(n, i); j++) {
            var alphaMulControlPoint = multiplyPointByScalar(elevatedControlPoints[j], alpha);
            if (i < elevatedControlPoints.length) {
                elevatedControlPoints[i] = addPoints(elevatedControlPoints[i], alphaMulControlPoint);
            } else {
                elevatedControlPoints.push(alphaMulControlPoint);
            }
        }
    }
    for (var i = 0; i < knots.length; i++) {
        newKnots[i] = knots[i];
    }
    for (var i = knots.length; i < newKnots.length; i++) {
        newKnots[i] = knots[knots.length - 1];
    }
    return {
        elevatedControlPoints: elevatedControlPoints,
        newKnots: newKnots,
        newControlPointsLength: n + pd + 1
    };
}
function multiplyPointByScalar(point, scalar) {
    return {
        x: point.x * scalar,
        y: point.y * scalar,
        z: point.z * scalar
    };
}
function addPoints(point1, point2) {
    return {
        x: point1.x + point2.x,
        y: point1.y + point2.y,
        z: point1.z + point2.z
    };
}
function transposeSurface(surface) {
    var transposed = [];
    for (var i = 0; i < surface[0].length; i++) {
        transposed[i] = [];
        for (var j = 0; j < surface.length; j++) {
            transposed[i][j] = surface[j][i];
        }
    }
    return transposed;
}