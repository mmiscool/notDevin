function deriveFunction(func) {
    return function (point) {
        var h = 0.000001;
        return {
            x: (func({
                x: point.x + h,
                y: point.y,
                z: point.z
            }) - func(point)) / h,
            y: (func({
                x: point.x,
                y: point.y + h,
                z: point.z
            }) - func(point)) / h,
            z: (func({
                x: point.x,
                y: point.y,
                z: point.z + h
            }) - func(point)) / h
        };
    };
}