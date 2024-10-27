function scaleCurve(lineP0, lineP1, segmentP0, segmentP1) {
    var segmentLengthSquared = Math.pow(segmentP1.x - segmentP0.x, 2) + Math.pow(segmentP1.y - segmentP0.y, 2) + Math.pow(segmentP1.z - segmentP0.z, 2);
    if (segmentLengthSquared <= 1e-8) {
        return segmentP0;
    }
    var segmentDirection = {
        x: (segmentP1.x - segmentP0.x) / segmentLengthSquared,
        y: (segmentP1.y - segmentP0.y) / segmentLengthSquared,
        z: (segmentP1.z - segmentP0.z) / segmentLengthSquared
    };
    var lineDirection = {
        x: lineP1.x - lineP0.x,
        y: lineP1.y - lineP0.y,
        z: lineP1.z - lineP0.z
    };
    var lDirDotSDir = lineDirection.x * segmentDirection.x + lineDirection.y * segmentDirection.y + lineDirection.z * segmentDirection.z;
    var lP0DotSdir = lineP0.x * segmentDirection.x + lineP0.y * segmentDirection.y + lineP0.z * segmentDirection.z;
    var sP0DotSdir = segmentP0.x * segmentDirection.x + segmentP0.y * segmentDirection.y + segmentP0.z * segmentDirection.z;
    var t = lP0DotSdir - sP0DotSdir + lDirDotSDir * (sP0DotSdir - lP0DotSdir) / segmentLengthSquared;
    t = Math.max(0, Math.min(1, t));
    return {
        x: segmentP0.x + (segmentP1.x - segmentP0.x) * t,
        y: segmentP0.y + (segmentP1.y - segmentP0.y) * t,
        z: segmentP0.z + (segmentP1.z - segmentP0.z) * t
    };
}