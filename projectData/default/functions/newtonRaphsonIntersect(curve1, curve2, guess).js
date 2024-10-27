function newtonRaphsonIntersect(curve1, curve2, guess) {
    var epsilon = 1e-7;
    function evaluateCurveAtParam(curve, t) {
        return curve(t);
    }
    function derivative(curve, t) {
        var h = 0.00001;
        var p1 = evaluateCurveAtParam(curve, t - h);
        var p2 = evaluateCurveAtParam(curve, t + h);
        return {
            x: (p2.x - p1.x) / (2 * h),
            y: (p2.y - p1.y) / (2 * h),
            z: (p2.z - p1.z) / (2 * h)
        };
    }
    var t1 = guess;
    var t2 = guess;
    for (var i = 0; i < 100; i++) {
        var p1 = evaluateCurveAtParam(curve1, t1);
        var p2 = evaluateCurveAtParam(curve2, t2);
        var diff = {
            x: p1.x - p2.x,
            y: p1.y - p2.y,
            z: p1.z - p2.z
        };
        var fMag = Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);
        if (fMag <= epsilon) {
            return {
                x: p1.x,
                y: p1.y,
                z: p1.z
            };
        }
        var d1 = derivative(curve1, t1);
        var d2 = derivative(curve2, t2);
        var d12 = {
            x: d1.x - d2.x,
            y: d1.y - d2.y,
            z: d1.z - d2.z
        };
        var denom = d12.x * d12.x + d12.y * d12.y + d12.z * d12.z;
        if (Math.abs(denom) < epsilon) {
            return null;
        }
        var dt = (diff.x * d12.x + diff.y * d12.y + diff.z * d12.z) / denom;
        t1 -= dt;
        t2 += dt;
    }
    return null;
}