function sweep(listOfExistingFunctions, arguments, specification, code, errorLogs) {
}
function createPoint(x, y, z) {
    return {
        x: x,
        y: y,
        z: z
    };
}
function addVectorAndPoint(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}
function addVectors(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}
function subtractVectorAndPoint(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    };
}
function subtractVectors(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    };
}
function scaleVector(a, s) {
    return {
        x: a.x * s,
        y: a.y * s,
        z: a.z * s
    };
}
function midPoint(point1, point2) {
    return addVectors(point1, scaleVector(subtractVectors(point2, point1), 0.5));
}
function rotateVector(vector, angle, x, y, z) {
    var x1 = vector.x;
    var y1 = vector.y;
    var z1 = vector.z;
    var rads = angle * Math.PI / 180;
    var x2 = x;
    var y2 = y;
    var z2 = z;
    var length = Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2);
    var u = x2 / length;
    var v = y2 / length;
    var w = z2 / length;
    var cos = Math.cos(rads);
    var sin = Math.sin(rads);
    var x3 = x1;
    var y3 = y1;
    var z3 = z1;
    var dotProduct = x1 * u + y1 * v + z1 * w;
    var f_omega = (w * (v * x1 - u * y1) - u * (v * z1 - w * y1) + v * (u * z1 - w * x1)) / (length * length);
    x3 = cos * x1 + sin * f_omega;
    y3 = cos * y1 + sin * -1 * (w * x1 - u * z1 + v * (v * x1 - u * y1)) / (length * length);
    z3 = cos * z1 + sin * -1 * (u * y1 - v * x1 + w * (u * z1 - w * y1)) / (length * length);
    return createPoint(x3, y3, z3);
}