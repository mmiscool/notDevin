function convertToBezier(curve) {
    var p = curve.points, degree = curve.degree, knots = curve.knots;
    var n = p.length - 1;
    var m = knots.length - 1;
    var v = degree;
    var bezierCurves = [];
    for (var i = degree; i <= m - degree - 1; i++) {
        if (knots[i] !== knots[i + 1]) {
            var subPoints = [];
            for (var j = i - degree; j <= i; j++) {
                subPoints.push({
                    x: p[j].x,
                    y: p[j].y,
                    z: p[j].z
                });
            }
            var bezierDegree = degree;
            var d = knots[i + 1] - knots[i];
            for (var l = degree; l > 0; l--) {
                var a = (knots[i + 1] - knots[i + l]) / d;
                for (var k = 0; k < l; k++) {
                    subPoints[k] = {
                        x: a * subPoints[k].x + (1 - a) * subPoints[k + 1].x,
                        y: a * subPoints[k].y + (1 - a) * subPoints[k + 1].y,
                        z: a * subPoints[k].z + (1 - a) * subPoints[k + 1].z
                    };
                }
            }
            bezierCurves.push(subPoints.slice(0, bezierDegree + 1));
        }
    }
    return bezierCurves;
}