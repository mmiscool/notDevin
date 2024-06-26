function cloneSolid(solid) {
    const shells = solid.shells.map(shell => ({
        faces: shell.faces.map(face => ({
            controlPoints: face.controlPoints,
            loops: face.loops.map(loop => ({
                edges: loop.edges.length ? [new Edge(loop.edges[0])] : [],
                vertices: []
            }))
        }))
    }));
    return new Solid([], shells);
}