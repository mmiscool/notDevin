function addVertex(solid, vertex) {
    solid.shell.push({});
    var lastShell = solid.shell[solid.shell.length - 1];
    if (!lastShell.faces) {
        lastShell.faces = [];
    }
    lastShell.faces.push({ vertices: [vertex] });
}