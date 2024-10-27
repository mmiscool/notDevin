function calculateTangentAtParam(curve, param) {
    var epsilon = 0.0001;
    var point1 = evaluateCurveAtParam(curve, param - epsilon);
    var point2 = evaluateCurveAtParam(curve, param + epsilon);
    return {
        x: (point2.x - point1.x) / (2 * epsilon),
        y: (point2.y - point1.y) / (2 * epsilon),
        z: (point2.z - point1.z) / (2 * epsilon)
    };
}