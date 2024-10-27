function intersectCurveWithSurface(curve, surface) {
    var intersections = [];
    for (var u = 0; u <= 1; u += 0.01) {
        var pointOnCurve = evaluateCurveAtParam(curve, u);
        for (var v = 0; v <= 1; v += 0.01) {
            for (var w = 0; w <= 1; w += 0.01) {
                var pointOnSurface = evaluateSurfaceAtParam(surface, v, w);
                var distance = Math.sqrt(Math.pow(pointOnCurve.x - pointOnSurface.x, 2) + Math.pow(pointOnCurve.y - pointOnSurface.y, 2) + Math.pow(pointOnCurve.z - pointOnSurface.z, 2));
                if (distance < 0.001) {
                    var refinedIntersection = newtonRaphsonCurveSurfaceIntersect(curve, surface, u, v, w);
                    intersections.push(refinedIntersection);
                }
            }
        }
    }
    return intersections;
}