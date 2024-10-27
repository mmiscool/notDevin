function basisFunction(degree, knots, parameter) {
    function recursiveBasis(degree, knotIndex, t, knots) {
        if (degree === 0) {
            return knots[knotIndex] <= t && t < knots[knotIndex + 1] ? 1 : 0;
        }
        var leftDenom = knots[knotIndex + degree] - knots[knotIndex];
        var rightDenom = knots[knotIndex + degree + 1] - knots[knotIndex + 1];
        var left = leftDenom !== 0 ? (t - knots[knotIndex]) / leftDenom * recursiveBasis(degree - 1, knotIndex, t, knots) : 0;
        var right = rightDenom !== 0 ? (knots[knotIndex + degree + 1] - t) / rightDenom * recursiveBasis(degree - 1, knotIndex + 1, t, knots) : 0;
        return left + right;
    }
    var n = knots.length - degree - 1;
    var basisValues = [];
    for (var i = 0; i < n; i++) {
        basisValues.push(recursiveBasis(degree, i, parameter, knots));
    }
    return basisValues;
}