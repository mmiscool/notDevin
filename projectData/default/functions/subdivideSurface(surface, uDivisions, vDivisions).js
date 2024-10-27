function subdivideSurface(surface, uDivisions, vDivisions) {
    var controlGrid = [];
    var uSpan = 1 / uDivisions;
    var vSpan = 1 / vDivisions;
    for (var i = 0; i <= uDivisions; i++) {
        controlGrid[i] = [];
        for (var j = 0; j <= vDivisions; j++) {
            controlGrid[i][j] = evaluateNurbsSurface(surface, i * uSpan, j * vSpan);
        }
    }
    var surfaces = [];
    for (var i = 0; i < uDivisions; i++) {
        for (var j = 0; j < vDivisions; j++) {
            var subGrid = [
                [
                    controlGrid[i][j],
                    controlGrid[i][j + 1]
                ],
                [
                    controlGrid[i + 1][j],
                    controlGrid[i + 1][j + 1]
                ]
            ];
            surfaces.push(createNurbsSurface(subGrid, surface.degreeU, surface.degreeV, surface.knotsU, surface.knotsV));
        }
    }
    return surfaces;
}