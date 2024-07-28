function translate(point, vector) {
    let x = point.x + vector.x;
    let y = point.y + vector.y;
    let z = point.z + vector.z;
    return {x, y, z};
}