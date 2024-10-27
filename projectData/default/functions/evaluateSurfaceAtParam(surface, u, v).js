function evaluateSurfaceAtParam(surface, u, v) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var spanU = findSpan(degreeU, knotsU, u);
    var spanV = findSpan(degreeV, knotsV, v);
    var basisU = basisFunc(spanU, u, degreeU, knotsU);
    var basisV = basisFunc(spanV, v, degreeV, knotsV);
    var S = {
        x: 0,
        y: 0,
        z: 0
    };
    var weight = 0;
    for (var l = 0; l <= degreeV; l++) {
        var temp = {
            x: 0,
            y: 0,
            z: 0
        };
        var weightTemp = 0;
        for (var k = 0; k <= degreeU; k++) {
            var cp = evaluateControlPointsGrid(controlPoints, spanU - degreeU + k, spanV - degreeV + l);
            var w = weights[spanU - degreeU + k][spanV - degreeV + l];
            var B = basisU[k] * basisV[l];
            temp.x += B * cp.x * w;
            temp.y += B * cp.y * w;
            temp.z += B * cp.z * w;
            weightTemp += B * w;
        }
        S.x += temp.x;
        S.y += temp.y;
        S.z += temp.z;
        weight += weightTemp;
    }
    S.x /= weight;
    S.y /= weight;
    S.z /= weight;
    return S;
}
function findSpan(degree, knots, t) {
    var n = knots.length - degree - 1;
    if (t >= knots[n]) {
        return n - 1;
    }
    if (t <= knots[degree]) {
        return degree;
    }
    var low = degree;
    var high = n;
    var mid = Math.floor((low + high) / 2);
    while (t < knots[mid] || t >= knots[mid + 1]) {
        if (t < knots[mid]) {
            high = mid;
        } else {
            low = mid;
        }
        mid = Math.floor((low + high) / 2);
    }
    return mid;
}
function basisFunc(span, t, degree, knots) {
    var N = Array(degree + 1).fill(0);
    var left = Array(degree + 1).fill(0);
    var right = Array(degree + 1).fill(0);
    N[0] = 1;
    for (var j = 1; j <= degree; j++) {
        left[j] = t - knots[span + 1 - j];
        right[j] = knots[span + j] - t;
        var saved = 0;
        for (var r = 0; r < j; r++) {
            var temp = N[r] / (right[r + 1] + left[j - r]);
            N[r] = saved + right[r + 1] * temp;
            saved = left[j - r] * temp;
        }
        N[j] = saved;
    }
    return N;
}
function evaluateControlPointsGrid(controlPoints, indexU, indexV) {
    return controlPoints[indexU][indexV];
}