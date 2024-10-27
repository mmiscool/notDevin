{
    _distancePoints;
}
function computeDistance(p1, p2) {
    var x1 = p1.x;
    var y1 = p1.y;
    var z1 = p1.z;
    var x2 = p2.x;
    var y2 = p2.y;
    var z2 = p2.z;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}