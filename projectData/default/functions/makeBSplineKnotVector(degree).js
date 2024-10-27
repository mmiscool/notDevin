_hereIsYourFunctionName_

function (_id, points) {
    var max = Math.max;
    return points.map(function (point) {
        var total = 0;
        for (var i = 0; i < point.length; i++) {
            total += max.apply(null, point.map(function (p) { return Math.abs(p); }));
        }
        return total;
    });
}