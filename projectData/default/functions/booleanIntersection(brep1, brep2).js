function booleanIntersection(pointA, pointB, t) {
    return {
        x: pointA.x + t * (pointB.x - pointA.x),
        y: pointA.y + t * (pointB.y - pointA.y),
        z: pointA.z + t * (pointB.z - pointA.z)
    };
}