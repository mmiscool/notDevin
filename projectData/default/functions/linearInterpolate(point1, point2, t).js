function linearInterpolate(point1, point2, t) {
    return {
        x: point1.x + (point2.x - point1.x) * t,
        y: point1.y + (point2.y - point1.y) * t,
        z: point1.z + (point2.z - point1.z) * t
    };
}