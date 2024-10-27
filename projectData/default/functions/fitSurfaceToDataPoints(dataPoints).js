function fitSurfaceToDataPoints(dataPoints) {
    function calculateBoundingBox(points) {
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (p.x < minX)
                minX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.z < minZ)
                minZ = p.z;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y > maxY)
                maxY = p.y;
            if (p.z > maxZ)
                maxZ = p.z;
        }
        return {
            minX,
            minY,
            minZ,
            maxX,
            maxY,
            maxZ
        };
    }
    function mapToGrid(points, gridRows, gridCols, boundingBox) {
        const grid = new Array(gridRows).fill(0).map(() => new Array(gridCols).fill(0));
        points.forEach(p => {
            const u = Math.floor((p.x - boundingBox.minX) / (boundingBox.maxX - boundingBox.minX) * (gridCols - 1));
            const v = Math.floor((p.y - boundingBox.minY) / (boundingBox.maxY - boundingBox.minY) * (gridRows - 1));
            grid[v][u] = p;
        });
        for (let i = 0; i < gridRows; i++) {
            for (let j = 0; j < gridCols; j++) {
                if (!grid[i][j]) {
                    const z = boundingBox.minZ;
                    grid[i][j] = {
                        x: boundingBox.minX + j * (boundingBox.maxX - boundingBox.minX) / (gridCols - 1),
                        y: boundingBox.minY + i * (boundingBox.maxY - boundingBox.minY) / (gridRows - 1),
                        z
                    };
                }
            }
        }
        return grid;
    }
    const boundingBox = calculateBoundingBox(dataPoints);
    const gridRows = 4, gridCols = 4;
    const controlGrid = mapToGrid(dataPoints, gridRows, gridCols, boundingBox);
    const degreeU = 3;
    const degreeV = 3;
    const knotsU = [
        0,
        0,
        0,
        1,
        1,
        1
    ];
    const knotsV = [
        0,
        0,
        0,
        1,
        1,
        1
    ];
    return createNurbsSurface(controlGrid, degreeU, degreeV, knotsU, knotsV);
}