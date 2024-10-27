function approximateCurveThroughPoints(points) {
    var degree = 3;
    var n = points.length - 1;
    var knots = [];
    var controlPoints = [];
    for (var i = 0; i <= degree; i++) {
        knots.push(0);
    }
    for (var i = 1; i <= n - degree; i++) {
        knots.push(i / (n - degree + 1));
    }
    for (var i = 0; i <= degree; i++) {
        knots.push(1);
    }
    for (var i = 0; i <= n; i++) {
        controlPoints.push([
            points[i].x,
            points[i].y,
            points[i].z
        ]);
    }
    return createNurbsCurve(controlPoints, degree, knots);
}