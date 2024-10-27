Here's the new function definition based on your requirements:


function derivativeNurbsCurve(point1, point2, scale) {
    return {
        x: point1.x + (point2.x - point1.x) * scale,
        y: point1.y + (point2.y - point1.y) * scale,
        z: point1.z + (point2.z - point1.z) * scale
    };
}