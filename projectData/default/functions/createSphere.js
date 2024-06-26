function createSphere(radius) {
    const controlPoints = [{x:-radius, y:-radius*Math.sqrt(3)/2, z:0},{x:radius, y:-radius*Math.sqrt(3)/2, z:0},{x:0, y:radius*Math.sqrt(3)/2, z:0}];
    const surface = {controlPoints};
    return {type:"Solid", contents:[{type:"Shell", contents:[{type:"Loop", edges:[]}, {type:"Face4", vertices:controlPoints}]}]};
}