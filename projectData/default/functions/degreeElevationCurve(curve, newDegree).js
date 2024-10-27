function degreeElevationCurve(curve, newDegree) {
    var oldDegree = curve.degree;
    if (newDegree <= oldDegree)
        return curve;
    var controlPoints = curve.controlPoints;
    var knots = curve.knots;
    var n = controlPoints.length - 1;
    var m = n + oldDegree + 1;
    var p = oldDegree;
    var ph = newDegree;
    var ph2 = ph + 1;
    var newKnots = knots.slice();
    for (var i = 0; i < ph - p; i++) {
        newKnots.push(knots[m]);
    }
    var newControlPoints = [];
    for (var i = 0; i <= n + ph - p + 1; i++) {
        newControlPoints.push({
            x: 0,
            y: 0,
            z: 0
        });
    }
    var bezalfs = [];
    for (var i = 0; i <= p; i++) {
        bezalfs[i] = [];
        for (var j = 0; j <= ph; j++) {
            bezalfs[i][j] = 0;
        }
    }
    for (var i = 0; i < ph - p; i++) {
        var cptsBEZ = [];
        for (var j = 0; j <= ph; j++) {
            cptsBEZ.push({
                x: 0,
                y: 0,
                z: 0
            });
        }
        var WBEZ = [];
        for (var k = 0; k <= p; k++) {
            bezalfs[k][k] = 1;
            for (var j = k + 1; j <= ph; j++) {
                bezalfs[k][j] = bezalfs[k][j - 1] * (newDegree - j + 1) / (j - k);
            }
        }
        for (var j = 0; j <= ph; j++) {
            cptsBEZ[j] = {
                x: 0,
                y: 0,
                z: 0
            };
            WBEZ[j] = 0;
            for (var k = 0; k <= p; k++) {
                cptsBEZ[j].x += bezalfs[k][j] * controlPoints[k].x;
                cptsBEZ[j].y += bezalfs[k][j] * controlPoints[k].y;
                cptsBEZ[j].z += bezalfs[k][j] * controlPoints[k].z;
                WBEZ[j] += bezalfs[k][j];
            }
            cptsBEZ[j].x /= WBEZ[j];
            cptsBEZ[j].y /= WBEZ[j];
            cptsBEZ[j].z /= WBEZ[j];
        }
        for (var j = 0; j <= ph; j++) {
            newControlPoints[i + j].x += cptsBEZ[j].x;
            newControlPoints[i + j].y += cptsBEZ[j].y;
            newControlPoints[i + j].z += cptsBEZ[j].z;
        }
    }
    for (var i = 0; i <= n + ph - p; i++) {
        newControlPoints[i].x /= ph - p + 1;
        newControlPoints[i].y /= ph - p + 1;
        newControlPoints[i].z /= ph - p + 1;
    }
    return createNurbsCurve(newControlPoints, newDegree, newKnots);
}