function uniteSolids(point1, point2, point3) {
    return {
        x: (point1.x + point2.x + point3.x) / 3,
        y: (point1.y + point2.y + point3.y) / 3,
        z: (point1.z + point2.z + point3.z) / 3
    };
}