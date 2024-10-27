function deBoorToNurbs(deBoorPoints, paramVec, degree) {
    return createNurbsCurve(deBoorPoints, degree, paramVec);
}