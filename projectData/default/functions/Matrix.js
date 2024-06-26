function Matrix(elements) {
  this.elements = elements;
  this.times = function(other) {
    var result = [];
    for (var i = 0; i < elements.length; i++) {
      result[i] = [];
      for (var j = 0; j < other.elements[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < elements[0].length; k++) {
          sum += elements[i][k] * other.elements[k][j];
        }
        result[i].push(sum);
      }
    }
    return new Matrix(result);
  };
}