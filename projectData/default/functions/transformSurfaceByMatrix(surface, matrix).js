function transformSurfaceByMatrix(surface, matrix) {
    var transformedControlPoints = [];
    for (var i = 0; i < surface.controlPoints.length; i++) {
        var row = surface.controlPoints[i];
        var transformedRow = [];
        for (var j = 0; j < row.length; j++) {
            var point = row[j];
            var x = matrix[0][0] * point.x + matrix[0][1] * point.y + matrix[0][2] * point.z + matrix[0][3];
            var y = matrix[1][0] * point.x + matrix[1][1] * point.y + matrix[1][2] * point.z + matrix[1][3];
            var z = matrix[2][0] * point.x + matrix[2][1] * point.y + matrix[2][2] * point.z + matrix[2][3];
            var w = matrix[3][0] * point.x + matrix[3][1] * point.y + matrix[3][2] * point.z + matrix[3][3];
            transformedRow.push({
                x: x / w,
                y: y / w,
                z: z / w
            });
        }
        transformedControlPoints.push(transformedRow);
    }
    return createNurbsSurface(transformedControlPoints, surface.degreeU, surface.degreeV, surface.knotsU, surface.knotsV);
}