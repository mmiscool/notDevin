function addShell(solid, shell) {
    var newSolid = {x: solid.x, y: solid.y, z: solid.z, shells: [...solid.shells, shell]};
    return newSolid;
}