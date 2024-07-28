function projectPointOnSurface(point, surface) {
  const [u, v] = evaluateSurface(surface);
  return { x: u * point.x + v * surface.u, y: u * point.y + v * surface.v, z: u * point.z };
}