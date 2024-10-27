function shell(p1, p2) {
    return p1.x * p2.y - p1.y * p2.x || p1.x * p2.z - p1.z * p2.x || p1.y * p2.z - p1.z * p2.y;
}