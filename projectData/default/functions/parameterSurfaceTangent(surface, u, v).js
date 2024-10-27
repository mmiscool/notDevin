function parameterSurfaceTangent(surface, u, v) {
    var uDegree = surface.degreeU;
    var vDegree = surface.degreeV;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var controlPoints = surface.controlPoints;
    var duBasisFunctions = [];
    var dvBasisFunctions = [];
    for (var i = 0; i <= uDegree; i++) {
        duBasisFunctions.push(basisFunction(uDegree - 1, knotsU, u));
    }
    for (var i = 0; i <= vDegree; i++) {
        dvBasisFunctions.push(basisFunction(vDegree - 1, knotsV, v));
    }
    var duComponents = [];
    var dvComponents = [];
    for (var i = 0; i <= vDegree; i++) {
        var tempControlPoints = [];
        for (var j = 0; j < controlPoints[i].length - 1; j++) {
            var cp1 = controlPoints[i][j];
            var cp2 = controlPoints[i][j + 1];
            tempControlPoints.push({
                x: cp2.x - cp1.x,
                y: cp2.y - cp1.y,
                z: cp2.z - cp1.z
            });
        }
        duComponents.push(calculatePoint(tempControlPoints, duBasisFunctions));
    }
    for (var i = 0; i <= uDegree; i++) {
        var tempControlPoints = [];
        for (var j = 0; j < controlPoints.length - 1; j++) {
            var cp1 = controlPoints[j][i];
            var cp2 = controlPoints[j + 1][i];
            tempControlPoints.push({
                x: cp2.x - cp1.x,
                y: cp2.y - cp1.y,
                z: cp2.z - cp1.z
            });
        }
        dvComponents.push(calculatePoint(tempControlPoints, dvBasisFunctions));
    }
    var du = calculatePoint(duComponents, dvBasisFunctions);
    var dv = calculatePoint(dvComponents, duBasisFunctions);
    return {
        du: du,
        dv: dv
    };
}