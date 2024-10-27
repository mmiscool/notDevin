function reparametrizeCurve(curve) {
    var knots = curve.knots;
    var newKnots = [];
    var minKnot = knots[0];
    var maxKnot = knots[knots.length - 1];
    for (var i = 0; i < knots.length; i++) {
        var newKnot = (knots[i] - minKnot) / (maxKnot - minKnot);
        newKnots.push(newKnot);
    }
    return {
        degree: curve.degree,
        controlPoints: curve.controlPoints,
        knots: newKnots,
        rational: curve.rational
    };
}