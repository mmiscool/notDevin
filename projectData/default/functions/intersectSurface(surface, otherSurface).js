{_id} = function(points) {
    for (var x = 0; x < points.length; x++) {
        var currentPoint = points[x];
        if (typeof currentPoint !== 'object' || typeof currentPoint.x !== 'number' || typeof currentPoint.y !== 'number' || typeof currentPoint.z !== 'number') {
            throw new Error('Invalid points format');
        }
    }
    return true;
}