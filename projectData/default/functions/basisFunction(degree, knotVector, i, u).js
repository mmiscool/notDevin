function basisFunction(point, axis) {
    let result = {
        x: point.x,
        y: point.y,
        z: point.z
    };
    result[axis] *= -1;
    return result;
}