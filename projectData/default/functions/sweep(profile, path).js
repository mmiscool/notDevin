function sweep(profile, path) {
    const curve = evaluateCurve(path);
    let solid = null;

    for (let t of curve.getPoints()) {
        const edge = new Edge(t.previousPoint, t.point);
        if (!solid) {
            solid = new Solid();
        }
        addFace(solid, profile, edge);
        addShell(solid, profile, edge);
    }
}