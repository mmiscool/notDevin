function projectPointOntoCurve(point, curve) {
    var epsilon = 0.000001;
    var step = 0.01;
    var minDistance = Infinity;
    var nearestPoint = null;
    var t = 0;
    while (t <= 1) {
        var curvePoint = evaluateNurbsCurve(curve, t);
        var distance = Math.sqrt(Math.pow(curvePoint.x - point.x, 2) + Math.pow(curvePoint.y - point.y, 2) + Math.pow(curvePoint.z - point.z, 2));
        if (distance < minDistance) {
            minDistance = distance;
            nearestPoint = curvePoint;
        }
        t += step;
        if (minDistance < epsilon)
            break;
    }
    return nearestPoint;
}