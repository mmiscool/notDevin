function convertNurbsToMesh(pointA, pointB) {
    return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2) + Math.pow(pointB.z - pointA.z, 2));
}