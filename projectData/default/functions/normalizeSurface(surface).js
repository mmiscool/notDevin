function normalizeSurface(vector) {
    var magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    return {
        x: vector.x / magnitude,
        y: vector.y / magnitude,
        z: vector.z / magnitude
    };
}