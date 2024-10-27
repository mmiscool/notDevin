function getControlPoints(listOfExistingFunctions, p1, p2) {
    function roundToDecimal(num, decimalPlaces) {
        var multiplier = Math.pow(10, decimalPlaces);
        return Math.round(num * multiplier) / multiplier;
    }
    function calculateDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
    }
    var distance1 = calculateDistance(listOfExistingFunctions[0], p1);
    var distance2 = calculateDistance(listOfExistingFunctions[0], p2);
    var distanceBetweenPoints = calculateDistance(p1, p2);
    var thresholdValue = 2 * (listOfExistingFunctions[1] + listOfExistingFunctions[2]);
    var isTangent = false;
    if (roundToDecimal(distance1, 3) === roundToDecimal(distance2, 3) && Math.abs(roundToDecimal(distance1, 3) - roundToDecimal(distanceBetweenPoints, 3)) <= thresholdValue) {
        isTangent = true;
    } else {
        isTangent = false;
    }
    return isTangent;
}