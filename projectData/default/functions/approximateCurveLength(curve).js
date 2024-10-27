function approximateCurveLength(curve) {
    var numSegments = 100;
    var length = 0;
    for (var i = 0; i < numSegments; i++) {
        var t1 = i / numSegments;
        var t2 = (i + 1) / numSegments;
        var p1 = evaluateNurbsCurve(curve, t1);
        var p2 = evaluateNurbsCurve(curve, t2);
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        var dz = p2.z - p1.z;
        length += Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    return length;
}