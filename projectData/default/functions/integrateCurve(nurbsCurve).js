function integrateCurve(nurbsCurve) {
    var totalLength = curveLength(nurbsCurve);
    var numSections = 100;
    var deltaT = 1 / numSections;
    var integral = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < numSections; i++) {
        var t1 = i * deltaT;
        var t2 = (i + 1) * deltaT;
        var point1 = evaluateNurbsCurve(nurbsCurve, t1);
        var point2 = evaluateNurbsCurve(nurbsCurve, t2);
        integral.x += (point1.x + point2.x) / 2 * deltaT * totalLength;
        integral.y += (point1.y + point2.y) / 2 * deltaT * totalLength;
        integral.z += (point1.z + point2.z) / 2 * deltaT * totalLength;
    }
    return integral;
}