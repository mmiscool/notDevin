function splitCurveAtParam(curve, param) {
    var bezierCurves = convertToBezier(curve);
    var leftCurve = { controlPoints: [] };
    var rightCurve = { controlPoints: [] };
    for (var i = 0; i < bezierCurves.length; i++) {
        var controlPoints = bezierCurves[i].controlPoints;
        var startParam = bezierCurves[i].startParam;
        var endParam = bezierCurves[i].endParam;
        if (param > startParam && param < endParam) {
            var t = (param - startParam) / (endParam - startParam);
            var newPoints = [];
            var temp = controlPoints.slice();
            while (temp.length > 1) {
                var newTemp = [];
                for (var j = 0; j < temp.length - 1; j++) {
                    var x = (1 - t) * temp[j].x + t * temp[j + 1].x;
                    var y = (1 - t) * temp[j].y + t * temp[j + 1].y;
                    var z = (1 - t) * temp[j].z + t * temp[j + 1].z;
                    newTemp.push({
                        x: x,
                        y: y,
                        z: z
                    });
                }
                newPoints.push(newTemp[0]);
                temp = newTemp;
            }
            leftCurve.controlPoints.push(...controlPoints.slice(0, controlPoints.length - newPoints.length));
            leftCurve.controlPoints.push(...newPoints);
            rightCurve.controlPoints.push(...newPoints);
            rightCurve.controlPoints.push(...controlPoints.slice(newPoints.length));
        } else if (param <= startParam) {
            leftCurve.controlPoints.push(...controlPoints);
        } else {
            rightCurve.controlPoints.push(...controlPoints);
        }
    }
    leftCurve.degree = curve.degree;
    rightCurve.degree = curve.degree;
    leftCurve.knots = curve.knots.slice(0, curve.knots.indexOf(param) + 1);
    rightCurve.knots = curve.knots.slice(curve.knots.indexOf(param));
    return {
        left: leftCurve,
        right: rightCurve
    };
}