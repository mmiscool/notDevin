function fillet(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var angle = Math.atan2(dy, dx);
    var dist = Math.sqrt(dx * dx + dy * dy);
    return [
        Math.cos(angle + Math.PI / 2) * dist,
        Math.sin(angle + Math.PI / 2) * dist,
        0
    ];
}