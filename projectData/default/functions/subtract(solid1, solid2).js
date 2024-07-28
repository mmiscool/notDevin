function subtract(solid1, solid2) {
    let shellDifference = new Shell();
    
    const clonedSolid1 = cloneSolid(solid1);
    const clonedSolid2 = cloneSolid(solid2);
    
    for (const shell2 of Solids.getShells(clonedSolid2)) {
        let loopDifference;
        
        for (const loop2 of Solids.getLoops(shell2)) {
            let faceDifference = new Face();
            
            for (const face2 of Solids.getFaces(loop2)) {
                let edgeDifference = [];
                
                const edges2 = Solids.getEdges(face2);
                for (const edge2 of edges2) {
                    if (!Solid.hasEdge(edgeDifference, edge2)) {
                        let vertexDifference;
                        
                        const vertices2 = Solids.getVertices(edge2);
                        for (const vertex2 of vertices2) {
                            if (!Solid.hasVertex(vertexDifference, vertex2)) {
                                let pointDifference;
                                
                                const points1 = Solids.getPoints(clonedSolid1);
                                if (!points1.some(point => Vector.equals(vertex2, point))) {
                                    pointDifference = new Point(vertex2.x, vertex2.y, vertex2.z);
                                } else {
                                    let existingPoint;
                                    for (const point of points1) {
                                        if (Vector.equals(vertex2, point)) {
                                            existingPoint = point;
                                            break;
                                        }
                                    }
                                    
                                    if (!existingPoint) continue;
                                    
                                    pointDifference = subtractVectors(point, existingPoint);
                                }
                                
                                edgeDifference.push(pointDifference);
                            }
                        }
                        
                        faceDifference.addEdge(edgeDifference);
                    }
                }
                
                loopDifference = subtractLoops(loop2, loopDifference);
            }
            
            shellDifference.addLoop(loopDifference);
        }
        
        addShell(shellDifference, clonedSolid1);
    }
    
    return subtractSolids(clonedSolid1, solid2);
}