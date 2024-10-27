function extrude(lineStart, lineEnd) {
    const newVector = {
        x: lineEnd.x - lineStart.x,
        y: lineEnd.y - lineStart.y,
        z: lineEnd.z - lineStart.z
    };
    const dotProduct = Object.keys(lineStart).reduce((acc, key) => acc + lineStart[key] * lineStart[key], 0);
    const magnitude = Math.sqrt(dotProduct);
    const unitVector = Object.keys(newVector).reduce((acc, key) => {
        acc[key] = newVector[key] / magnitude;
        return acc;
    }, {});
    return unitVector;
}