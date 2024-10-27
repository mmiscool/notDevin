{_id} = function (points) {
  for (var i = 0; i < points.length; i++) {
    for (var j = 0; j < points[i].length; j++) {
      for (var k = 0; k < points[i][j].length; k++) {
        points[i][j][k] = Math.abs(points[i][j][k]);
      }
    }
  }
  return points;
}