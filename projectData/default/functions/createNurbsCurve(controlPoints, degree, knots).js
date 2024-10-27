function createNurbsCurve(controlPoints, degree, knots) {
    return {
        controlPoints: controlPoints,
        degree: degree,
        knots: knots
    };
}