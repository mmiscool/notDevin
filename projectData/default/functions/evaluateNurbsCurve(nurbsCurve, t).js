function evaluateNurbsCurve(nurbsCurve, t) {
    return deBoorAlgorithm(nurbsCurve.controlPoints, nurbsCurve.degree, nurbsCurve.knots, t);
}