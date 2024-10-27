function recalculateKnots(existingKnots, newKnot, times) {
    for (var i = 0; i < times; i++) {
        existingKnots.push({
            x: newKnot.x,
            y: newKnot.y,
            z: newKnot.z
        });
    }
    existingKnots.sort(function (a, b) {
        if (a.x !== b.x)
            return a.x - b.x;
        if (a.y !== b.y)
            return a.y - b.y;
        return a.z - b.z;
    });
    return existingKnots;
}