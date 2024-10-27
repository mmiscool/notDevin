function boolSubtract(body1, body2) {
    var intersectionSurface = findSurfaceIntersection(body1, body2);
    var splitBody1 = splitBody(body1, intersectionSurface);
    return splitBody1.filter(function (part) {
        return !boolIntersect(part, body2);
    });
}