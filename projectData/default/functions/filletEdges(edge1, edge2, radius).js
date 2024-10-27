function filletEdges(edge1, edge2, radius) {
    var offset1 = offsetCurve(edge1, radius);
    var offset2 = offsetCurve(edge2, radius);
    var intersectionPoint = findCurveIntersection(offset1, offset2);
    function alignCurveDirections(curve1, referenceCurve) {
        var direction1 = {
            x: curve1[1].x - curve1[0].x,
            y: curve1[1].y - curve1[0].y,
            z: curve1[1].z - curve1[0].z
        };
        var direction2 = {
            x: referenceCurve[1].x - referenceCurve[0].x,
            y: referenceCurve[1].y - referenceCurve[0].y,
            z: referenceCurve[1].z - referenceCurve[0].z
        };
        if (direction1.x * direction2.x + direction1.y * direction2.y + direction1.z * direction2.z < 0) {
            return curve1.reverse();
        }
        return curve1;
    }
    var alignedEdge1 = alignCurveDirections(edge1, offsetCurve(edge1, -radius));
    var alignedEdge2 = alignCurveDirections(edge2, offsetCurve(edge2, -radius));
    var controlPoints = [
        edge1[0],
        alignedEdge1[0],
        intersectionPoint,
        alignedEdge2[alignedEdge2.length - 1],
        edge2[edge2.length - 1]
    ];
    var knots = [
        0,
        0,
        0,
        1,
        1,
        1
    ];
    var degree = 2;
    function createNurbsCurve(controlPoints, degree, knots) {
        return {
            controlPoints: controlPoints,
            degree: degree,
            knots: knots
        };
    }
    var filletCurve = createNurbsCurve(controlPoints, degree, knots);
    return filletCurve;
}