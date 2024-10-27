function alignSurfaceEdges(edge1, edge2) {
    var point1 = edge1[0];
    var point2 = edge1[edge1.length - 1];
    var point3 = edge2[0];
    var point4 = edge2[edge2.length - 1];
    var normal1 = calculateNormal(point1, point2);
    var normal2 = calculateNormal(point3, point4);
    if (normal1.x !== normal2.x || normal1.y !== normal2.y || normal1.z !== normal2.z) {
        edge2.reverse();
    }
}