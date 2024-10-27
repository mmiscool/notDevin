function newtonRaphsonSurfaceIntersect(surface1, surface2, guess) {
    function evaluateSurfaceAtParam(surface, param) {
        return surface(param);
    }
    function dotProduct(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    function subtractVectors(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        };
    }
    function jacobianDeterminant(surface, param) {
        var h = 0.0001;
        var point = evaluateSurfaceAtParam(surface, param);
        var pointH1 = evaluateSurfaceAtParam(surface, {
            u: param.u + h,
            v: param.v
        });
        var pointH2 = evaluateSurfaceAtParam(surface, {
            u: param.u,
            v: param.v + h
        });
        var vector1 = subtractVectors(pointH1, point);
        var vector2 = subtractVectors(pointH2, point);
        return vector1.x * vector2.y - vector1.y * vector2.x;
    }
    var maxIterations = 100;
    var tolerance = 0.000001;
    var currentGuess = guess;
    for (var i = 0; i < maxIterations; i++) {
        var point1 = evaluateSurfaceAtParam(surface1, currentGuess);
        var point2 = evaluateSurfaceAtParam(surface2, currentGuess);
        var difference = subtractVectors(point1, point2);
        if (Math.sqrt(dotProduct(difference, difference)) < tolerance) {
            return currentGuess;
        }
        var jacobian1 = jacobianDeterminant(surface1, currentGuess);
        var jacobian2 = jacobianDeterminant(surface2, currentGuess);
        if (Math.abs(jacobian1 * jacobian2) < tolerance) {
            break;
        }
        var stepU = (difference.x * jacobian2 - difference.y * jacobian1) / (jacobian1 * jacobian2);
        var stepV = (difference.y * jacobian2 - difference.x * jacobian1) / (jacobian1 * jacobian2);
        currentGuess = {
            u: currentGuess.u - stepU,
            v: currentGuess.v - stepV
        };
    }
    return null;
}