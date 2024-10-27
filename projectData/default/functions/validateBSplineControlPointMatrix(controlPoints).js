validateBSplineControlPointMatrix = function (points) {
    let xSum = 0;
    let ySum = 0;
    let zSum = 0;
    for (let i = 0; i < points.length; i++) {
        xSum += points[i].x;
        ySum += points[i].y;
        zSum += points[i].z;
    }
    return {
        x: xSum,
        y: ySum,
        z: zSum
    };
};