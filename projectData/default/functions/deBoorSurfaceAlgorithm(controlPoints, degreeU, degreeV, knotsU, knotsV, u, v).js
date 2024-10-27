function deBoorSurfaceAlgorithm(controlPoints, degreeU, degreeV, knotsU, knotsV, u, v) {
    function deBoor(ctrlPts, degree, knots, t) {
        const n = ctrlPts.length - 1;
        const d = degree;
        let k = findSpan(n, d, t, knots);
        let dPts = Array.from({ length: d + 1 }, (_, i) => ({
            x: ctrlPts[k - d + i].x,
            y: ctrlPts[k - d + i].y,
            z: ctrlPts[k - d + i].z
        }));
        for (let r = 1; r <= d; r++) {
            for (let i = d; i >= r; i--) {
                let alpha = (t - knots[k - d + i]) / (knots[k + i - r + 1] - knots[k - d + i]);
                dPts[i].x = (1 - alpha) * dPts[i - 1].x + alpha * dPts[i].x;
                dPts[i].y = (1 - alpha) * dPts[i - 1].y + alpha * dPts[i].y;
                dPts[i].z = (1 - alpha) * dPts[i - 1].z + alpha * dPts[i].z;
            }
        }
        return dPts[d];
    }
    function findSpan(n, degree, u, knots) {
        if (u >= knots[n + 1])
            return n;
        if (u <= knots[degree])
            return degree;
        let low = degree, high = n + 1, mid = Math.floor((low + high) / 2);
        while (u < knots[mid] || u >= knots[mid + 1]) {
            if (u < knots[mid])
                high = mid;
            else
                low = mid;
            mid = Math.floor((low + high) / 2);
        }
        return mid;
    }
    const nU = controlPoints.length;
    const nV = controlPoints[0].length;
    let tempPoints = [];
    for (let i = 0; i < nU; i++) {
        tempPoints.push(deBoor(controlPoints[i], degreeV, knotsV, v));
    }
    return deBoor(tempPoints, degreeU, knotsU, u);
}