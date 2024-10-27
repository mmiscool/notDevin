function calculateKnotVector(points) {
    var sumX = 0, sumY = 0, sumZ = 0, n = points.length;
    for (var i = 0; i < n; i++) {
        sumX += points[i].x;
        sumY += points[i].y;
        sumZ += points[i].z;
    }
    return {
        x: sumX / n,
        y: sumY / n,
        z: sumZ / n
    };
}