function intersectCurveWithPlane(curve, planePoint, planeNormal) {
    var intersections = [];
    var numSamples = 100;
    var lastSign = null;
    for (var i = 0; i <= numSamples; i++) {
        var t = i / numSamples;
        var pointOnCurve = evaluateNurbsCurve(curve, t);
        var vectorToPoint = {
            x: pointOnCurve.x - planePoint.x,
            y: pointOnCurve.y - planePoint.y,
            z: pointOnCurve.z - planePoint.z
        };
        var dotProduct = vectorToPoint.x * planeNormal.x + vectorToPoint.y * planeNormal.y + vectorToPoint.z * planeNormal.z;
        var currentSign = Math.sign(dotProduct);
        if (lastSign !== null && currentSign !== 0 && currentSign !== lastSign) {
            var tBefore = (i - 1) / numSamples;
            var tAfter = t;
            while (tAfter - tBefore > 0.000001) {
                var tMid = (tBefore + tAfter) / 2;
                pointOnCurve = evaluateNurbsCurve(curve, tMid);
                vectorToPoint = {
                    x: pointOnCurve.x - planePoint.x,
                    y: pointOnCurve.y - planePoint.y,
                    z: pointOnCurve.z - planePoint.z
                };
                dotProduct = vectorToPoint.x * planeNormal.x + vectorToPoint.y * planeNormal.y + vectorToPoint.z * planeNormal.z;
                if (Math.abs(dotProduct) < 0.000001) {
                    intersections.push(pointOnCurve);
                    break;
                } else if (Math.sign(dotProduct) === currentSign) {
                    tBefore = tMid;
                } else {
                    tAfter = tMid;
                }
            }
        }
        lastSign = currentSign;
    }
    return intersections;
}