function evaluateCurve(vector1, vector2) {
    var dotProduct = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    var magnitude1 = Math.sqrt(Math.pow(vector1.x, 2) + Math.pow(vector1.y, 2) + Math.pow(vector1.z, 2));
    var magnitude2 = Math.sqrt(Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2) + Math.pow(vector2.z, 2));
    return Math.acos(dotProduct / (magnitude1 * magnitude2)) * 180 / Math.PI;
}
function _addVector(vector1, vector2) {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
        z: vector1.z + vector2.z
    };
}
function _subtractVector(vector1, vector2) {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
        z: vector1.z - vector2.z
    };
}
function _norm(vector) {
    var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
    return {
        x: vector.x / magnitude,
        y: vector.y / magnitude,
        z: vector.z / magnitude
    };
}
function _crossProduct(vector1, vector2) {
    return {
        x: vector1.y * vector2.z - vector1.z * vector2.y,
        y: vector1.z * vector2.x - vector1.x * vector2.z,
        z: vector1.x * vector2.y - vector1.y * vector2.x
    };
}
function _dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
}
function _getMagnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
}
function _scaleVector(vector, value) {
    return {
        x: vector.x * value,
        y: vector.y * value,
        z: vector.z * value
    };
}