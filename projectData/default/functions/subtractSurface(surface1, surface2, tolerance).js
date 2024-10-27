function subtractSurface(listOfExistingFunctions, arguments, specification, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    var n, dotproduct, aDotProduct, determinant;
    var i1 = [
            y1 - y3,
            y2 - y3
        ], j1 = [
            x3 - x1,
            x3 - x2
        ];
    var i2 = [
            z1 - z3,
            z2 - z3
        ], k1 = [
            x3 - x1,
            z2 - z3
        ];
    var i3 = {
        x: j1[0] * i2[1] - i2[0] * j1[1],
        y: i1[0] * i2[1] - i2[0] * i1[1],
        z: i1[0] * j1[1] - j1[0] * i1[1]
    };
    var np = calculateNormalVector(listOfExistingFunctions);
    n = np;
    if (!n)
        return null;
    dotproduct = np.x * arguments[0] + np.y * arguments[1] + np.z * arguments[2];
    aDotProduct = arguments[0] * np.x + arguments[1] * np.y + arguments[2] * np.z;
    det = Dot(i1, k1) * i3.x - Dot(i2, k1) * i3.y + Dot(i1, j1) * i3.x - i3.z * Dot(i1, j1);
    function Dot(i, j) {
        return i[0] * j[1] - i[1] * j[0];
    }
    function Dot(i, j, k) {
        return i * j + j * k + k * i;
    }
    function calculateNormalVector(list) {
        for (var func of list) {
            if (func()) {
                return func();
            }
        }
        return null;
    }
    function crossProduct(xa, xb, xp) {
        return {
            x: ya * zp - za * yp,
            y: za * xp - xa * zp,
            z: xa * yp - ya * xp
        };
    }
    var v = new Array(np.x * i3.y - np.y * i3.x, np.y * i3.z - np.z * i3.y, np.z * i3.x - np.x * i3.z), r0 = new Array(np.x * dotproduct, np.y * dotproduct, np.z * dotproduct), r = i3;
    return determinant;
}