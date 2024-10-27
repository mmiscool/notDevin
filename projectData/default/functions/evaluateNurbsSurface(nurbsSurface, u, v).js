function evaluateNurbsSurface(nurbsSurface, u, v) {
    return deBoorSurfaceAlgorithm(nurbsSurface.controlPoints, nurbsSurface.degreeU, nurbsSurface.degreeV, nurbsSurface.knotsU, nurbsSurface.knotsV, u, v);
}