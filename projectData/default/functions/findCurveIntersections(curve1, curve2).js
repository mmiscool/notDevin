function findCurveIntersections(curve1, curve2) {
    var intersections = [];
    for (var i = 0; i < 1; i += 0.01) {
        var point1 = evaluateCurveAtParam(curve1, i);
        var closest = null;
        var closestDist = Infinity;
        for (var j = 0; j < 1; j += 0.01) {
            var point2 = evaluateCurveAtParam(curve2, j);
            var dist = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) + Math.pow(point1.z - point2.z, 2));
            if (dist < closestDist) {
                closestDist = dist;
                closest = point2;
            }
        }
        if (closestDist < 0.001) {
            var intersection = newtonRaphsonIntersect(curve1, curve2, i, j);
            if (intersection) {
                intersections.push(intersection);
            }
        }
    }
    return intersections;
}