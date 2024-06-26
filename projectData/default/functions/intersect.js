function intersect(solid1, solid2) {
    let intersections = [];
    for (let i = 0; i < solid1.shells.length; i++) {
        for (let j = 0; j < solid2.shells.length; j++) {
            let currentShell1 = solid1.shells[i];
            let currentShell2 = solid2.shells[j];
            for (let k = 0; k < currentShell1.faces.length; k++) {
                let face1 = currentShell1.faces[k];
                for (let l = 0; l < currentShell2.faces.length; l++) {
                    let face2 = currentShell2.faces[l];
                    if (face1.isCoplanarWith(face2) && findIntersection(face1, face2).points.length > 0) {
                        let intersectionPoints = findIntersection(face1, face2);
                        intersections.push({ points: intersectionPoints });
                    }
                }
            }
        }
    }
    return intersections;
}