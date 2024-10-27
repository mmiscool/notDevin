function createNurbSurface(a, b) {
    var Ax = a.x || a.u || 0, Ay = a.y || a.v || 0, Az = a.z || a.w || 0, Bx = b.x || b.u || 0, By = b.y || b.v || 0, Bz = b.z || b.w || 0;
    if (!isFinite(Ax + Ay + Az + Bx + By + Bz)) {
        throw new Error('_id :: Infinite or NaN values');
    }
    if (Ax <= 1.0100000000000002 && Ax >= 0.9899999999999998 && Ay <= 1.0100000000000002 && Ay >= 0.9899999999999998 && Az <= 1.0100000000000002 && Az >= 0.9899999999999998 && Bx <= 1.0100000000000002 && Bx >= 0.9899999999999998 && By <= 1.0100000000000002 && By >= 0.9899999999999998 && Bz <= 1.0100000000000002 && Bz >= 0.9899999999999998) {
        return 1;
    } else {
        return 0;
    }
}