function reflectCurveAcrossPlane(curve, planePoint, planeNormal) {
    var reflectedControlPoints = curve.controlPoints.map(function (point) {
        var px = point.x, py = point.y, pz = point.z;
        var nx = planeNormal.x, ny = planeNormal.y, nz = planeNormal.z;
        var ox = planePoint.x, oy = planePoint.y, oz = planePoint.z;
        var d = (px - ox) * nx + (py - oy) * ny + (pz - oz) * nz;
        return {
            x: px - 2 * d * nx,
            y: py - 2 * d * ny,
            z: pz - 2 * d * nz
        };
    });
    return createNurbsCurve(reflectedControlPoints, curve.degree, curve.knots);
}