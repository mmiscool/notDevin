function knotInsertionCurve(curve, knot, times) {
    for (var i = 0; i < times; i++) {
        var newKnots = recalculateKnots(curve.knots, knot, 1);
        curve = insertKnot(curve, knot, 1);
        curve.knots = newKnots;
    }
    return curve;
}