function localInterpolateCurve(curve, point) {
    let closestParam = findClosestPointOnCurve(point, curve);
    let parameter = closestParam.parameter;
    let insertTimes = curve.degree;
    insertKnot(curve, parameter, insertTimes);
    let controlPoints = curve.controlPoints;
    let knots = curve.knots;
    let n = controlPoints.length - 1;
    let degree = curve.degree;
    for (let i = 0; i <= degree; i++) {
        let weight = basisFunction(degree, knots, parameter)(i);
        controlPoints[closestParam.index - degree + i].x += weight * (point.x - evaluateNurbsCurve(curve, parameter).x);
        controlPoints[closestParam.index - degree + i].y += weight * (point.y - evaluateNurbsCurve(curve, parameter).y);
        controlPoints[closestParam.index - degree + i].z += weight * (point.z - evaluateNurbsCurve(curve, parameter).z);
    }
    curve.controlPoints = controlPoints;
    return curve;
}