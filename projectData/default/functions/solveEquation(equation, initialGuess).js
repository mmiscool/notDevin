function solveEquation(equation, initialGuess) {
    var x = initialGuess;
    var tolerance = 1e-10;
    var maxIterations = 1000;
    var iteration = 0;
    while (iteration < maxIterations) {
        var fx = evaluateFunction(equation, x);
        var dfx = evaluateFunction(deriveFunction(equation), x);
        if (Math.abs(fx) < tolerance) {
            return { x: x };
        }
        if (dfx === 0) {
            break;
        }
        x = x - fx / dfx;
        iteration++;
    }
    return { x: null };
}