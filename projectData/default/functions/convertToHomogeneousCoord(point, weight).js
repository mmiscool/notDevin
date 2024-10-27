function convertToHomogeneousCoord(point, weight) {
    return {
        x: point.x * weight,
        y: point.y * weight,
        z: point.z * weight,
        w: weight
    };
}