function findCurveIntersection(curve1, curve2) {
    function curveIntersectionFunction(t) {
        var point1 = evaluateNurbsCurve(curve1, t);
        var point2 = evaluateNurbsCurve(curve2, t);
        return (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2 + (point1.z - point2.z) ** 2;
    }
    var intersectionPoints = [];
    for (var t = 0; t <= 1; t += 0.01) {
        var result = solveEquation(curveIntersectionFunction, t);
        if (result >= 0 && result <= 1) {
            var intersectionPoint1 = evaluateNurbsCurve(curve1, result);
            var intersectionPoint2 = evaluateNurbsCurve(curve2, result);
            if (!intersectionPoints.some(function (p) {
                    return Math.abs(p.x - intersectionPoint1.x) < 0.000001 && Math.abs(p.y - intersectionPoint1.y) < 0.000001 && Math.abs(p.z - intersectionPoint1.z) < 0.000001;
                })) {
                intersectionPoints.push(intersectionPoint1);
            }
        }
    }
    return intersectionPoints;
}