function createNurbsSurface(point1, point2) {
  var dx = point2.x - point1.x;
  var dy = point2.y - point1.y;
  var dz = point2.z - point1.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
```