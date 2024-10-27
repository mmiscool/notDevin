function offsetCurve(curve, distance) {
    var offsetPoints = [];
    for (var i = 0; i < curve.length - 1; i++) {
        var p1 = curve[i];
        var p2 = curve[i + 1];
        var normal = calculateNormal(p1, p2);
        var magnitude = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
        var unitNormal = {
            x: normal.x / magnitude,
            y: normal.y / magnitude,
            z: normal.z / magnitude
        };
        var offsetPoint1 = {
            x: p1.x + unitNormal.x * distance,
            y: p1.y + unitNormal.y * distance,
            z: p1.z + unitNormal.z * distance
        };
        offsetPoints.push(offsetPoint1);
    }
    var lastPoint = curve[curve.length - 1];
    var preLastNormal = calculateNormal(curve[curve.length - 2], lastPoint);
    var preLastMagnitude = Math.sqrt(preLastNormal.x * preLastNormal.x + preLastNormal.y * preLastNormal.y + preLastNormal.z * preLastNormal.z);
    var lastUnitNormal = {
        x: preLastNormal.x / preLastMagnitude,
        y: preLastNormal.y / preLastMagnitude,
        z: preLastNormal.z / preLastMagnitude
    };
    var lastOffsetPoint = {
        x: lastPoint.x + lastUnitNormal.x * distance,
        y: lastPoint.y + lastUnitNormal.y * distance,
        z: lastPoint.z + lastUnitNormal.z * distance
    };
    offsetPoints.push(lastOffsetPoint);
    return offsetPoints;
}