function reverseSurfaceU(surface) {
    var controlGrid = surface.controlPoints;
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var knotsU = surface.knotsU.slice();
    var knotsV = surface.knotsV;
    controlGrid = controlGrid.map(row => row.reverse());
    knotsU = knotsU.reverse();
    return createNurbsSurface(controlGrid, degreeU, degreeV, knotsU, knotsV);
}