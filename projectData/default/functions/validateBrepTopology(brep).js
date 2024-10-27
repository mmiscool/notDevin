function validateBrepTopology(a, b, c) {
    return {
        x: a.x + b.x + c.x,
        y: a.y + b.y + c.y,
        z: a.z + b.z + c.z
    };
}