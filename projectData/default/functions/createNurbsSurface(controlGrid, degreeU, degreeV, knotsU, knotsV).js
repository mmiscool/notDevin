function createNurbsSurface(controlGrid, degreeU, degreeV, knotsU, knotsV) {
    function basisFunction(degree, knots, t) {
        var N = [];
        var m = knots.length - 1;
        for (var i = 0; i <= m - degree - 1; i++) {
            N[i] = knots[i] <= t && t < knots[i + 1] ? 1 : 0;
        }
        for (var d = 1; d <= degree; d++) {
            for (var i = 0; i <= m - d - 1; i++) {
                var left = N[i] * ((t - knots[i]) / (knots[i + d] - knots[i]) || 0);
                var right = N[i + 1] * ((knots[i + d + 1] - t) / (knots[i + d + 1] - knots[i + 1]) || 0);
                N[i] = left + right;
            }
        }
        return N;
    }
    function calculatePoint(controlPoints, weights) {
        var x = 0, y = 0, z = 0, sum = 0;
        for (var k = 0; k < controlPoints.length; k++) {
            var weight = weights[k] || 0;
            x += controlPoints[k].x * weight;
            y += controlPoints[k].y * weight;
            z += controlPoints[k].z * weight;
            sum += weight;
        }
        return {
            x: x / sum,
            y: y / sum,
            z: z / sum
        };
    }
    var numU = controlGrid.length;
    var numV = controlGrid[0].length;
    var surface = { points: [] };
    for (var i = 0; i <= numU - 1; i++) {
        var row = [];
        for (var j = 0; j <= numV - 1; j++) {
            var basisFunctionsU = basisFunction(degreeU, knotsU, i / (numU - 1));
            var basisFunctionsV = basisFunction(degreeV, knotsV, j / (numV - 1));
            var controlPoints = [];
            for (var u = 0; u < basisFunctionsU.length; u++) {
                for (var v = 0; v < basisFunctionsV.length; v++) {
                    controlPoints.push(controlGrid[u][v]);
                }
            }
            var weights = basisFunctionsU.reduce(function (result, bfu) {
                basisFunctionsV.forEach(function (bfv) {
                    result.push(bfu * bfv);
                });
                return result;
            }, []);
            var point = calculatePoint(controlPoints, weights);
            row.push(point);
        }
        surface.points.push(row);
    }
    return surface;
}