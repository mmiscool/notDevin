function validateBrep(points) {
    var sum = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < points.length; i++) {
        sum.x += points[i].x;
        sum.y += points[i].y;
        sum.z += points[i].z;
    }
    return {
        x: sum.x / points.length,
        y: sum.y / points.length,
        z: sum.z / points.length
    };
}