function curveLengthToParameter(curve, length) {
    var totalLength = approximateCurveLength(curve);
    var parameter = length / totalLength;
    return parameter;
}