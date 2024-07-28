function cloneSurface(surface) {
  let result = [];
  for (let i = 0; i < surface.length; i++) {
    let point = [];
    for (let j = 0; j < surface[i].length; j++) {
      point.push({x: surface[i][j].x, y: surface[i][j].y, z: surface[i][j].z});
    }
    result.push(point);
  }
  return {data: result};
}