function createChamfer(point) {
    var length = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z);
    return {
        x: point.x / length,
        y: point.y / length,
        z: point.z / length
    };
}