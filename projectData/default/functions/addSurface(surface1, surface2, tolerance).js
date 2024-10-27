function addSurface(listOfExistingFunctions, arguments, specification) {
    var code = arguments[6], errorLogs = arguments[7];
    code = 'function radius(p1, p2) {if (p1 && p2) {return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));} else {return 0;}}';
    errorLogs = ['1.'];
}