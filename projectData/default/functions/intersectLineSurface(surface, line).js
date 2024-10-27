function intersectLineSurface() {
    return {
        distBetweenPoints: function (p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
        },
        distPointLine: function (p, l1, l2) {
            var distLP = Math.sqrt(Math.pow(l2.x - l1.x, 2) + Math.pow(l2.y - l1.y, 2) + Math.pow(l2.z - l1.z, 2));
            var distTOL = Math.abs((l2.y - l1.y) * (l1.x - p.x) + (l1.y - p.y) * (l2.x - l1.x)) / distLP;
            return distTOL;
        },
        distPointPlane: function (p, n, ref) {
            var d = -(n.x * ref.x + n.y * ref.y + n.z * ref.z);
            var dist = (n.x * p.x + n.y * p.y + n.z * p.z + d) / Math.sqrt(Math.pow(n.x, 2) + Math.pow(n.y, 2) + Math.pow(n.z, 2));
            return dist;
        },
        closestPointLine: function (p, l1, l2) {
            var t = ((p.x - l1.x) * (l2.x - l1.x) + (p.y - l1.y) * (l2.y - l1.y) + (p.z - l1.z) * (l2.z - l1.z)) / (Math.pow(l2.x - l1.x, 2) + Math.pow(l2.y - l1.y, 2) + Math.pow(l2.z - l1.z, 2));
            return {
                x: l1.x + t * (l2.x - l1.x),
                y: l1.y + t * (l2.y - l1.y),
                z: l1.z + t * (l2.z - l1.z)
            };
        }
    };
}