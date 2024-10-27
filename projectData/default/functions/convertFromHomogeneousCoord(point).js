function convertFromHomogeneousCoord(point) {
    return {
        x: point.x / point.z,
        y: point.y / point.z,
        z: 1
    };
}