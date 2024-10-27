function splitBody(body, splitSurface) {
    var intersectionCurves = findSurfaceIntersection(body, splitSurface);
    var splitBodies = [];
    for (var i = 0; i < intersectionCurves.length; i++) {
        var splitCurve = intersectionCurves[i];
        var alignedSurfaceEdges = alignSurfaceEdges(splitCurve, splitSurface);
        var newSurface = createNurbsSurface(alignedSurfaceEdges.controlGrid, alignedSurfaceEdges.degreeU, alignedSurfaceEdges.degreeV, alignedSurfaceEdges.knotsU, alignedSurfaceEdges.knotsV);
        var splitParts = divideSurface(body, newSurface);
        splitBodies.push(splitParts.part1, splitParts.part2);
    }
    return splitBodies;
}