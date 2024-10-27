function refineKnotVector(curveOrSurface, newKnots) {
    var controlPoints, degree, knots;
    var isCurve = curveOrSurface.hasOwnProperty('degree');
    if (isCurve) {
        controlPoints = curveOrSurface.controlPoints;
        degree = curveOrSurface.degree;
        knots = curveOrSurface.knots;
    } else {
        controlPoints = curveOrSurface.controlPoints;
        degreeU = curveOrSurface.degreeU;
        degreeV = curveOrSurface.degreeV;
        knotsU = curveOrSurface.knotsU;
        knotsV = curveOrSurface.knotsV;
    }
    function insertKnot(knot, k, p, controlPoints, knots) {
        var n = controlPoints.length - 1;
        var m = knots.length - 1;
        var r = 1;
        var a = findSpan(knot, k, p, knots);
        var b = a + 1;
        var newControlPoints = [];
        for (var i = 0; i <= a - p; i++) {
            newControlPoints.push(controlPoints[i]);
        }
        for (var i = a - p + 1; i <= a; i++) {
            var alpha = (knot - knots[i]) / (knots[i + p] - knots[i]);
            var pt = {
                x: alpha * controlPoints[i].x + (1 - alpha) * controlPoints[i - 1].x,
                y: alpha * controlPoints[i].y + (1 - alpha) * controlPoints[i - 1].y,
                z: alpha * controlPoints[i].z + (1 - alpha) * controlPoints[i - 1].z
            };
            newControlPoints.push(pt);
        }
        for (var i = b; i <= n; i++) {
            newControlPoints.push(controlPoints[i]);
        }
        var newKnots = [];
        for (var i = 0; i <= a; i++) {
            newKnots.push(knots[i]);
        }
        newKnots.push(knot);
        for (var i = b; i <= m; i++) {
            newKnots.push(knots[i]);
        }
        return {
            controlPoints: newControlPoints,
            knots: newKnots
        };
    }
    function findSpan(u, n, p, U) {
        if (u >= U[n + 1])
            return n;
        if (u <= U[p])
            return p;
        var low = p;
        var high = n + 1;
        var mid = Math.floor((low + high) / 2);
        while (u < U[mid] || u >= U[mid + 1]) {
            if (u < U[mid]) {
                high = mid;
            } else {
                low = mid;
            }
            mid = Math.floor((low + high) / 2);
        }
        return mid;
    }
    for (var i = 0; i < newKnots.length; i++) {
        if (isCurve) {
            var result = insertKnot(newKnots[i], controlPoints.length - 1, degree, controlPoints, knots);
            controlPoints = result.controlPoints;
            knots = result.knots;
        } else {
            var nu = controlPoints.length - 1;
            var nv = controlPoints[0].length - 1;
            var knotResultU = insertKnot(newKnots[i], nu, degreeU, controlPoints, knotsU);
            controlPoints = knotResultU.controlPoints;
            knotsU = knotResultU.knots;
            var knotResultV = insertKnot(newKnots[i], nv, degreeV, controlPoints[0], knotsV);
            for (var j = 0; j < controlPoints.length; j++) {
                controlPoints[j] = knotResultV.controlPoints[j];
            }
            knotsV = knotResultV.knots;
        }
    }
    if (isCurve) {
        return createNurbsCurve(controlPoints, degree, knots);
    } else {
        return createNurbsSurface(controlPoints, degreeU, degreeV, knotsU, knotsV);
    }
}