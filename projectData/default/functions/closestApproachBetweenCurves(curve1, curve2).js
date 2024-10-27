function closestApproachBetweenCurves(curve1, curve2) {
    var minDist = Infinity;
    var closestPoints = {
        pointOnCurve1: null,
        pointOnCurve2: null
    };
    for (var t1 = 0; t1 <= 1; t1 += 0.01) {
        var p1 = evaluateNurbsCurve(curve1, t1);
        for (var t2 = 0; t2 <= 1; t2 += 0.01) {
            var p2 = evaluateNurbsCurve(curve2, t2);
            var dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
            if (dist < minDist) {
                minDist = dist;
                closestPoints.pointOnCurve1 = p1;
                closestPoints.pointOnCurve2 = p2;
            }
        }
    }
    return closestPoints;
}