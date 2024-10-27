function loftNurbsSurfaces(sectionCurves) {
    var matchedCurves = [];
    for (var i = 1; i < sectionCurves.length; i++) {
        var matched = matchCurveKnotVectors(sectionCurves[i - 1], sectionCurves[i]);
        matchedCurves.push(matched[0]);
        if (i === sectionCurves.length - 1) {
            matchedCurves.push(matched[1]);
        }
    }
    var surfaces = [];
    for (var j = 0; j < matchedCurves.length - 1; j++) {
        var interpolatedControlPoints = [];
        for (var k = 0; k <= 1; k += 0.01) {
            var curvePoints = [];
            for (var l = 0; l < matchedCurves.length; l++) {
                var point = evaluateNurbsCurve(matchedCurves[l], k);
                curvePoints.push(point);
            }
            interpolatedControlPoints.push(curvePoints);
        }
        var surface = createNurbsSurface(interpolatedControlPoints, matchedCurves[0].degree, matchedCurves[0].degree, matchedCurves[0].knots, matchedCurves[0].knots);
        surfaces.push(surface);
    }
    return surfaces;
}