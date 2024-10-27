function computeSurfaceNormals(surface) {
    var normals = [];
    var divisionsU = 10;
    var divisionsV = 10;
    for (var i = 0; i <= divisionsU; i++) {
        normals[i] = [];
        for (var j = 0; j <= divisionsV; j++) {
            var paramU = i / divisionsU;
            var paramV = j / divisionsV;
            var pointOnSurface = evaluateNurbsSurface(surface, paramU, paramV);
            var pointOnSurfaceUPlus = evaluateNurbsSurface(surface, paramU + 0.01, paramV);
            var pointOnSurfaceVPlus = evaluateNurbsSurface(surface, paramU, paramV + 0.01);
            var tangentU = {
                x: pointOnSurfaceUPlus.x - pointOnSurface.x,
                y: pointOnSurfaceUPlus.y - pointOnSurface.y,
                z: pointOnSurfaceUPlus.z - pointOnSurface.z
            };
            var tangentV = {
                x: pointOnSurfaceVPlus.x - pointOnSurface.x,
                y: pointOnSurfaceVPlus.y - pointOnSurface.y,
                z: pointOnSurfaceVPlus.z - pointOnSurface.z
            };
            var normal = calculateNormal(tangentU, tangentV);
            normals[i][j] = normal;
        }
    }
    return normals;
}