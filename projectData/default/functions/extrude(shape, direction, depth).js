extrude = function (x1, y1, x2, y2, x3, y3, x4, y4, point) {
    let a = (x1 * (y2 - y4) - y1 * (x2 - x4) + x2 * y4 - x4 * y2) % 1000000007;
    let b = (x3 * (y1 - y2) - y3 * (x1 - x2) + x1 * y2 - x2 * y1) % 1000000007;
    let c = (y3 - y4) * (x1 - x2) - (y1 - y2) * (x3 - x4);
    let d = a - b;
    return (((((d * c) % 1000000007) * c) % 1000000007) * d) % 1000000007 + a % 1000000007;