function refineKnotVector(curve, knots) {
    var degree = curve.degree;
    var originalKnots = curve.knots;
    var newKnots = [];
    var i = 0, j = 0;
    while (i < originalKnots.length || j < knots.length) {
        if (j >= knots.length || i < originalKnots.length && originalKnots[i] <= knots[j]) {
            newKnots.push(originalKnots[i]);
            i++;
        } else {
            newKnots.push(knots[j]);
            j++;
        }
    }
    var newControlPoints = [];
    var n = curve.controlPoints.length;
    var m = newKnots.length - 1;
    for (var k = 0; k <= m - degree - 1; k++) {
        if (k < degree) {
            newControlPoints.push(curve.controlPoints[k]);
        } else if (k >= n) {
            newControlPoints.push(curve.controlPoints[n - 1]);
        } else {
            var alpha = (newKnots[k + degree + 1] - originalKnots[k + 1]) / (originalKnots[k + degree + 1] - originalKnots[k + 1]);
            var point = {};
            point.x = alpha * curve.controlPoints[k].x + (1 - alpha) * curve.controlPoints[k - 1].x;
            point.y = alpha * curve.controlPoints[k].y + (1 - alpha) * curve.controlPoints[k - 1].y;
            point.z = alpha * curve.controlPoints[k].z + (1 - alpha) * curve.controlPoints[k - 1].z;
            newControlPoints.push(point);
        }
    }
    return {
        degree: degree,
        controlPoints: newControlPoints,
        knots: newKnots
    };
}