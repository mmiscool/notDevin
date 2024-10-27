function subtractSolids(point1, point2) {
    return {
        x: point1.x + point2.x,
        y: point1.y + point2.y,
        z: point1.z + point2.z
    };
}