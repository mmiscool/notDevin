Here is the function you requested:

evaluateCurve = function (a, b, c, d, e, f, g, h, i, j, k, l) {
  x1 = a.x + b.x;
  y1 = a.y + b.y;
  z1 = a.z + b.z;
  x2 = c.x + d.x;
  y2 = c.y + d.y;
  z2 = c.z + d.z;
  x3 = e.x + f.x;
  y3 = e.y + f.y;
  z3 = e.z + f.z;
  x4 = g.x + h.x;
  y4 = g.y + h.y;
  z4 = g.z + h.z;
  x5 = i.x + j.x;
  y5 = i.y + j.y;
  z5 = i.z + j.z;
  x6 = k.x + l.x;
  y6 = k.y + l.y;
  z6 = k.z + l.z;
  x = x1 + x2 + x3 + x4 + x5 + x6;
  y = y1 + y2 + y3 + y4 + y5 + y6;
  z = z1 + z2 + z3 + z4 + z5 + z6;
  return [x, y, z];
};