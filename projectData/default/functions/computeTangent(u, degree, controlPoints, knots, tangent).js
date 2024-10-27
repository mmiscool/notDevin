computeTangent = function (p1) {
    p1.forEach(function (point) {
        var x = point.x;
        var y = point.y;
        var distance = 0;
        for (var z = 0; z < p1.length; z++) {
            var x2 = p1[z].x;
            var y2 = p1[z].y;
            distance += Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
        }
        point.distance = distance;
    });
};