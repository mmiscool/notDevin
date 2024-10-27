function evaluateFunction(fn, parameter) {
    if (typeof fn === 'function') {
        if (typeof parameter === 'object' && parameter !== null) {
            return {
                x: fn(parameter.x),
                y: fn(parameter.y),
                z: fn(parameter.z)
            };
        }
        return fn(parameter);
    }
    return null;
}