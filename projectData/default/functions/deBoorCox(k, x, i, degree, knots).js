function deBoorCox(k, x, i, degree, knots) {
    if (k === 0) {
        return x >= knots[i] && x < knots[i + 1] ? 1 : 0;
    }
    var denom1 = knots[i + k] - knots[i];
    var denom2 = knots[i + k + 1] - knots[i + 1];
    var term1 = denom1 !== 0 ? (x - knots[i]) / denom1 * deBoorCox(k - 1, x, i, degree, knots) : 0;
    var term2 = denom2 !== 0 ? (knots[i + k + 1] - x) / denom2 * deBoorCox(k - 1, x, i + 1, degree, knots) : 0;
    return term1 + term2;
}