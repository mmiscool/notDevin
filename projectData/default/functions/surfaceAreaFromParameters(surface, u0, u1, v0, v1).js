function surfaceAreaFromParameters(surface, u0, u1, v0, v1) {
    var subdividedSurface = subdivideSurface(surface, u1 - u0, v1 - v0);
    return approximateSurfaceArea(subdividedSurface);
}