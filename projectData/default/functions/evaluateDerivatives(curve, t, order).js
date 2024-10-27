evaluateDerivatives = function (p, q, r) {
    const x = (q.y - p.y) * (r.z - p.z) - (q.z - p.z) * (r.y - p.y);
    const y = (q.z - p.z) * (r.x - p.x) - (q.x - p.x) * (r.z - p.z);
    const z = (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    return {
        x,
        y,
        z
    };
};