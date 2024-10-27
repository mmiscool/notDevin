function insertSurfaceKnot(surface, knotU, knotV, timesU, timesV) {
    const newKnotsU = recalculateKnots(surface.knotsU, knotU, timesU);
    const newKnotsV = recalculateKnots(surface.knotsV, knotV, timesV);
    let controlPoints = surface.controlPoints;
    for (let i = 0; i < timesU; i++) {
        controlPoints = controlPoints.map(row => insertKnot(createNurbsCurve(row, surface.degreeU, surface.knotsU), knotU, 1).controlPoints);
    }
    for (let j = 0; j < timesV; j++) {
        const transposed = controlPoints[0].map((_, colIndex) => controlPoints.map(row => row[colIndex]));
        const newTransposed = transposed.map(row => insertKnot(createNurbsCurve(row, surface.degreeV, surface.knotsV), knotV, 1).controlPoints);
        controlPoints = newTransposed[0].map((_, colIndex) => newTransposed.map(row => row[colIndex]));
    }
    return createNurbsSurface(controlPoints, surface.degreeU, surface.degreeV, newKnotsU, newKnotsV);
}