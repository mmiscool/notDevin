function chamferEdges(edge1, edge2, distance) {
    var intersection = findCurveIntersection(edge1, edge2);
    if (!intersection)
        return null;
    var edge1Length = Math.sqrt(Math.pow(edge1[1].x - edge1[0].x, 2) + Math.pow(edge1[1].y - edge1[0].y, 2) + Math.pow(edge1[1].z - edge1[0].z, 2));
    var edge2Length = Math.sqrt(Math.pow(edge2[1].x - edge2[0].x, 2) + Math.pow(edge2[1].y - edge2[0].y, 2) + Math.pow(edge2[1].z - edge2[0].z, 2));
    var edge1Division = divideCurve(edge1, distance / edge1Length);
    var edge2Division = divideCurve(edge2, distance / edge2Length);
    var chamferPoint1 = edge1Division[1];
    var chamferPoint2 = edge2Division[1];
    return [
        chamferPoint1,
        chamferPoint2
    ];
}