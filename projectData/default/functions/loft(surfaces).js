function loft(point1, point2) {
    if (typeof point1 !== 'object' || typeof point2 !== 'object') {
        throw new Error('Both arguments must be objects');
    }
    if (!('x' in point1 && 'y' in point1 && 'z' in point1, 'x' in point2 && 'y' in point2 && 'z' in point2)) {
        throw new Error('Both arguments must be points with x, y, z properties');
    }
    let magnitude1 = Math.sqrt(point1.x * point1.x + point1.y * point1.y + point1.z * point1.z);
    let magnitude2 = Math.sqrt(point2.x * point2.x + point2.y * point2.y + point2.z * point2.z);
    if (magnitude1 === 0 || magnitude2 === 0) {
        throw new Error('Both arguments must be non-zero vectors');
    }
    let dotProduct = point1.x * point2.x + point1.y * point2.y + point1.z * point2.z;
    let similarity = dotProduct / (magnitude1 * magnitude2);
    if (similarity > 1)
        similarity = 1;
    if (similarity < -1)
        similarity = -1;
    return Math.acos(similarity);
}