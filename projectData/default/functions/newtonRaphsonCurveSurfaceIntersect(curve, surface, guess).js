function newtonRaphsonCurveSurfaceIntersect(curve, surface, guess) {
    var tol = 1e-7, maxIter = 100, iter = 0, t = guess.t, u = guess.u, v = guess.v, diff, curvePt, surfacePt, curveDeriv, surfaceDerivU, surfaceDerivV, F, J, inverseJ, delta;
    function evaluateCurveAtParam(curve, t) {
        return curve(t);
    }
    function evaluateSurfaceAtParam(surface, u, v) {
        return surface(u, v);
    }
    while (iter < maxIter) {
        curvePt = evaluateCurveAtParam(curve, t);
        surfacePt = evaluateSurfaceAtParam(surface, u, v);
        diff = {
            x: curvePt.x - surfacePt.x,
            y: curvePt.y - surfacePt.y,
            z: curvePt.z - surfacePt.z
        };
        if (Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z) < tol)
            break;
        curveDeriv = evaluateCurveAtParam(curve, t + tol);
        curveDeriv = {
            x: (curveDeriv.x - curvePt.x) / tol,
            y: (curveDeriv.y - curvePt.y) / tol,
            z: (curveDeriv.z - curvePt.z) / tol
        };
        surfaceDerivU = evaluateSurfaceAtParam(surface, u + tol, v);
        surfaceDerivU = {
            x: (surfaceDerivU.x - surfacePt.x) / tol,
            y: (surfaceDerivU.y - surfacePt.y) / tol,
            z: (surfaceDerivU.z - surfacePt.z) / tol
        };
        surfaceDerivV = evaluateSurfaceAtParam(surface, u, v + tol);
        surfaceDerivV = {
            x: (surfaceDerivV.x - surfacePt.x) / tol,
            y: (surfaceDerivV.y - surfacePt.y) / tol,
            z: (surfaceDerivV.z - surfacePt.z) / tol
        };
        F = [
            diff.x,
            diff.y,
            diff.z
        ];
        J = [
            [
                curveDeriv.x,
                -surfaceDerivU.x,
                -surfaceDerivV.x
            ],
            [
                curveDeriv.y,
                -surfaceDerivU.y,
                -surfaceDerivV.y
            ],
            [
                curveDeriv.z,
                -surfaceDerivU.z,
                -surfaceDerivV.z
            ]
        ];
        inverseJ = invertMatrix(J);
        delta = multiplyMatrixVector(inverseJ, F);
        t -= delta[0];
        u -= delta[1];
        v -= delta[2];
        iter++;
    }
    return {
        t: t,
        u: u,
        v: v
    };
    function invertMatrix(m) {
        var det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
        var invDet = 1 / det;
        return [
            [
                (m[1][1] * m[2][2] - m[1][2] * m[2][1]) * invDet,
                (m[0][2] * m[2][1] - m[0][1] * m[2][2]) * invDet,
                (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * invDet
            ],
            [
                (m[1][2] * m[2][0] - m[1][0] * m[2][2]) * invDet,
                (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * invDet,
                (m[0][2] * m[1][0] - m[0][0] * m[1][2]) * invDet
            ],
            [
                (m[1][0] * m[2][1] - m[1][1] * m[2][0]) * invDet,
                (m[0][1] * m[2][0] - m[0][0] * m[2][1]) * invDet,
                (m[0][0] * m[1][1] - m[0][1] * m[1][0]) * invDet
            ]
        ];
    }
    function multiplyMatrixVector(m, v) {
        return [
            m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
            m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
            m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]
        ];
    }
}