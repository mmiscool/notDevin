function insertKnot(curve, knot, times) {
    var degree = curve.degree;
    var controlPoints = curve.controlPoints.slice();
    var knots = curve.knots.slice();
    for (var i = 0; i < times; i++) {
        knots = recalculateKnots(knots, knot, 1);
        var newControlPoints = [];
        var n = controlPoints.length - 1;
        for (var j = 0; j <= n + degree; j++) {
            if (j < degree || j > n) {
                newControlPoints[j] = controlPoints[j];
            } else {
                var alpha = (knot - knots[j]) / (knots[j + degree + 1] - knots[j]);
                var point1 = controlPoints[j - 1];
                var point2 = controlPoints[j];
                newControlPoints[j] = {
                    x: (1 - alpha) * point1.x + alpha * point2.x,
                    y: (1 - alpha) * point1.y + alpha * point2.y,
                    z: (1 - alpha) * point1.z + alpha * point2.z
                };
            }
        }
        controlPoints = newControlPoints;
    }
    return createNurbsCurve(controlPoints, degree, knots);
}