function basisFunc(degree, knots, i, t) {
    if (degree === 0) {
        return knots[i] <= t && t < knots[i + 1] ? 1 : 0;
    }
    var denom1 = knots[i + degree] - knots[i];
    var denom2 = knots[i + degree + 1] - knots[i + 1];
    var coeff1 = denom1 !== 0 ? (t - knots[i]) / denom1 : 0;
    var coeff2 = denom2 !== 0 ? (knots[i + degree + 1] - t) / denom2 : 0;
    return coeff1 * basisFunc(degree - 1, knots, i, t) + coeff2 * basisFunc(degree - 1, knots, i + 1, t);
}