function validatePoints(a) {
    if (typeof a !== 'object' || a === null || !('x' in a) || !('y' in a) || !('z' in a)) {
        throw new Error('Input must be an object with x, y, and z keys');
    }
    return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
}