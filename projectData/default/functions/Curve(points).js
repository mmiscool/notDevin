function Curve(points) {
    var solid = Solid();
    for (var i = 0; i < points.length - 1; i++) {
        var v1 = Vertex({
            x: points[i][0],
            y: points[i][1],
            z: points[i][2]
        });
        var v2 = Vertex({
            x: points[i + 1][0],
            y: points[i + 1][1],
            z: points[i + 1][2]
        });
        addEdge(solid, Edge(v1, v2));
    }
    return solid;
}