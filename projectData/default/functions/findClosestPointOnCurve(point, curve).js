function findClosestPointOnCurve(point, curve) {
    var divisions = 100;
    var tMin = 0;
    var tMax = 1;
    var closestPoint = null;
    var closestDistance = Infinity;
    for (var i = 0; i <= divisions; i++) {
        var t = tMin + (tMax - tMin) * i / divisions;
        var curvePoint = evaluateNurbsCurve(curve, t);
        var distance = Math.sqrt(Math.pow(curvePoint.x - point.x, 2) + Math.pow(curvePoint.y - point.y, 2) + Math.pow(curvePoint.z - point.z, 2));
        if (distance < closestDistance) {
            closestDistance = distance;
            closestPoint = curvePoint;
        }
    }
    return closestPoint;
}