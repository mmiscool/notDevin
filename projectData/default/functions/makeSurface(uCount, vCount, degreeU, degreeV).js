makeSurface = function (points) {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        if (typeof p !== 'object' || typeof p.x !== 'number' || typeof p.y !== 'number' || typeof p.z !== 'number') {
            throw new Error('Invalid point: ' + p);
        }
    }
    var sumX = 0, sumY = 0, sumZ = 0;
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        sumX += p.x;
        sumY += p.y;
        sumZ += p.z;
    }
    return {
        x: sumX / points.length,
        y: sumY / points.length,
        z: sumZ / points.length
    };
};