function closestPointOnCurve(point, curve) {
    var minDistance = Infinity;
    var closestPoint = null;
    var divisions = 100;
    for (var i = 0; i <= divisions; i++) {
        var t = i / divisions;
        var curvePoint = evaluateNurbsCurve(curve, t);
        var distance = Math.sqrt(Math.pow(point.x - curvePoint.x, 2) + Math.pow(point.y - curvePoint.y, 2) + Math.pow(point.z - curvePoint.z, 2));
        if (distance < minDistance) {
            minDistance = distance;
            closestPoint = curvePoint;
        }
    }
    return closestPoint;
}