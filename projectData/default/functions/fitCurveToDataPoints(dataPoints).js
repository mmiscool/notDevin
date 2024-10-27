function fitCurveToDataPoints(dataPoints) {
    var degree = Math.min(dataPoints.length - 1, 3);
    var knots = [];
    for (var i = 0; i <= degree; i++) {
        knots.push(0);
    }
    var increment = 1 / (dataPoints.length - degree);
    for (var j = 1; j < dataPoints.length - degree; j++) {
        knots.push(j * increment);
    }
    for (var k = 0; k <= degree; k++) {
        knots.push(1);
    }
    return createNurbsCurve(dataPoints, degree, knots);
}