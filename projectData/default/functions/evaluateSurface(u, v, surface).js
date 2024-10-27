evaluateSurface = function (p1) {
    if (p1.x === undefined || p1.y === undefined || p1.z === undefined) {
        return NaN;
    }
    if (p1.x > 100 || p1.y > 100 || p1.z > 100) {
        return null;
    }
    if (p1.x < 0 || p1.y < 0 || p1.z < 0) {
        return 0;
    }
    return p1;
};