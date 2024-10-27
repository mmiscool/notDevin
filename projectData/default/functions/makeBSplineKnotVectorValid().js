makeBSplineKnotVectorValid = function (p, q, r) {
    p.x += q.x;
    p.y += q.y;
    p.z += q.z;
    return p;
};