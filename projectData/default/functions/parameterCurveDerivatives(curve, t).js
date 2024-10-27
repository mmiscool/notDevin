function parameterCurveDerivatives(curve, t) {
    var degree = curve.degree;
    var knots = curve.knots;
    var controlPoints = curve.controlPoints;
    var numControlPoints = controlPoints.length;
    var basisFuncs = [];
    var basisDerivs = [];
    for (var i = 0; i <= degree; i++) {
        basisFuncs.push(basisFunction(degree, knots, t + i));
        basisDerivs.push((basisFunction(degree, knots, t + i + 1) - basisFunction(degree, knots, t + i - 1)) / (knots[i + degree + 1] - knots[i]));
    }
    var point = calculatePoint(controlPoints, basisFuncs);
    var derivative = calculatePoint(controlPoints, basisDerivs);
    return {
        point: point,
        derivative: derivative
    };
}