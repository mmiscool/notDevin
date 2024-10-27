function chamferEdges(arrayOfEdges, distance) {
    var edge1 = arrayOfEdges[0];
    var edge2 = arrayOfEdges[1];
    var intersection = findCurveIntersection(edge1, edge2);
    if (intersection) {
        var t1 = curveLengthToParameter(edge1, distance);
        var t2 = curveLengthToParameter(edge2, distance);
        var dividedEdge1 = divideCurve(edge1, t1);
        var dividedEdge2 = divideCurve(edge2, t2);
        var chamferStart1 = dividedEdge1[1];
        var chamferStart2 = dividedEdge2[1];
        var chamferCurve = createNurbsCurve([
            chamferStart1,
            intersection,
            chamferStart2
        ], 2, [
            0,
            0,
            0,
            1,
            1,
            1
        ]);
        return {
            edge1: dividedEdge1[0],
            edge2: dividedEdge2[0],
            chamfer: chamferCurve
        };
    } else {
        return null;
    }
}