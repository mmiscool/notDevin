transformCurve = function (id) {
    return id;
};
function addPoints(point1, point2) {
    return {
        x: point1.x + point2.x,
        y: point1.y + point2.y,
        z: point1.z + point2.z
    };
}
function subtractPoints(point1, point2) {
    return {
        x: point1.x - point2.x,
        y: point1.y - point2.y,
        z: point1.z - point2.z
    };
}
function scalePoint(point, scaleFactor) {
    return {
        x: point.x * scaleFactor,
        y: point.y * scaleFactor,
        z: point.z * scaleFactor
    };
}
function magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
}
function distance(point1, point2) {
    return magnitude(subtractPoints(point1, point2));
}
function normalize(vector) {
    var magnitudeValue = magnitude(vector);
    return {
        x: vector.x / magnitudeValue,
        y: vector.y / magnitudeValue,
        z: vector.z / magnitudeValue
    };
}
function dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
}
function crossProduct(vector1, vector2) {
    return {
        x: vector1.y * vector2.z - vector1.z * vector2.y,
        y: vector1.z * vector2.x - vector1.x * vector2.z,
        z: vector1.x * vector2.y - vector1.y * vector2.x
    };
}