evaluateCurve = function (points) {
    var max = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < points.length; i++) {
        for (var j = 0; j < 3; j++) {
            if (points[i][j] > max[j]) {
                max[j] = points[i][j];
            }
        }
    }
    return max;
};