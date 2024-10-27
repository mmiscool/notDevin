function distanceBetweenSurfaces(surface1, surface2) {
    var minDistance = Infinity;
    var boundingBox1 = calculateSurfaceBoundingBox(surface1);
    var boundingBox2 = calculateSurfaceBoundingBox(surface2);
    var pointsToCheck = [
        {
            x: boundingBox1.minX,
            y: boundingBox1.minY,
            z: boundingBox1.minZ
        },
        {
            x: boundingBox1.maxX,
            y: boundingBox1.maxY,
            z: boundingBox1.maxZ
        },
        {
            x: boundingBox2.minX,
            y: boundingBox2.minY,
            z: boundingBox2.minZ
        },
        {
            x: boundingBox2.maxX,
            y: boundingBox2.maxY,
            z: boundingBox2.maxZ
        }
    ];
    pointsToCheck.forEach(function (point) {
        var closestPoint1 = findClosestPointOnSurface(point, surface1);
        var closestPoint2 = findClosestPointOnSurface(point, surface2);
        var distance1 = Math.sqrt(Math.pow(point.x - closestPoint1.x, 2) + Math.pow(point.y - closestPoint1.y, 2) + Math.pow(point.z - closestPoint1.z, 2));
        var distance2 = Math.sqrt(Math.pow(point.x - closestPoint2.x, 2) + Math.pow(point.y - closestPoint2.y, 2) + Math.pow(point.z - closestPoint2.z, 2));
        minDistance = Math.min(minDistance, distance1, distance2);
    });
    return minDistance;
}