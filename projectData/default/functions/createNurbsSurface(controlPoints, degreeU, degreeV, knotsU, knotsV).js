function createNurbsSurface(controlPoints, degreeU, degreeV, knotsU, knotsV) {
    return {
        controlPoints: controlPoints,
        degreeU: degreeU,
        degreeV: degreeV,
        knotsU: knotsU,
        knotsV: knotsV,
        evaluate: function (u, v) {
            return deBoorSurfaceAlgorithm(this.controlPoints, this.degreeU, this.degreeV, this.knotsU, this.knotsV, u, v);
        }
    };
}