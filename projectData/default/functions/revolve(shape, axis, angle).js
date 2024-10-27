revolve = function (x, y, z, points) {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += x * p.z;
        p.y += y * p.z;
    }
};