function boolUnion(body1, body2) {
    var intersection = findSurfaceIntersection(body1, body2);
    if (intersection) {
        var unionSurface1 = body1.filter(function (point) {
            return !intersection.includes(point);
        });
        var unionSurface2 = body2.filter(function (point) {
            return !intersection.includes(point);
        });
        return mergeSurfaces(unionSurface1, unionSurface2);
    }
    return mergeSurfaces(body1, body2);
}