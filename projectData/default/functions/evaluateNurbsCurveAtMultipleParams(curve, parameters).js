function evaluateNurbsCurveAtMultipleParams(curve, parameters) {
    var results = [];
    for (var i = 0; i < parameters.length; i++) {
        var point = evaluateNurbsCurve(curve, parameters[i]);
        results.push(point);
    }
    return results;
}