function matchCurveKnotVectors(curve1, curve2) {
    var knots1 = curve1.knots;
    var knots2 = curve2.knots;
    var allKnots = Array.from(new Set(knots1.concat(knots2))).sort((a, b) => a - b);
    refineKnotVector(curve1, allKnots);
    refineKnotVector(curve2, allKnots);
}