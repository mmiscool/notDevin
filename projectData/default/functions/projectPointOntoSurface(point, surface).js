function projectPointOntoSurface(point, surface) {
    var u = 0.5, v = 0.5;
    var closestDistance = Infinity;
    var iterations = 10;
    for (var i = 0; i < iterations; i++) {
        var projectedPoint = evaluateNurbsSurface(surface, u, v);
        var dx = point.x - projectedPoint.x;
        var dy = point.y - projectedPoint.y;
        var dz = point.z - projectedPoint.z;
        var distance = dx * dx + dy * dy + dz * dz;
        if (distance < closestDistance) {
            closestDistance = distance;
        } else {
            break;
        }
        var normal = computeSurfaceNormals(surface, u, v);
        var denom = normal.x * normal.x + normal.y * normal.y + normal.z * normal.z;
        if (denom === 0)
            break;
        var dotProduct = dx * normal.x + dy * normal.y + dz * normal.z;
        u -= dotProduct * normal.x / denom;
        v -= dotProduct * normal.y / denom;
        u = Math.max(0, Math.min(1, u));
        v = Math.max(0, Math.min(1, v));
    }
    return evaluateNurbsSurface(surface, u, v);
}