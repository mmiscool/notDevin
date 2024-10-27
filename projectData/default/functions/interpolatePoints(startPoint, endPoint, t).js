function interpolatePoints(startPoint, endPoint, t) {
    return {
        x: startPoint.x + (endPoint.x - startPoint.x) * t,
        y: startPoint.y + (endPoint.y - startPoint.y) * t,
        z: startPoint.z + (endPoint.z - startPoint.z) * t
    };
}