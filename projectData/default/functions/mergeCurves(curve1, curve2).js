function mergeCurves(curve1, curve2) {
    alignCurveDirections(curve1, curve2);
    var combinedControlPoints = curve1.controlPoints.concat(curve2.controlPoints);
    var combinedKnots = curve1.knots.concat(curve2.knots);
    var degree = Math.max(curve1.degree, curve2.degree);
    return createNurbsCurve(combinedControlPoints, degree, combinedKnots);
}