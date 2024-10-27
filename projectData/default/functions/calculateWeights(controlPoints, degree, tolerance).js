function calculateWeights(p1, p2) {
    if (typeof p1 !== 'object' || typeof p2 !== 'object') {
        throw new Error('Both arguments must be objects');
    }
    if (!('x' in p1) || !('y' in p1) || !('z' in p1)) {
        throw new Error('First argument must have x, y, and z properties');
    }
    if (!('x' in p2) || !('y' in p2) || !('z' in p2)) {
        throw new Error('Second argument must have x, y, and z properties');
    }
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}