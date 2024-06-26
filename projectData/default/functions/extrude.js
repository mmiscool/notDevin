function extrude(profile, direction, distance) {
  let curve = [];
  for (let i = 0; i < profile.length; i++) {
    curve.push([profile[i].x, profile[i].y, profile[i].z]);
  }
  let shell = [];
  let translationVector = [direction.x, direction.y, direction.z];
  
  for (let t = 0; t <= distance; t++) {
    let point = [];
    for (let i = 0; i < curve.length; i++) {
      point.push(curve[i][0] + translationVector[0], 
                 curve[i][1] + translationVector[1], 
                 curve[i][2] + translationVector[2]);
    }
    shell.push(point);
  }
  
  return [curve, shell];
}