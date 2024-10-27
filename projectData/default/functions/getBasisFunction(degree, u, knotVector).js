function getBasisFunction(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
        z: p1.z + p2.z
    };
}