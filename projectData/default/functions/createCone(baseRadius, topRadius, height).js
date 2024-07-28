function createCone(baseRadius, topRadius, height) {
  const surface = [];
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j < 2; j++) {
      if (j === 0) {
        let z = baseRadius;
      } else {
        let z = height - topRadius * Math.sqrt(3) / 2;
      }
      surface.push([i, j, z]);
    }
  }
  const solid = [];
  solid.push({faces: [[{x: 0, y: 0}, {x: 1, y: 0}, {x: 0.5, y: Math.sqrt(3) / 2}]], shell: 0});
  return [surface, solid];
}