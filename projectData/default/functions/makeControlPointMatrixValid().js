makeControlPointMatrixValid = function (points) {
    var distance = Math.sqrt(Math.pow(points[1][0] - points[0][0], 2) + Math.pow(points[1][1] - points[0][1], 2) + Math.pow(points[1][2] - points[0][2], 2));
    return distance;
};