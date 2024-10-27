function findClosestPointOnSurface(point, surface) {
    var minDistance = Infinity;
    var closestPoint = null;
    for (var u = 0; u <= 1; u += 0.1) {
        for (var v = 0; v <= 1; v += 0.1) {
            var surfacePoint = evaluateNurbsSurface(surface, u, v);
            var distance = Math.sqrt(Math.pow(surfacePoint.x - point.x, 2) + Math.pow(surfacePoint.y - point.y, 2) + Math.pow(surfacePoint.z - point.z, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = surfacePoint;
            }
        }
    }
    return closestPoint;
}