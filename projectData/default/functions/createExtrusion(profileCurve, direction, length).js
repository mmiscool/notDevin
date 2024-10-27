function createExtrusion(profileCurve, direction, length) {
    function translateCurve(curve, translationVector) {
        return curve.map(point => ({
            x: point.x + translationVector.x,
            y: point.y + translationVector.y,
            z: point.z + translationVector.z
        }));
    }
    var directionMagnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
    var unitDirection = {
        x: direction.x / directionMagnitude,
        y: direction.y / directionMagnitude,
        z: direction.z / directionMagnitude
    };
    var extrusionVector = {
        x: unitDirection.x * length,
        y: unitDirection.y * length,
        z: unitDirection.z * length
    };
    var translatedCurve = translateCurve(profileCurve, extrusionVector);
    return loftNurbsSurfaces([
        profileCurve,
        translatedCurve
    ]);
}