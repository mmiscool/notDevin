function derivativeOfCurve(nurbsCurve, order) {
    var n = nurbsCurve.controlPoints.length - 1;
    var p = nurbsCurve.degree;
    var ders = Array(order + 1).fill().map(() => []);
    var delta = Array(p + 1).fill().map(() => []);
    for (var k = 0; k <= order; k++) {
        for (var i = 0; i <= n - k; i++) {
            delta[k][i] = {
                x: 0,
                y: 0,
                z: 0
            };
        }
    }
    for (var r = 0; r <= n - order; r++) {
        ders[order][r] = nurbsCurve.controlPoints[r];
    }
    for (var k = order - 1; k >= 0; k--) {
        for (var j = n - k; j >= 0; j--) {
            var alpha = (nurbsCurve.knots[j + p + 1] - nurbsCurve.knots[j + k + 1]) / (p - k);
            delta[k][j].x = alpha * (ders[k + 1][j + 1].x - ders[k + 1][j].x);
            delta[k][j].y = alpha * (ders[k + 1][j + 1].y - ders[k + 1][j].y);
            delta[k][j].z = alpha * (ders[k + 1][j + 1].z - ders[k + 1][j].z);
            ders[k][j] = {
                x: ders[k + 1][j].x + delta[k][j].x,
                y: ders[k + 1][j].y + delta[k][j].y,
                z: ders[k + 1][j].z + delta[k][j].z
            };
        }
    }
    return ders[0];
}