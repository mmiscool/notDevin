function boolIntersect(body1, body2) {
    var intersectData = findSurfaceIntersection(body1, body2);
    return createIntersectionCurves(intersectData);
}