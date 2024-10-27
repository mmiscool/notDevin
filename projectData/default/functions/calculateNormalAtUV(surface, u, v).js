function calculateNormalAtUV(surface, u, v) {
    var delta = 0.0001;
    var p1 = evaluateSurfaceAtParam(surface, u, v);
    var p2 = evaluateSurfaceAtParam(surface, u + delta, v);
    var p3 = evaluateSurfaceAtParam(surface, u, v + delta);
    var tangent1 = {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
        z: p2.z - p1.z
    };
    var tangent2 = {
        x: p3.x - p1.x,
        y: p3.y - p1.y,
        z: p3.z - p1.z
    };
    var normal = {
        x: tangent1.y * tangent2.z - tangent1.z * tangent2.y,
        y: tangent1.z * tangent2.x - tangent1.x * tangent2.z,
        z: tangent1.x * tangent2.y - tangent1.y * tangent2.x
    };
    var length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
    return {
        x: normal.x / length,
        y: normal.y / length,
        z: normal.z / length
    };
}