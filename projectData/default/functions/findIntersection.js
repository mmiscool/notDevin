function findIntersection(edge1, edge2) {
    const v1 = subtractVectors(subtractVectors(edge1[1], edge1[0]), edge2[0]);
    const v2 = crossProduct(subtractVectors(edge2[1], edge1[0]), subtractVectors(edge2[0], edge1[0]));
    let d0 = dotProduct(v1, v2);

    if (Math.abs(d0) < Number.EPSILON) return null; // No intersection

    let s = -dotProduct(subtractVectors(edge1[0], edge2[0]), v2) / d0;
    let t = -dotProduct(subtractVectors(edge1[0], edge2[1]), v2) / d0;

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return Vertex.fromPoint(addVectors(edge1[0], multiplyVectorByScalar(v1, s)));
    } else {
        return null; // No intersection within bounds
    }
}