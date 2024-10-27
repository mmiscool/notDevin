function deBoorAlgorithm(controlPoints, degree, knots, t) {
    function deBoorRecursive(k, i, degree, controlPoints, knots, t) {
        if (k === 0) {
            return controlPoints[i];
        }
        var alpha = (t - knots[i]) / (knots[i + degree - k + 1] - knots[i]);
        var point1 = deBoorRecursive(k - 1, i - 1, degree, controlPoints, knots, t);
        var point2 = deBoorRecursive(k - 1, i, degree, controlPoints, knots, t);
        return {
            x: (1 - alpha) * point1.x + alpha * point2.x,
            y: (1 - alpha) * point1.y + alpha * point2.y,
            z: (1 - alpha) * point1.z + alpha * point2.z
        };
    }
    var n = controlPoints.length - 1;
    var m = knots.length - 1;
    var k = degree;
    if (t < knots[degree] || t > knots[m - degree])
        return null;
    for (var i = degree; i <= n; i++) {
        if (t >= knots[i] && t < knots[i + 1]) {
            return deBoorRecursive(degree, i, degree, controlPoints, knots, t);
        }
    }
    return null;
}