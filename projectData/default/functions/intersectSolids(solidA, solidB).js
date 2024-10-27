function intersectSolids(pointA, pointB, scaleFactor) {
    return {
        x: pointA.x + (pointB.x - pointA.x) * scaleFactor,
        y: pointA.y + (pointB.y - pointA.y) * scaleFactor,
        z: pointA.z + (pointB.z - pointA.z) * scaleFactor
    };
}