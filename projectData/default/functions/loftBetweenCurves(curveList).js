function loftBetweenCurves(curveList) {
    var alignedCurves = [];
    for (var i = 0; i < curveList.length - 1; i++) {
        var alignedCurve = alignCurveDirections(curveList[i], curveList[i + 1]);
        alignedCurves.push(alignedCurve);
    }
    alignedCurves.push(curveList[curveList.length - 1]);
    var controlGrids = alignedCurves.map(function (curve) {
        return curve.controlPoints;
    });
    var degreeU = alignedCurves[0].degree;
    var degreeV = alignedCurves.length - 1;
    var knotsU = alignedCurves[0].knots;
    var knotsV = [];
    for (var j = 0; j <= degreeV + alignedCurves.length; j++) {
        knotsV.push(j);
    }
    return createNurbsSurface(controlGrids, degreeU, degreeV, knotsU, knotsV);
}