function reverseCurve(curve) {
    var reversedControlPoints = curve.controlPoints.slice().reverse();
    var reversedKnots = [];
    var maxKnot = curve.knots[curve.knots.length - 1];
    for (var i = 0; i < curve.knots.length; i++) {
        reversedKnots[i] = maxKnot - curve.knots[curve.knots.length - 1 - i];
    }
    return createNurbsCurve(reversedControlPoints, curve.degree, reversedKnots);
}