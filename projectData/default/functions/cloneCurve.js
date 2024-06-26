function cloneCurve(curve) {
    const clonedPoints = curve.points.map(point => ({ x: point.x, y: point.y, z: point.z }));
    return { points: clonedPoints };
}