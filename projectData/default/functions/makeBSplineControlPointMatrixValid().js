makeBSplineControlPointMatrixValid = function (points, tolerance) {
    return points.map(point => {
        let sum = 0;
        for (let i = 0; i < points.length; i++) {
            let distance = Math.sqrt(Math.pow(point.x - points[i].x, 2) + Math.pow(point.y - points[i].y, 2) + Math.pow(point.z - points[i].z, 2));
            if (distance <= tolerance) {
                sum += 1;
            }
        }
        return sum;
    });
};