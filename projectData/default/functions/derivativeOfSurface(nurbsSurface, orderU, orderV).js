function derivativeOfSurface(nurbsSurface, orderU, orderV) {
    const du = nurbsSurface.degreeU >= orderU ? orderU : nurbsSurface.degreeU;
    const dv = nurbsSurface.degreeV >= orderV ? orderV : nurbsSurface.degreeV;
    const controlPointsU = nurbsSurface.controlPoints.length;
    const controlPointsV = nurbsSurface.controlPoints[0].length;
    const newControlPoints = [];
    for (let i = 0; i < controlPointsU - du; i++) {
        const row = [];
        for (let j = 0; j < controlPointsV - dv; j++) {
            const pointU = {
                x: (nurbsSurface.controlPoints[i + 1][j].x - nurbsSurface.controlPoints[i][j].x) * nurbsSurface.degreeU,
                y: (nurbsSurface.controlPoints[i + 1][j].y - nurbsSurface.controlPoints[i][j].y) * nurbsSurface.degreeU,
                z: (nurbsSurface.controlPoints[i + 1][j].z - nurbsSurface.controlPoints[i][j].z) * nurbsSurface.degreeU
            };
            const pointV = {
                x: (nurbsSurface.controlPoints[i][j + 1].x - nurbsSurface.controlPoints[i][j].x) * nurbsSurface.degreeV,
                y: (nurbsSurface.controlPoints[i][j + 1].y - nurbsSurface.controlPoints[i][j].y) * nurbsSurface.degreeV,
                z: (nurbsSurface.controlPoints[i][j + 1].z - nurbsSurface.controlPoints[i][j].z) * nurbsSurface.degreeV
            };
            row.push({
                x: pointU.x + pointV.x,
                y: pointU.y + pointV.y,
                z: pointU.z + pointV.z
            });
        }
        newControlPoints.push(row);
    }
    const derivativeSurface = {
        controlPoints: newControlPoints,
        degreeU: Math.max(0, nurbsSurface.degreeU - du),
        degreeV: Math.max(0, nurbsSurface.degreeV - dv),
        knotsU: nurbsSurface.knotsU.slice(0, nurbsSurface.knotsU.length - du),
        knotsV: nurbsSurface.knotsV.slice(0, nurbsSurface.knotsV.length - dv)
    };
    return derivativeSurface;
}