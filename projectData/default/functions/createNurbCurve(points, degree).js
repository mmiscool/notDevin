_id = function createNurbCurve(point1, point2) {
    if (typeof point1 !== 'object' || typeof point2 !== 'object') {
        throw new Error('Input must be an object');
    }
    if (!('x' in point1 && 'y' in point1 && 'z' in point1) || !('x' in point2 && 'y' in point2 && 'z' in point2)) {
        throw new Error('Input objects must contain x, y, z properties');
    }
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const dz = point2.z - point1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};