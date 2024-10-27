findClosestPointOnCurve = function (points) {
    var result = {
        x: points[0].x,
        y: points[0].y,
        z: points[0].z
    };
    for (var i = 1; i < points.length; i++) {
        result = {
            x: (points[i].y - points[i - 1].y) * (result.z - points[i - 1].z) - (points[i].z - points[i - 1].z) * (result.y - points[i - 1].y),
            y: (points[i].z - points[i - 1].z) * (result.x - points[i - 1].x) - (points[i].x - points[i - 1].x) * (result.z - points[i - 1].z),
            z: (points[i].x - points[i - 1].x) * (result.y - points[i - 1].y) - (points[i].y - points[i - 1].y) * (result.x - points[i - 1].x)
        };
    }
    return {
        x: result.x - points[points.length - 1].x,
        y: result.y - points[points.length - 1].y,
        z: result.z - points[points.length - 1].z
    };
};