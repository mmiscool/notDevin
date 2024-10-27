function extrudeShape(baseCurve, direction, length) {
    var controlPoints = [];
    for (var i = 0; i <= 1; i++) {
        var t = i * length;
        var curvePoints = baseCurve.map(function (point) {
            return {
                x: point.x + direction.x * t,
                y: point.y + direction.y * t,
                z: point.z + direction.z * t
            };
        });
        controlPoints.push(curvePoints);
    }
    var degreeU = 1;
    var degreeV = baseCurve.length - 1;
    var knotsU = [
        0,
        0,
        1,
        1
    ];
    var knotsV = [];
    for (var k = 0; k <= degreeV + baseCurve.length; k++) {
        knotsV.push(k);
    }
    return createNurbsSurface(controlPoints, degreeU, degreeV, knotsU, knotsV);
}