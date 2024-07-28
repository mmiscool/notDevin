function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector.prototype.add = function(vector2) {
    return new Vector(this.x + vector2.x, this.y + vector2.y, this.z + vector2.z);
};

Vector.prototype.subtract = function(vector2) {
    return new Vector(this.x - vector2.x, this.y - vector2.y, this.z - vector2.z);
};