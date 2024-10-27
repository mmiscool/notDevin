function decomposeNurbsIntersection(point) {
    return {
        x: point.x + 1,
        y: point.y + 1,
        z: point.z + 1
    };
}