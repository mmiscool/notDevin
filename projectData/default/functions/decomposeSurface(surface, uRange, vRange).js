decomposeSurface = function (points, tolerance) {
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let a = points[i].x * points[j].x + points[i].y * points[j].y + points[i].z * points[j].z;
            let b = Math.sqrt(Math.pow(points[i].x, 2) + Math.pow(points[i].y, 2) + Math.pow(points[i].z, 2)) * Math.sqrt(Math.pow(points[j].x, 2) + Math.pow(points[j].y, 2) + Math.pow(points[j].z, 2));
            if (Math.abs(a - b) <= tolerance) {
                return [
                    i,
                    j
                ];
            }
        }
    }
    return null;
};