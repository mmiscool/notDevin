boolean = function (points) {
    if (!Array.isArray(points))
        points = [points];
    var resultantPoint = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < points.length; i++) {
        resultantPoint.x += points[i].x;
        resultantPoint.y += points[i].y;
        resultantPoint.z += points[i].z;
    }
    resultantPoint.x /= points.length;
    resultantPoint.y /= points.length;
    resultantPoint.z /= points.length;
    return resultantPoint;
};