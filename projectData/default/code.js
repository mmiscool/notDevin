// Function: convexHull
/**
 * Calculates the convex hull of a set of points using Andrew's monotone chain algorithm.
 * @param {Array} pointsSet - An array of point objects, each containing x and y coordinates as properties. The input must contain at least three distinct points.
 * @returns {Array} A new array representing the vertices of the convex hull in counterclockwise order, starting with the leftmost vertex. If fewer than 3 points are provided or no valid convex hull can be formed, the original set is returned unchanged.
 */
function convexHullPointsSet(pointsSet) {
    if (pointsSet.length < 3) return pointsSet;

    const sortedPoints = [...pointsSet].sort((a, b) => a.x - b.x || a.y - b.y);

    let hullLower = [];
    for (let point of sortedPoints) {
        while (hullLower.length >= 2 && crossProduct(hullLower[hullLower.length - 2], hullLower[hullLower.length - 1], point) <= 0) {
            hullLower.pop();
        }
        hullLower.push(point);
    }

    let hullUpper = [];
    for (let point of [...sortedPoints].reverse()) {
        while (hullUpper.length >= 2 && crossProduct(hullUpper[hullUpper.length - 2], hullUpper[hullUpper.length - 1], point) <= 0) {
            hullUpper.pop();
        }
        hullUpper.push(point);
    }

    return [...hullLower, ...hullUpper.slice(1).reverse()];
}





// Function: fsdfsdfs
/**
* Generates all permutations of three elements.
* @param {*} a - The first element in the array to be permuted.
* @param {*} b - The second element in the array to be permuted.
* @param {*} c - The third element in the array to be permuted.
* @return {Array<Array>} An array containing all permutations of [a, b, c].
*/
function fsdfsdfs(a, b, c) {
    return [
        [a, b, c],
        [a, c, b],
        [b, a, c],
        [b, c, a],
        [c, a, b],
        [c, b, a]
    ];
}





// Function: sumAB
/**
 * Calculates the sum of two numbers, `a` and `b`.
 * @param {number} a - The first number to be added. Must be finite.
 * @param {number} b - The second number to be added. Must be finite.
 * @returns {number} The sum of `a` and `b`.
 * @throws An error if either argument is not a finite number.
 */
function sumAB(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('Both arguments must be numbers');
  return a + b;
}





