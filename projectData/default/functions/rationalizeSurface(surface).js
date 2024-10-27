function rationalizeSurface(surface) {
    var controlGrid = surface.controlGrid;
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var rationalControlGrid = [];
    for (var i = 0; i < controlGrid.length; i++) {
        var row = [];
        for (var j = 0; j < controlGrid[i].length; j++) {
            var point = controlGrid[i][j];
            var weight = point.weight !== undefined ? point.weight : 1;
            row.push(convertToHomogeneousCoord(point, weight));
        }
        rationalControlGrid.push(row);
    }
    return createNurbsSurface(rationalControlGrid, degreeU, degreeV, knotsU, knotsV);
}