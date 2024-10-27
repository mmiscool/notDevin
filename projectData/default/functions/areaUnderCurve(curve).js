function areaUnderCurve(curve) {
    var numSamples = 100;
    var totalArea = 0;
    var params = [];
    for (var i = 0; i <= numSamples; i++) {
        params.push(i / numSamples);
    }
    var points = evaluateNurbsCurveAtMultipleParams(curve, params);
    for (var j = 0; j < points.length - 1; j++) {
        var x1 = points[j].x;
        var x2 = points[j + 1].x;
        var y1 = points[j].y;
        var y2 = points[j + 1].y;
        totalArea += (x2 - x1) * (y1 + y2) / 2;
    }
    return Math.abs(totalArea);
}