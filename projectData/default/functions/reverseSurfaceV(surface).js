function reverseSurfaceV(surface) {
    var controlGrid = surface.controlGrid;
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var numU = controlGrid.length;
    var numV = controlGrid[0].length;
    var newControlGrid = new Array(numU);
    for (var i = 0; i < numU; i++) {
        newControlGrid[i] = new Array(numV);
        for (var j = 0; j < numV; j++) {
            newControlGrid[i][j] = controlGrid[i][numV - 1 - j];
        }
    }
    var newKnotsV = knotsV.slice().reverse();
    return createNurbsSurface(newControlGrid, degreeU, degreeV, knotsU, newKnotsV);
}