function shellSolid(face, thickness) {
    var offsetEdges = [];
    for (var i = 0; i < face.edges.length; i++) {
        var offsetEdge = offsetCurve(face.edges[i], thickness);
        offsetEdges.push(offsetEdge);
    }
    var offsetFace = mergeCurves(offsetEdges[0], offsetEdges[offsetEdges.length - 1]);
    for (var j = 1; j < offsetEdges.length - 1; j++) {
        offsetFace = mergeCurves(offsetFace, offsetEdges[j]);
    }
    return offsetFace;
}