function createPolygon(points) {
    const id = `polygon-${Date.now()}`;
    if (points.length !== 3) throw new Error("Points array must contain exactly three elements.");
    const pointsObject = {};
    pointsObject.id = id;
    pointsObject.points = points;
    pointsObject.centerPoint = function() {
        let xSum = 0, ySum = 0;
        for (let i = 0; i < this.points.length; i++) {
            xSum += this.points[i].x || 0;
            ySum += this.points[i].y || 0;
        }
        return {x: xSum / this.points.length, y: ySum / this.points.length};
    };
    
    return pointsObject;
}