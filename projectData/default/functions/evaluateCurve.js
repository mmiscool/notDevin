function evaluateCurve(curve, t) {
    let currentPoint = curve.points[0];
    for (let i = 1; i < curve.points.length; i++) {
        const nextPoint = curve.points[i];
        if (t <= calculateDistanceBetweenPoints(currentPoint, nextPoint) / getCurveLength(curve)) {
            return createVectorFromPoints(currentPoint, nextPoint).scale((t / calculateDistanceBetweenPoints(currentPoint, nextPoint)) * getVectorDirection(currentPoint, nextPoint));
        }
    }
    currentPoint = curve.points[curve.points.length - 1];
    const remainingDistance = getCurveLength(curve) - calculateDistanceBetweenPoints(currentPoint, t);
    return createVectorFromPoints(currentPoint, interpolatePointOnCurve(t, currentPoint, curve.points[curve.points.length - 1])).scale((remainingDistance / getVectorDirection(currentPoint, curve.points[curve.points.length - 1])).magnitude()) * getVectorDirection(currentPoint, curve.points[curve.points.length - 1]);
}

function calculateDistanceBetweenPoints(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
}

function getCurveLength(curve) {
    let length = 0;
    for (let i = 1; i < curve.points.length; i++) {
        length += calculateDistanceBetweenPoints(curve.points[i - 1], curve.points[i]);
    }
    return length;
}

function createVectorFromPoints(p1, p2) {
    return { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
}

function getVectorDirection(p1, p2) {
    let vector = createVectorFromPoints(p1, p2);
    let magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
    return { x: vector.x / magnitude, y: vector.y / magnitude, z: vector.z / magnitude };
}

function interpolatePointOnCurve(t, p1, p2) {
    let ratio = t / calculateDistanceBetweenPoints(p1, p2);
    return { x: p1.x + (p2.x - p1.x) * ratio, y: p1.y + (p2.y - p1.y) * ratio, z: p1.z + (p2.z - p1.z) * ratio };
}