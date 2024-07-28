function Shell(faces) {
  this._faces = Array.isArray(faces) ? faces : [faces];
}

Shell.prototype.getFaces = function() {
  return this._faces;
};

Shell.prototype.setFaces = function(newFaces) {
  this._faces = newFaces instanceof Array ? newFaces : [newFaces];
};

Shell.prototype.clone = Shell.prototype.cloneCurve = function() {
  return new Shell(this._faces);
};