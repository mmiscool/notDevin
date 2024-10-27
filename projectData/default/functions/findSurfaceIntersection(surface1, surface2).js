function findSurfaceIntersection(surface1, surface2) {
    var resolution = 100;
    var intersections = [];
    for (var u = 0; u <= 1; u += 1 / resolution) {
        for (var v = 0; v <= 1; v += 1 / resolution) {
            var point1 = evaluateNurbsSurface(surface1, u, v);
            for (var u2 = 0; u2 <= 1; u2 += 1 / resolution) {
                for (var v2 = 0; v2 <= 1; v2 += 1 / resolution) {
                    var point2 = evaluateNurbsSurface(surface2, u2, v2);
                    if (Math.abs(point1.x - point2.x) < 0.01 && Math.abs(point1.y - point2.y) < 0.01 && Math.abs(point1.z - point2.z) < 0.01) {
                        intersections.push(point1);
                    }
                }
            }
        }
    }
    return intersections;
}