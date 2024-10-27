{_id}: function(point1, point2) {
  let { x: x1, y: y1, z: z1 } = point1;
  let { x: x2, y: y2, y: z2 } = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}