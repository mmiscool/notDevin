function createRevolution(profileCurve, axisPoint, axisDirection, angle) {
    function rotatePoint(point, axisPoint, axisDirection, angle) {
        var rad = angle * (Math.PI / 180);
        var cosTheta = Math.cos(rad);
        var sinTheta = Math.sin(rad);
        var u = axisDirection.x;
        var v = axisDirection.y;
        var w = axisDirection.z;
        var x = point.x - axisPoint.x;
        var y = point.y - axisPoint.y;
        var z = point.z - axisPoint.z;
        var rotatedX = u * (u * x + v * y + w * z) * (1 - cosTheta) + x * cosTheta + (-w * y + v * z) * sinTheta + axisPoint.x;
        var rotatedY = v * (u * x + v * y + w * z) * (1 - cosTheta) + y * cosTheta + (w * x - u * z) * sinTheta + axisPoint.y;
        var rotatedZ = w * (u * x + v * y + w * z) * (1 - cosTheta) + z * cosTheta + (-v * x + u * y) * sinTheta + axisPoint.z;
        return {
            x: rotatedX,
            y: rotatedY,
            z: rotatedZ
        };
    }
    var rotatedProfiles = [];
    for (var i = 0; i <= 360; i += angle) {
        var rotatedProfile = profileCurve.map(function (point) {
            return rotatePoint(point, axisPoint, axisDirection, i);
        });
        rotatedProfiles.push(rotatedProfile);
    }
    return loftNurbsSurfaces(rotatedProfiles);
}