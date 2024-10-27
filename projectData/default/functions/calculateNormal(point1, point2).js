function calculateNormal(point1, point2) {
    var nx = point2.x - point1.x;
    var ny = point2.y - point1.y;
    var nz = point2.z - point1.z;
    var length = Math.sqrt(nx * nx + ny * ny + nz * nz);
    return {
        x: nx / length,
        y: ny / length,
        z: nz / length
    };
}