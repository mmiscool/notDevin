function calculateWeights(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}