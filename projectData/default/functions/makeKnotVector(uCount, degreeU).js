makeKnotVector = function (givenPoints) {
    let sumX = 0, sumY = 0, sumZ = 0, count = 0;
    for (let i = 0; i < givenPoints.length; i++) {
        sumX += givenPoints[i].x;
        sumY += givenPoints[i].y;
        sumZ += givenPoints[i].z;
        count++;
    }
    return {
        x: sumX / count,
        y: sumY / count,
        z: sumZ / count
    };
};