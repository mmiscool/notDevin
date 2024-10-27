computeNormal = function (points, origin, xaxis, yaxis, zaxis) {
    var result = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var vector = {
            x: point.x - origin.x,
            y: point.y - origin.y,
            z: point.z - origin.z
        };
        var dotProduct = vector.x * xaxis.x + vector.y * yaxis.y + vector.z * zaxis.z;
        result.push({
            x: point.x,
            y: point.y,
            z: point.z,
            distance: Math.sqrt(dotProduct)
        });
    }
    return result;
};