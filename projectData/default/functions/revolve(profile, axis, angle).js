function revolve(profile, axis, angle) {
  let curve = Curve([profile]);
  let matrix = new Matrix();
  let rotatedProfile = [];
  for (let i = 0; i < profile.length; i++) {
    let vector = Vector.subtract(new Point(), profile[i]);
    rotatedProfile.push(Matrix.multiplyVector(matrix, vector));
  }
  let solid = Solid();
  for (let loop of curve.loops) {
    let shell = Shell();
    for (let face of loop.faces) {
      addFace(shell, new Face(rotatedProfile, face.controlPoints));
    }
    addShell(solid, shell);
  }
  return solid;
}