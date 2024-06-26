function union(solid1, solid2) {
    let shells = [];
    for (let i = 0; i < solid1.shells.length; i++) {
        shells.push(cloneShell(solid1.shells[i]));
    }
    shells = addShells(shells, cloneShellArray(solid2.shells));

    let faces = [];
    for (let i = 0; i < solid1.faces.length; i++) {
        faces.push(cloneFace(solid1.faces[i]));
    }
    for (let i = 0; i < solid2.faces.length; i++) {
        faces.push(cloneFace(solid2.faces[i]));
    }

    let loops = [];
    for (let i = 0; i < solid1.loops.length; i++) {
        loops.push(cloneLoop(solid1.loops[i]));
    }
    for (let i = 0; i < solid2.loops.length; i++) {
        loops.push(cloneLoop(solid2.loops[i]));
    }

    let edges = [];
    for (let i = 0; i < solid1.edges.length; i++) {
        edges.push(cloneEdge(solid1.edges[i], solid2.vertices));
    }
    for (let i = 0; i < solid2.edges.length; i++) {
        edges.push(cloneEdge(solid2.edges[i], solid1.vertices, solid2.vertices));
    }

    let unionSolid = new Solid();
    unionSolid.shells = shells;
    unionSolid.faces = faces;
    unionSolid.loops = loops;
    unionSolid.edges = edges;
    unionSolid.vertices = solid1.vertices.concat(solid2.vertices);

    return unionSolid;
}

function cloneShell(shell) {
    let newShell = new Shell();
    newShell.faces = shell.faces.map(cloneFace);
    return newShell;
}

function addShells(shells, shellArray) {
    for (let shell of shellArray) {
        if (!shells.some(s => s.isSame(shell))) {
            shells.push(shell);
        }
    }
    return shells;
}

function cloneShellArray(shellArray) {
    return shellArray.map(cloneShell);
}

function cloneFace(face) {
    let newFace = new Face();
    newFace.loops = face.loops.map(loop => ({ ...loop }));
    return newFace;
}

function cloneLoop(loop) {
    let newLoop = new Loop();
    newLoop.edges = loop.edges.map(edge => ({ ...edge }));
    return newLoop;
}

function cloneEdge(edge, vertices1, vertices2 = []) {
    let vertices = vertices1.concat(vertices2);
    let newEdge = new Edge();
    newEdge.vertices = edge.vertices.map(v => ({ ...v }));
    return newEdge;
}