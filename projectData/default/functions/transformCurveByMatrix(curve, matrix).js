function transformCurveByMatrix(curve, matrix) {
    var transformedControlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        var point = curve.controlPoints[i];
        var homogeneous = convertToHomogeneousCoord(point, curve.weights[i]);
        var x = matrix[0][0] * homogeneous.x + matrix[0][1] * homogeneous.y + matrix[0][2] * homogeneous.z + matrix[0][3] * homogeneous.w;
        var y = matrix[1][0] * homogeneous.x + matrix[1][1] * homogeneous.y + matrix[1][2] * homogeneous.z + matrix[1][3] * homogeneous.w;
        var z = matrix[2][0] * homogeneous.x + matrix[2][1] * homogeneous.y + matrix[2][2] * homogeneous.z + matrix[2][3] * homogeneous.w;
        var w = matrix[3][0] * homogeneous.x + matrix[3][1] * homogeneous.y + matrix[3][2] * homogeneous.z + matrix[3][3] * homogeneous.w;
        var transformedPoint = convertFromHomogeneousCoord({
            x: x,
            y: y,
            z: z,
            w: w
        });
        transformedControlPoints.push(transformedPoint);
    }
    return createNurbsCurve(transformedControlPoints, curve.degree, curve.knots);
}