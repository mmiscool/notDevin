function createCylinder(radius, height) {
    const topBase = {
        x: 0,
        y: 0,
        z: height / 2
    };
    const bottomBase = {
        x: 0,
        y: 0,
        z: -height / 2
    };
    const baseProfile = [
        {
            x: radius,
            y: 0
        },
        {
            x: -radius,
            y: 0
        }
    ];
    const topProfile = [
        {
            x: radius,
            y: height
        },
        {
            x: -radius,
            y: height
        }
    ];
    return extrude(baseProfile, {
        x: 0,
        y: 1,
        z: 0
    }, height).union(revolve(topProfile, {
        x: 0,
        y: 1,
        z: 0
    }, Math.PI * 2));
}