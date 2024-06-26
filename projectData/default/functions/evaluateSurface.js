function evaluateSurface(surface, u, v) {
    const controlPoints = surface.controlPoints;
    
    if (u === 0 && v === 0) return new Point();
    
    const uVector = [];
    for (let i = 0; i < controlPoints.length - 1; i++) {
        uVector.push([controlPoints[i][0] - controlPoints[i + 1][0], controlPoints[i][1] - controlPoints[i + 1][1], controlPoints[i][2] - controlPoints[i + 1][2]]);
    }
    
    const point = new Point();
    for (let i = 0; i < surface.loops.length; i++) {
        let localU = 0;
        let localV = 0;
        for (let j = 0; j < surface.loops[i].length - 1; j++) {
            localU += surface.loops[i][j][0] * uVector[j][0];
            localV += surface.loops[i][j][0] * (evaluateCurve(surface.loops[i], v)[0] - surface.loops[i][j][0]) + surface.loops[i][j][1] * (evaluateCurve(surface.loops[i], v)[1] - surface.loops[i][j][1]);
        }
        
        point = new Point(localU, localV, 0);
    }
    
    let cv = [0, 0, 0];
    for (let i = 0; i < uVector.length - 1; i++) {
        cv[0] += (uVector[i][1] * localV - uVector[i][2] * (evaluateCurve(surface.loops[0], v)[1] - surface.loops[0][i][1]) + uVector[i][2] * (evaluateCurve(surface.loops[0], v)[2] - surface.loops[0][i][2])) / localU;
        cv[1] += (uVector[i][2] * localV - uVector[i][0] * (evaluateCurve(surface.loops[0], v)[2] - surface.loops[0][i][2]) + uVector[i][0] * (evaluateCurve(surface.loops[0], v)[0] - surface.loops[0][i][0])) / localU;
        cv[2] += (uVector[i][0] * localV - uVector[i][1] * (evaluateCurve(surface.loops[0], v)[0] - surface.loops[0][i][0]) + uVector[i][1] * (evaluateCurve(surface.loops[0], v)[1] - surface.loops[0][i][1])) / localU;
    }
    
    return point.add(new Point(cv[0], cv[1], cv[2])).scale(localU);
}