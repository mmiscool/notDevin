function getKnotVector(_id, p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var dz = p2.z - p1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}