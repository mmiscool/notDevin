function reparametrizeSurface(surface) {
    var knotsU = recalculateKnots(surface.knotsU, surface.degreeU, surface.controlPoints.length);
    var knotsV = recalculateKnots(surface.knotsV, surface.degreeV, surface.controlPoints[0].length);
    surface.knotsU = knotsU;
    surface.knotsV = knotsV;
    return surface;
}