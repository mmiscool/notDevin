function findSurfaceIntersections(surface1, surface2) {
    var intersections = [];
    var uSteps = 10;
    var vSteps = 10;
    for (var i = 0; i <= uSteps; i++) {
        for (var j = 0; j <= vSteps; j++) {
            var u1 = i / uSteps;
            var v1 = j / vSteps;
            var pointOnSurface1 = evaluateSurfaceAtParam(surface1, u1, v1);
            var u2 = i / uSteps;
            var v2 = j / vSteps;
            var pointOnSurface2 = evaluateSurfaceAtParam(surface2, u2, v2);
            var intersection = newtonRaphsonSurfaceIntersect(surface1, surface2, u1, v1, u2, v2);
            if (intersection) {
                intersections.push(intersection);
            }
        }
    }
    return intersections;
}