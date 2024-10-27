computeSecondDerivative = function (points, distances) {
    var result = [];
    for (var i = 0; i < points.length; i++) {
        for (var j = 0; j < points.length; j++) {
            if (i != j) {
                var distance = Math.sqrt(Math.pow(points[i][0] - points[j][0], 2) + Math.pow(points[i][1] - points[j][1], 2) + Math.pow(points[i][2] - points[j][2], 2));
                for (var k = 0; k < distances.length; k++) {
                    if (distance == distances[k][1]) {
                        result.push([
                            points[i][0],
                            points[i][1],
                            points[i][2],
                            distances[k][0]
                        ]);
                    }
                }
            }
        }
    }
    return result;
};