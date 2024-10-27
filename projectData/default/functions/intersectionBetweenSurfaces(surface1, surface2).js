function intersectionBetweenSurfaces(surface1, surface2) {
    var intersectData = findSurfaceIntersection(surface1, surface2);
    var intersectionCurves = createIntersectionCurves(intersectData);
    return intersectionCurves;
}