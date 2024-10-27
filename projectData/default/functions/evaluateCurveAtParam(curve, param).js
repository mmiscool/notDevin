function evaluateCurveAtParam(curve, param) {
    var point = {
        x: 0,
        y: 0,
        z: 0
    };
    var basisSum = 0;
    for (var i = 0; i < curve.controlPoints.length; i++) {
        var weight = curve.weights ? curve.weights[i] : 1;
        var basis = basisFunc(curve.degree, curve.knots, i, param);
        basisSum += basis * weight;
        var interpolated = linearInterpolate(curve.controlPoints[i], weight);
        point.x += interpolated.x * basis * weight;
        point.y += interpolated.y * basis * weight;
        point.z += interpolated.z * basis * weight;
    }
    if (basisSum !== 0) {
        point.x /= basisSum;
        point.y /= basisSum;
        point.z /= basisSum;
    }
    return point;
}