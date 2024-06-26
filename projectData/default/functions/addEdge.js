function addEdge(solid, edge) {
  let newVertex1 = {x: edge.vertex1.x, y: edge.vertex1.y, z: edge.vertex1.z};
  let newVertex2 = {x: edge.vertex2.x, y: edge.vertex2.y, z: edge.vertex2.z};
  
  solid.vertices.push(newVertex1);
  solid.vertices.push(newVertex2);
}