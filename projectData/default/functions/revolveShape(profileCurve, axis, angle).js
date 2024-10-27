function revolveShape(profileCurve, axis, angle) {
    var steps = 36;
    var angleStep = angle / steps;
    var controlGrid = [];
    var profilePoints = [];
    for (var i = 0; i <= steps; i++) {
        var theta = i * angleStep;
        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);
        var rotatedCurve = profileCurve.map(function (point) {
            var xRot, yRot, zRot;
            if (axis === 'x') {
                xRot = point.x;
                yRot = point.y * cosTheta - point.z * sinTheta;
                zRot = point.y * sinTheta + point.z * cosTheta;
            } else if (axis === 'y') {
                xRot = point.x * cosTheta + point.z * sinTheta;
                yRot = point.y;
                zRot = -point.x * sinTheta + point.z * cosTheta;
            } else if (axis === 'z') {
                xRot = point.x * cosTheta - point.y * sinTheta;
                yRot = point.x * sinTheta + point.y * cosTheta;
                zRot = point.z;
            }
            return {
                x: xRot,
                y: yRot,
                z: zRot
            };
        });
        profilePoints.push(rotatedCurve);
    }
    for (var j = 0; j < profilePoints[0].length; j++) {
        var row = [];
        for (var k = 0; k < profilePoints.length; k++) {
            row.push(profilePoints[k][j]);
        }
        controlGrid.push(row);
    }
    var degreeU = 3;
    var degreeV = 1;
    var knotsU = [];
    for (var l = 0; l < profileCurve.length + degreeU + 1; l++) {
        knotsU.push(l);
    }
    var knotsV = [
        0,
        0,
        1,
        1
    ];
    return createNurbsSurface(controlGrid, degreeU, degreeV, knotsU, knotsV);
}