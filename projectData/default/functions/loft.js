function loft(profiles) {
    let shells = [];
    for (let i = 0; i < profiles.length - 1; i++) {
        let curveFrom = [profiles[i], projToProfileAxis(profiles[i + 1], profiles[i])];
        let curveTo = evaluateCurve(curveFrom, t);
        
        let surface = {controlPoints: [], loops: [{vertices: [addVertex(shells[0], curveFrom), addVertex(shells[0], curveTo)]}]};;
        
        shells.push(createShell(surface));
    }
    
    return {type: "Solid", shells: shells};
}