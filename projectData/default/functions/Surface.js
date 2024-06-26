function Surface(controlPoints) {
    this.controlPoints = controlPoints;
}

Surface.prototype.getCurve = function() {
    let curve = [];
    for (let i = 0; i < this.controlPoints.length - 1; i++) {
        curve.push({x: this.controlPoints[i].x, y: this.controlPoints[i].y, z: this.controlPoints[i].z});
        curve.push({x: this.controlPoints[i].x, y: this.controlPoints[i].y, z: this.controlPoints[i + 1].z});
    }
    return curve;
};