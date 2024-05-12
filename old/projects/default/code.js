// Function: averageValues
/**
 * Calculates the average of an array of numbers.
 * @param {number[]} numbers - The array of numbers to calculate the average from.
 * @return {number} The calculated average, or NaN if input is invalid.
 * @throws Will return NaN when the input is not a valid array of finite numbers.
 */
function averageValues(numbers) {
    if (!Array.isArray(numbers) || !numbers.every(Number.isFinite)) return NaN;
    const total = numbers.reduce((acc, val) => acc + val, 0);
    return total / numbers.length;
}





// Function: convexHull
/**
 * Calculates the convex hull of a set of points using the Graham scan algorithm.
 * @param {Array<[number, number]>} points - The array of 2D points to compute the convex hull for.
 * @returns {Array<[number, number]>} - An array containing the vertices on the convex hull in counterclockwise order.
 */
function convexHull(points) {
    if (points.length < 3) return [];

    const sortedPoints = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const lowerHull = [];

    for (const point of sortedPoints) {
        while (lowerHull.length && crossProduct(lowerHull[lowerHull.length-1], lowerHull[lowerHull.length-2], point) <= 0) {
            lowerHull.pop();
        }
        lowerHull.push(point);
    }

    const upperHull = [];
    for (let i = points.length - 1; i >= 0; --i) {
        const point = sortedPoints[i];
        while (upperHull.length && crossProduct(upperHull[upperHull.length-1], upperHull[upperHull.length-2], point) <= 0) {
            upperHull.pop();
        }
        upperHull.push(point);
    }

    return [...new Set([...lowerHull, ...upperHull].filter((p, i, arr) => !arr.includes(p) || (i > 0 && arr[i-1] === p)))];
}

function crossProduct(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}





// Function: createPolygon
/**
* Creates a polygon object with specified points and computes its center point.
* 
* @param {Array} points - An array of objects representing the vertices of the polygon. Each vertex should have x and y properties (optional for the last point).
* @returns {Object} A new Polygon instance, which contains an id derived from a timestamp, the original points, and its center point.
* 
* @throws {Error} If the input points array does not contain exactly three elements.
*/
function createPolygon(points) {
    const id = `polygon-${Date.now()}`;
    if (points.length !== 3) throw new Error("Points array must contain exactly three elements.");
    const pointsObject = {};
    pointsObject.id = id;
    pointsObject.points = points;
    pointsObject.centerPoint = function() {
        let xSum = 0, ySum = 0;
        for (let i = 0; i < this.points.length; i++) {
            xSum += this.points[i].x || 0;
            ySum += this.points[i].y || 0;
        }
        return {x: xSum / this.points.length, y: ySum / this.points.length};
    };
    
    return pointsObject;
}





// Function: fancySort
/**
 * Sorts an array of elements in a case-insensitive manner using localeCompare for comparison.
 * @param {Array} arr - The input array to be sorted, where all elements are strings.
 * @returns {Array} - A new array with the same elements as 'arr', but sorted case-insensitively.
 */
function fancySort(arr) {
    return arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}





// Function: pothag
/**
 * Calculates the hypotenuse of a right-angled triangle given its length and width.
 * 
 * @param {number} length - The length of the triangle's side adjacent to the right angle.
 * @param {number} width - The width of the triangle's side adjacent to the right angle.
 * @returns {number} The hypotenuse, calculated using the Pythagorean theorem.
 */
function pothag(length, width) {
    return Math.hypot(length, width);
}





// Function: sumAB
/**
 * Calculates the sum of two numbers.
 * 
 * @function sumAB
 * @param {number} a - The first number to be added.
 * @param {number} b - The second number to be added.
 * @returns {number} The sum of the input parameters.
 */
sumAB(A, B) { return A + B; }





