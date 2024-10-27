function alignCurveDirections(curve1, curve2) {
    var start1 = evaluateNurbsCurve(curve1, 0);
    var end1 = evaluateNurbsCurve(curve1, 1);
    var start2 = evaluateNurbsCurve(curve2, 0);
    var end2 = evaluateNurbsCurve(curve2, 1);
    var distanceStart1Start2 = Math.sqrt(Math.pow(start1.x - start2.x, 2) + Math.pow(start1.y - start2.y, 2) + Math.pow(start1.z - start2.z, 2));
    var distanceStart1End2 = Math.sqrt(Math.pow(start1.x - end2.x, 2) + Math.pow(start1.y - end2.y, 2) + Math.pow(start1.z - end2.z, 2));
    var distanceEnd1Start2 = Math.sqrt(Math.pow(end1.x - start2.x, 2) + Math.pow(end1.y - start2.y, 2) + Math.pow(end1.z - start2.z, 2));
    var distanceEnd1End2 = Math.sqrt(Math.pow(end1.x - end2.x, 2) + Math.pow(end1.y - end2.y, 2) + Math.pow(end1.z - end2.z, 2));
    if (distanceStart1End2 < distanceStart1Start2 && distanceStart1End2 < distanceEnd1Start2 && distanceStart1End2 < distanceEnd1End2) {
        curve2.controlPoints.reverse();
    } else if (distanceEnd1Start2 < distanceStart1Start2 && distanceEnd1Start2 < distanceStart1End2 && distanceEnd1Start2 < distanceEnd1End2) {
        curve1.controlPoints.reverse();
    }
}