function Curve(points) {
  this.points = points || [];
  this.getPoints = function() { return this.points; };
  this.setPoint = function(i, point) {
    if (i >= 0 && i < this.points.length) {
      this.points[i] = point;
    }
  };
}