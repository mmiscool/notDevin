function chamfer(p1, p2) {
    const v0 = [
        p2.x - p1.x,
        p2.y - p1.y,
        p2.z - p1.z
    ];
    const dot = v0[0] * v0[0] + v0[1] * v0[1] + v0[2] * v0[2];
    if (dot === 0) {
        return false;
    }
    return true;
}