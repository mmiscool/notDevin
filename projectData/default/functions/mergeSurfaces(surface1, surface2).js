function mergeSurfaces(surface1, surface2) {
    var alignedSurfaces = alignSurfaceEdges(surface1, surface2);
    var mergedControlPoints = alignedSurfaces.controlGrid1.concat(alignedSurfaces.controlGrid2);
    var mergedDegreeU = Math.max(alignedSurfaces.degreeU1, alignedSurfaces.degreeU2);
    var mergedDegreeV = Math.max(alignedSurfaces.degreeV1, alignedSurfaces.degreeV2);
    var mergedKnotsU = alignedSurfaces.knotsU1.concat(alignedSurfaces.knotsU2);
    var mergedKnotsV = alignedSurfaces.knotsV1.concat(alignedSurfaces.knotsV2);
    return createNurbsSurface(mergedControlPoints, mergedDegreeU, mergedDegreeV, mergedKnotsU, mergedKnotsV);
}