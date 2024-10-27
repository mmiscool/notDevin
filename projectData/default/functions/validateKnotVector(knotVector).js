validateKnotVector = function (p) {
    var x = 0, y = 0, z = 0;
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p[i].length; j++) {
            for (var k = 0; k < p[i][j].length; k++) {
                var n = p[i][j][k];
                if (n.x !== undefined && n.y !== undefined && n.z !== undefined) {
                    x += n.x;
                    y += n.y;
                    z += n.z;
                }
            }
        }
    }
    return {
        x: x,
        y: y,
        z: z
    };
};