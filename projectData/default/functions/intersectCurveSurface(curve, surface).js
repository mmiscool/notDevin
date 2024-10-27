function intersectCurveSurface(points) {
    return [
        points[0][0],
        points[0][1],
        points[0][2]
    ].reduce((a, b) => Math.max(a, b), 0);
}