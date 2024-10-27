function calculateSurfaceBoundingBox(surface) {
    var uMin = surface.knotsU[surface.degreeU];
    var uMax = surface.knotsU[surface.knotsU.length - surface.degreeU - 1];
    var vMin = surface.knotsV[surface.degreeV];
    var vMax = surface.knotsV[surface.knotsV.length - surface.degreeV - 1];
    var uSteps = 10, vSteps = 10;
    var minX = Infinity, minY = Infinity, minZ = Infinity;
    var maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (var i = 0; i <= uSteps; i++) {
        for (var j = 0; j <= vSteps; j++) {
            var u = uMin + (uMax - uMin) * (i / uSteps);
            var v = vMin + (vMax - vMin) * (j / vSteps);
            var point = evaluateNurbsSurface(surface, u, v);
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            minZ = Math.min(minZ, point.z);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
            maxZ = Math.max(maxZ, point.z);
        }
    }
    return {
        min: {
            x: minX,
            y: minY,
            z: minZ
        },
        max: {
            x: maxX,
            y: maxY,
            z: maxZ
        }
    };
}