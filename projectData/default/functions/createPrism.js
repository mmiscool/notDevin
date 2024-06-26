function createPrism(base, height) {
  const basePoint = {x:base.x, y:base.y, z:0};
  const topPoint = {x:base.x, y:base.y, z:height};
  const faceSurface = [{points:[basePoint, topPoint], curve:[1]}];
  const shell = [{surfaces:faceSurface, curves:[]}];
  const solid = [{shell:shell}];
  extrude({profile:faceSurface[0]}, {axis: 'z'}, height);
  return solid[0];
}