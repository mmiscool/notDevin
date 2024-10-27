function validateSurface(controlPoints, uDegree, vDegree, tolerance) {
    function validatePoints(points, tolerance) {
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            if (typeof point.x !== 'number' || typeof point.y !== 'number' || typeof point.z !== 'number') {
                return false;
            }
            if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
                return false;
            }
        }
        if (tolerance !== undefined && (typeof tolerance !== 'number' || !Number.isFinite(tolerance))) {
            return false;
        }
        return true;
    }
    function NURBSurface(controlPoints, uDegree, vDegree) {
        if (!Array.isArray(controlPoints) || controlPoints.length === 0 || !Array.isArray(controlPoints[0])) {
            return false;
        }
        var uCount = controlPoints.length;
        var vCount = controlPoints[0].length;
        for (var u = 0; u < uCount; u++) {
            if (!Array.isArray(controlPoints[u]) || controlPoints[u].length !== vCount) {
                return false;
            }
            var rowValid = validatePoints(controlPoints[u], tolerance);
            if (!rowValid) {
                return false;
            }
        }
        if (typeof uDegree !== 'number' || !Number.isInteger(uDegree) || uDegree < 1 || uDegree >= uCount) {
            return false;
        }
        if (typeof vDegree !== 'number' || !Number.isInteger(vDegree) || vDegree < 1 || vDegree >= vCount) {
            return false;
        }
        return true;
    }
    return NURBSurface(controlPoints, uDegree, vDegree);
}