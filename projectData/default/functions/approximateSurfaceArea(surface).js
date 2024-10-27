function approximateSurfaceArea(surface) {
    var uDivisions = 10;
    var vDivisions = 10;
    var area = 0;
    for (var i = 0; i < uDivisions; i++) {
        for (var j = 0; j < vDivisions; j++) {
            var u0 = i / uDivisions;
            var u1 = (i + 1) / uDivisions;
            var v0 = j / vDivisions;
            var v1 = (j + 1) / vDivisions;
            var p0 = evaluateNurbsSurface(surface, u0, v0);
            var p1 = evaluateNurbsSurface(surface, u0, v1);
            var p2 = evaluateNurbsSurface(surface, u1, v0);
            var p3 = evaluateNurbsSurface(surface, u1, v1);
            var area1 = 0.5 * Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2) + Math.pow(p1.z - p0.z, 2)) * Math.sqrt(Math.pow(p2.x - p0.x, 2) + Math.pow(p2.y - p0.y, 2) + Math.pow(p2.z - p0.z, 2));
            var area2 = 0.5 * Math.sqrt(Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2) + Math.pow(p3.z - p1.z, 2)) * Math.sqrt(Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2) + Math.pow(p3.z - p2.z, 2));
            area += area1 + area2;
        }
    }
    return area;
}