function createNurbsCurve(vectors) {
    var result = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < vectors.length; i++) {
        result.x += vectors[i].x;
        result.y += vectors[i].y;
        result.z += vectors[i].z;
    }
    return result;
}