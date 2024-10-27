function applyFillet(surface1, surface2, radius) {
    var offsetSurface1 = offsetSurface(surface1, -radius);
    var offsetSurface2 = offsetSurface(surface2, -radius);
    var intersectionCurve = intersectSurfaces(offsetSurface1, offsetSurface2);
    var blendCurve = approximateCurveThroughPoints(intersectionCurve);
    var filletSurface = loftNurbsSurfaces([
        blendCurve,
        intersectionCurve
    ]);
    return filletSurface;
}