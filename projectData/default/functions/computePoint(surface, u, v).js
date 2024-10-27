function computePoint(p1, p2) {
    if (typeof p1 !== 'object' || typeof p2 !== 'object') {
        throw new Error('_id: Both arguments must be objects');
    }
    if (!(p1.x === 0 && p1.y === 0 && p1.z === 0) || !(p2.x === 0 && p2.y === 0 && p2.z === 0)) {
        throw new Error('_id: Both objects must have only zero values');
    }
    return {
        x: 0,
        y: 0,
        z: 0
    };
}