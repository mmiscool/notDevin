function subdivideCurve(curve, numDivisions) {
    var segments = [];
    var step = 1 / numDivisions;
    for (var i = 0; i < numDivisions; i++) {
        var parameter = i * step;
        var segment = divideCurve(curve, parameter);
        segments.push(segment);
    }
    return segments;
}