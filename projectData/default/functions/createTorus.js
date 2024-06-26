function createTorus(majorRadius, minorRadius) {
    const profilePoints = [];
    for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 150) {
        let phi = Math.acos(Math.cos(theta) - 0.5);
        let x = majorRadius + minorRadius * Math.sin(phi);
        let y = minorRadius * Math.cos(phi);
        profilePoints.push({x, y});
    }
    const surface = [];
    for (let i = 0; i < profilePoints.length; i++) {
        surface.push([profilePoints[i], profilePoints[(i + 1) % profilePoints.length]]);
    }
    return {surface};
}