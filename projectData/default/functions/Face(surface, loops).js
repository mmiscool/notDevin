function Face(surface, loops) {
  const vertices = [];
  for (let i = 0; i < loops.length; i++) {
    const edge = {v1: loops[i].vertex1, v2: loops[i].vertex2};
    for (const edge2 of surface.edges) {
      if ((edge.v1.x === edge2.v1.x && edge.v1.y === edge2.v1.y && edge.v1.z === edge2.v1.z &&
           edge.v2.x === edge2.v2.x && edge.v2.y === edge2.v2.y && edge.v2.z === edge2.v2.z) ||
          (edge.v1.x === edge2.v2.x && edge.v1.y === edge2.v2.y && edge.v1.z === edge2.v2.z &&
           edge.v2.x === edge2.v1.x && edge.v2.y === edge2.v1.y && edge.v2.z === edge2.v1.z)) {
        const intersection = {x: (edge.v1.x + edge.v2.x) / 2, y: (edge.v1.y + edge.v2.y) / 2, z: (edge.v1.z + edge.v2.z) / 2};
        vertices.push(intersection);
      }
    }
  }
  surface.shells[0].faces.push({vertices});
}