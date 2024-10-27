function createSweep(profileCurve, pathCurve) {
    var profilePoints = [];
    var pathLength = curveLength(pathCurve);
    var sections = 10;
    for (var i = 0; i <= sections; i++) {
        var t = i / sections;
        var pathPoint = evaluateNurbsCurve(pathCurve, t * pathLength);
        var profileSection = [];
        for (var j = 0; j < profileCurve.length; j++) {
            profileSection.push({
                x: profileCurve[j].x + pathPoint.x,
                y: profileCurve[j].y + pathPoint.y,
                z: profileCurve[j].z + pathPoint.z
            });
        }
        profilePoints.push(profileSection);
    }
    return loftNurbsSurfaces(profilePoints);
}