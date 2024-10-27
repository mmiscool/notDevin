function divideCurve(curve, parameter) {
    var degree = curve.degree;
    var knots = curve.knots;
    var controlPoints = curve.controlPoints;
    var n = controlPoints.length - 1;
    var m = knots.length - 1;
    var span = -1;
    for (var i = degree; i <= m - degree - 1; i++) {
        if (knots[i] <= parameter && parameter < knots[i + 1]) {
            span = i;
            break;
        }
    }
    if (span === -1)
        return null;
    var leftPoints = [];
    var rightPoints = [];
    for (var j = 0; j <= span - degree; j++) {
        leftPoints.push(controlPoints[j]);
    }
    for (var j = span; j <= n; j++) {
        rightPoints.push(controlPoints[j]);
    }
    var newControlPoints = [controlPoints[span - degree]];
    for (var i = 1; i <= degree; i++) {
        var alpha = (parameter - knots[span + 1 - i]) / (knots[span + i] - knots[span + 1 - i]);
        newControlPoints[i] = interpolatePoints(newControlPoints[i - 1], controlPoints[span + 1 - i], alpha);
        rightPoints[i - 1] = newControlPoints[i];
    }
    rightPoints.unshift(newControlPoints[degree]);
    var leftKnots = knots.slice(0, span + 1);
    leftKnots.push(parameter);
    var rightKnots = [parameter];
    rightKnots = rightKnots.concat(knots.slice(span + 1));
    return {
        leftCurve: {
            degree: degree,
            knots: leftKnots,
            controlPoints: leftPoints.concat(newControlPoints.slice(0, -1))
        },
        rightCurve: {
            degree: degree,
            knots: rightKnots,
            controlPoints: rightPoints
        }
    };
}
function basisFunction(i, degree, t, knots) {
    if (degree === 0) {
        return knots[i] <= t && t < knots[i + 1] ? 1 : 0;
    } else {
        var left = knots[i + degree] - knots[i];
        var right = knots[i + degree + 1] - knots[i + 1];
        var coLeft = left !== 0 ? (t - knots[i]) / left : 0;
        var coRight = right !== 0 ? (knots[i + degree + 1] - t) / right : 0;
        return coLeft * basisFunction(i, degree - 1, t, knots) + coRight * basisFunction(i + 1, degree - 1, t, knots);
    }
}
function interpolatePoints(p1, p2, alpha) {
    return {
        x: (1 - alpha) * p1.x + alpha * p2.x,
        y: (1 - alpha) * p1.y + alpha * p2.y,
        z: (1 - alpha) * p1.z + alpha * p2.z
    };
}