here is the plain JavaScript code:

makeKnotVectorValid = function (points) {
    var sumX = 0, sumY = 0, sumZ = 0, count = 0;
    for (var i = 0; i < points.length; i++) {
        sumX += points[i].x;
        sumY += points[i].y;
        sumZ += points[i].z;
        count++;
    }
    return {x: sumX / count, y: sumY / count, z: sumZ / count};
};