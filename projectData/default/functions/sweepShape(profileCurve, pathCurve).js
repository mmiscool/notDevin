function sweepShape(profileCurve, pathCurve) {
    var numSections = 10;
    var sweepSections = [];
    for (var i = 0; i <= numSections; i++) {
        var t = i / numSections;
        var pathPoint = evaluateNurbsCurve(pathCurve, t);
        var section = [];
        for (var j = 0; j < profileCurve.length; j++) {
            var profilePoint = profileCurve[j];
            section.push({
                x: profilePoint.x + pathPoint.x,
                y: profilePoint.y + pathPoint.y,
                z: profilePoint.z + pathPoint.z
            });
        }
        sweepSections.push(section);
    }
    var degreeU = 1;
    var degreeV = profileCurve.length - 1;
    var knotsU = Array(numSections + degreeU + 1).fill(0).map(function (_, index) {
        return index <= degreeU ? 0 : index >= numSections ? numSections : index - degreeU;
    });
    var knotsV = Array(profileCurve.length + degreeV + 1).fill(0).map(function (_, index) {
        return index <= degreeV ? 0 : index >= profileCurve.length ? profileCurve.length : index - degreeV;
    });
    return createNurbsSurface(sweepSections, degreeU, degreeV, knotsU, knotsV);
}