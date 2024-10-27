function createIntersectionCurves(intersectData) {
    var intersectCurves = [];
    for (var i = 0; i < intersectData.length; i++) {
        var surface1 = intersectData[i][0];
        var surface2 = intersectData[i][1];
        var intersectionResult = findSurfaceIntersection(surface1, surface2);
        for (var j = 0; j < intersectionResult.length; j++) {
            var curvePoints = intersectionResult[j];
            var controlPoints = [];
            for (var k = 0; k < curvePoints.length; k++) {
                controlPoints.push(curvePoints[k]);
            }
            var degree = 3;
            var knots = [];
            for (var m = 0; m < controlPoints.length + degree + 1; m++) {
                knots.push(m);
            }
            var curve = createNurbsCurve(controlPoints, degree, knots);
            intersectCurves.push(curve);
        }
    }
    return intersectCurves;
}