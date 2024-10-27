function mergeNurbsCurves(points) {
    var reducedPoint = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < points.length; i++) {
        reducedPoint.x += points[i].x;
        reducedPoint.y += points[i].y;
        reducedPoint.z += points[i].z;
    }
    return reducedPoint;
}