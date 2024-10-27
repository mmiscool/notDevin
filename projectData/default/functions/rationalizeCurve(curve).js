function rationalizeCurve(curve) {
    var rationalControlPoints = curve.controlPoints.map(function (point) {
        return convertToHomogeneousCoord(point, point.weight || 1);
    });
    return createNurbsCurve(rationalControlPoints, curve.degree, curve.knots);
}