function applyChamfer(surface1, surface2, distance) {
    var intersectionCurve = intersectSurfaces(surface1, surface2);
    var offsetSurface1 = offsetSurface(surface1, -distance);
    var offsetSurface2 = offsetSurface(surface2, -distance);
    var chamferCurve = findIntersection(offsetSurface1, offsetSurface2);
    var chamferSurface = loftNurbsSurfaces([
        intersectionCurve,
        chamferCurve
    ]);
    var resultSurface1 = booleanOperation(surface1, chamferSurface, 'subtract');
    var resultSurface2 = booleanOperation(surface2, chamferSurface, 'subtract');
    return booleanOperation(resultSurface1, resultSurface2, 'union');
}