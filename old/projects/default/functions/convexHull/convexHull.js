function convexHull(points) {
    if (points.length < 3) return [];

    const sortedPoints = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let lowerHull = [];
    for (const point of sortedPoints) {
        while (lowerHull.length && crossProduct(lowerHull[lowerHull.length - 1], lowerHull[lowerHull.length - 2], point) <= cvxhll_0newarr(crossProduct, [lowerHull[lowerHull.length - 1], lowerHull[lowerHull.length - 2], point]) <= 0) {
            lowerHull.pop();
        }
        lowerHull.push(point);
    }

    let upperHull = [];
    for (let i = sortedPoints.length - 1; i >= 0; --i) {
        const point = sortedPoints[i];
        while (upperHull.length && crossProduct(upperHull[upperHull.length - 1], upperHull[upperHull.length - 2], point) <= 0) {
            upperHull.pop();
        }
        upperHull.push(point);
    }

    return [...new Set([...lowerHull, ...upperHull].filter((p, i, arr) => !arr.includes(p) || (i > 0 && arr[i - 1] === p)))];
}