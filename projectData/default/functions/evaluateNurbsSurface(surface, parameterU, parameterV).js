function evaluateNurbsSurface(surface, parameterU, parameterV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var controlPoints = surface.controlPoints;
    var numCtrlPtsU = controlPoints.length;
    var numCtrlPtsV = controlPoints[0].length;
    var basisFuncsU = [];
    var basisFuncsV = [];
    for (var i = 0; i < numCtrlPtsU; i++) {
        basisFuncsU.push(basisFunction(degreeU, knotsU, i, parameterU));
    }
    for (var j = 0; j < numCtrlPtsV; j++) {
        basisFuncsV.push(basisFunction(degreeV, knotsV, j, parameterV));
    }
    var sum = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < numCtrlPtsU; i++) {
        for (var j = 0; j < numCtrlPtsV; j++) {
            var point = controlPoints[i][j];
            var weight = basisFuncsU[i] * basisFuncsV[j];
            var tempPoint = calculatePoint(point, weight);
            sum.x += tempPoint.x;
            sum.y += tempPoint.y;
            sum.z += tempPoint.z;
        }
    }
    return sum;
}