{(function (_id){ 
  function validateBSplineKnotVector(points){ 
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for( let i = 0; i < points.length; i++){
      let point = points[i];
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
      minZ = Math.min(minZ, point.z);
      maxZ = Math.max(maxZ, point.z);
    }
    return {x:[minX, maxX], y:[minY, maxY], z:[minZ, maxZ]};
}})="_id")