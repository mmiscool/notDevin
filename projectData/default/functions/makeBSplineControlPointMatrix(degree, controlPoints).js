{_id} = function(x, y, z) {
    var dx = x[0];
    var dy = y[0];
    var dz = z[0];
    return {dx: dx + dx, dy: dy + dy, dz: dz + dz};
};