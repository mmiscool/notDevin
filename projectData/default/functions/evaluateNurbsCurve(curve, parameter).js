function evaluateNurbsCurve(curve, parameter) {
    var degree = curve.degree;
    var knots = curve.knots;
    var controlPoints = curve.controlPoints;
    var basisFunctions = [];
    for (var i = 0; i < controlPoints.length; i++) {
        basisFunctions.push(basisFunction(degree, i, knots, parameter));
    }
    return calculatePoint(controlPoints, basisFunctions);
}