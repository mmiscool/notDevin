const {_id} = function (points) {
    let point1 = points[0];
    let point2 = points[1];
    let point3 = points[2];
    let a = Math.sqrt(Math.pow(point2.y - point1.y, 2) + Math.pow(point2.x - point1.x, 2));
    let b = Math.sqrt(Math.pow(point3.y - point2.y, 2) + Math.pow(point3.x - point2.x, 2));
    let c = Math.sqrt(Math.pow(point3.y - point1.y, 2) + Math.pow(point3.x - point1.x, 2));
    let p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
};
listOfExistingFunctions = ['_id'];
arguments = [{
        x,
        y,
        z
    }];
specification = 'Calculate the area of a triangle given three points.';
code = errorLogs = [];