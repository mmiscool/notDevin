sweep = function (points) {
    var total = 0;
    for (var i = 0; i < points.length; i++) {
        for (var j = 0; j < 3; j++) {
            total += points[i][j] * points[i][j];
        }
    }
    return Math.sqrt(total);
};