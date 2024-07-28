function union(solid1, solid2) {
    const resultShells = [];
    function isVertexInLoop(loop, vertex) {
        return loop.edges.some(edge => edge.vertex1 === vertex || edge.vertex2 === vertex);
    }
    const resultShellsSet = new Set();
    for (const face of solid1.shells) {
        if (!resultShellsSet.has(face)) {
            addShell(new Solid(), face);
            resultShellsSet.add(face);
        }
    }
    for (const face of solid2.shells) {
        if (!resultShellsSet.has(face)) {
            addShell(new Solid(), face);
            resultShellsSet.add(face);
        }
    }
    return new Solid(resultShells);
}