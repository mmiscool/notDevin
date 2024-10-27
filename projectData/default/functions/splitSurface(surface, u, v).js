function splitSurface(points) {
    var sumX = 0, sumY = 0, sumZ = 0;
    for (var i = 0; i < points.length; i++) {
        sumX += points[i].x;
        sumY += points[i].y;
        sumZ += points[i].z;
    }
    return {
        x: sumX / points.length,
        y: sumY / points.length,
        z: sumZ / points.length
    };
}