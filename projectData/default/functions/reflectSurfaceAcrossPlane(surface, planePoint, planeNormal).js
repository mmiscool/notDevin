function reflectSurfaceAcrossPlane(surface, planePoint, planeNormal) {
    var uLength = surface.controlGrid.length;
    var vLength = surface.controlGrid[0].length;
    var reflectedControlGrid = [];
    var normalSquared = planeNormal.x * planeNormal.x + planeNormal.y * planeNormal.y + planeNormal.z * planeNormal.z;
    for (var i = 0; i < uLength; i++) {
        reflectedControlGrid[i] = [];
        for (var j = 0; j < vLength; j++) {
            var point = surface.controlGrid[i][j];
            var dx = point.x - planePoint.x;
            var dy = point.y - planePoint.y;
            var dz = point.z - planePoint.z;
            var dotProduct = 2 * (dx * planeNormal.x + dy * planeNormal.y + dz * planeNormal.z) / normalSquared;
            reflectedControlGrid[i][j] = {
                x: point.x - dotProduct * planeNormal.x,
                y: point.y - dotProduct * planeNormal.y,
                z: point.z - dotProduct * planeNormal.z
            };
        }
    }
    return createNurbsSurface(reflectedControlGrid, surface.degreeU, surface.degreeV, surface.knotsU, surface.knotsV);
}