makeControlPointMatrix = function (points) {
    return points.map(point => [...point].sort((a, b) => a - b));
};