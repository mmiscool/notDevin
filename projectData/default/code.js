// Function: applyChamfer
undefined
undefined





// Function: applyFillet
undefined
undefined





// Function: approximateCurveThroughPoints
undefined
undefined





// Function: booleanOperation
undefined
undefined





// Function: closestPointOnCurve
undefined
undefined





// Function: createExtrusion
undefined
undefined





// Function: createNurbsCurve
/**
 * Creates a NURBS (Non-Uniform Rational B-Splines) curve object.
 *
 * @param {Array} controlPoints - An array of control points, where each point is an array of coordinates (e.g., [x, y, z]).
 * @param {number} degree - The degree of the curve, indicating the polynomial degree of the segments.
 * @param {Array} knots - An array representing the knot vector, defining the parameterization of the curve.
 * @returns {Object} A NURBS curve object containing the control points, degree, and knot vector.
 */
function createNurbsCurve(controlPoints, degree, knots) {
    return {
        controlPoints: controlPoints,
        degree: degree,
        knots: knots
    };
}





// Function: createNurbsSurface
/**
 * Creates a NURBS surface object.
 *
 * @param {Array<Array<Number[]>>} controlPoints - A 2D array of control points where each control point is represented by an array of numbers (coordinates).
 * @param {number} degreeU - The degree of the NURBS surface along the U direction.
 * @param {number} degreeV - The degree of the NURBS surface along the V direction.
 * @param {Array<number>} knotsU - The knot vector for the U direction.
 * @param {Array<number>} knotsV - The knot vector for the V direction.
 * @returns {Object} An object representing the NURBS surface with properties for control points, degrees, and knot vectors, 
 * and a method to evaluate the surface at given parameters (u, v).
 */
function createNurbsSurface(controlPoints, degreeU, degreeV, knotsU, knotsV) {
    return {
        controlPoints: controlPoints,
        degreeU: degreeU,
        degreeV: degreeV,
        knotsU: knotsU,
        knotsV: knotsV,
        evaluate: function (u, v) {
            return deBoorSurfaceAlgorithm(this.controlPoints, this.degreeU, this.degreeV, this.knotsU, this.knotsV, u, v);
        }
    };
}





// Function: createRevolution
undefined
undefined





// Function: createSweep
undefined
undefined





// Function: curveLength
/**
 * Calculates the length of a given NURBS curve.
 *
 * This function utilizes numerical integration to determine the 
 * length of the specified NURBS curve. It supports both rational 
 * and non-rational curves.
 *
 * @param {NURBSCurve} nurbsCurve - The NURBS curve for which to calculate the length. 
 *                                  The curve should be represented with its control points,
 *                                  degree, knots, and optionally weights.
 * @returns {number} The length of the NURBS curve.
 */
function curveLength(nurbsCurve) {
    return integrateCurve(nurbsCurve);
}





// Function: deBoorAlgorithm
/**
 * Evaluates a point on a B-spline curve using the De Boor algorithm.
 *
 * @param {Array<Object>} controlPoints - An array of control points, where each point is an object with x, y, and z properties.
 * @param {number} degree - The degree of the B-spline.
 * @param {Array<number>} knots - A non-decreasing array representing the knots vector.
 * @param {number} t - The parameter at which the curve should be evaluated, typically between the first and last knot values where the curve is defined.
 * @returns {Object|null} - An object representing the x, y, z coordinates of the point on the curve at parameter t, or null if t is out of the valid range.
 */
function deBoorAlgorithm(controlPoints, degree, knots, t) {
    function deBoorRecursive(k, i, degree, controlPoints, knots, t) {
        if (k === 0) {
            return controlPoints[i];
        }
        var alpha = (t - knots[i]) / (knots[i + degree - k + 1] - knots[i]);
        var point1 = deBoorRecursive(k - 1, i - 1, degree, controlPoints, knots, t);
        var point2 = deBoorRecursive(k - 1, i, degree, controlPoints, knots, t);
        return {
            x: (1 - alpha) * point1.x + alpha * point2.x,
            y: (1 - alpha) * point1.y + alpha * point2.y,
            z: (1 - alpha) * point1.z + alpha * point2.z
        };
    }
    var n = controlPoints.length - 1;
    var m = knots.length - 1;
    var k = degree;
    if (t < knots[degree] || t > knots[m - degree])
        return null;
    for (var i = degree; i <= n; i++) {
        if (t >= knots[i] && t < knots[i + 1]) {
            return deBoorRecursive(degree, i, degree, controlPoints, knots, t);
        }
    }
    return null;
}





// Function: deBoorSurfaceAlgorithm
/**
 * Computes the point on a NURBS surface using the de Boor algorithm.
 *
 * @param {Array<Array<Object>>} controlPoints - A two-dimensional array of control points where each control point is an object with x, y, and z coordinates.
 * @param {number} degreeU - The degree of the NURBS surface in the U direction.
 * @param {number} degreeV - The degree of the NURBS surface in the V direction.
 * @param {Array<number>} knotsU - The knot vector in the U direction.
 * @param {Array<number>} knotsV - The knot vector in the V direction.
 * @param {number} u - The parameter at which to evaluate the surface in the U direction.
 * @param {number} v - The parameter at which to evaluate the surface in the V direction.
 * @returns {Object} The evaluated point on the surface, represented as an object with x, y, and z coordinates.
 *
 * @private
 *
 * @example
 * const ctrlPts = [
 *   [{ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 2, z: 0 }],
 *   [{ x: 1, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 1, y: 2, z: 0 }],
 *   [{ x: 2, y: 0, z: 0 }, { x: 2, y: 1, z: 0 }, { x: 2, y: 2, z: 0 }]
 * ];
 * const degreeU = 2;
 * const degreeV = 2;
 * const knotsU = [0, 0, 0, 1, 1, 1];
 * const knotsV = [0, 0, 0, 1, 1, 1];
 * const point = deBoorSurfaceAlgorithm(ctrlPts, degreeU, degreeV, knotsU, knotsV, 0.5, 0.5);
 * console.log(point); // { x: ..., y: ..., z: ... }
 */
function deBoorSurfaceAlgorithm(controlPoints, degreeU, degreeV, knotsU, knotsV, u, v) {
    function deBoor(ctrlPts, degree, knots, t) {
        const n = ctrlPts.length - 1;
        const d = degree;
        let k = findSpan(n, d, t, knots);
        let dPts = Array.from({ length: d + 1 }, (_, i) => ({ ...ctrlPts[k - d + i] }));
        
        for (let r = 1; r <= d; r++) {
            for (let i = d; i >= r; i--) {
                let alpha = (t - knots[k - d + i]) / (knots[k + i - r + 1] - knots[k - d + i]);
                dPts[i].x = (1.0 - alpha) * dPts[i - 1].x + alpha * dPts[i].x;
                dPts[i].y = (1.0 - alpha) * dPts[i - 1].y + alpha * dPts[i].y;
                dPts[i].z = (1.0 - alpha) * dPts[i - 1].z + alpha * dPts[i].z;
            }
        }
        return dPts[d];
    }

    function findSpan(n, degree, u, knots) {
        if (u >= knots[n + 1]) return n;
        if (u <= knots[degree]) return degree;
        let low = degree, high = n + 1, mid = Math.floor((low + high) / 2);
        while (u < knots[mid] || u >= knots[mid + 1]) {
            if (u < knots[mid]) high = mid;
            else low = mid;
            mid = Math.floor((low + high) / 2);
        }
        return mid;
    }

    const nU = controlPoints.length;
    const nV = controlPoints[0].length;
    let tempPoints = [];

    for (let i = 0; i < nU; i++) {
        tempPoints.push(deBoor(controlPoints[i], degreeV, knotsV, v));
    }

    return deBoor(tempPoints, degreeU, knotsU, u);
}





// Function: derivativeOfCurve
undefined
undefined





// Function: derivativeOfSurface
undefined
undefined





// Function: evaluateNurbsCurve
/**
 * Evaluates a point on a NURBS curve at a given parameter value.
 *
 * @param {Object} nurbsCurve - An object representing the NURBS curve.
 * @param {Array} nurbsCurve.controlPoints - The control points of the NURBS curve.
 * @param {number} nurbsCurve.degree - The degree of the NURBS curve.
 * @param {Array} nurbsCurve.knots - The knot vector of the NURBS curve.
 * @param {number} t - The parameter value at which to evaluate the curve.
 * @returns {Array} The evaluated point on the NURBS curve.
 */
function evaluateNurbsCurve(nurbsCurve, t) {
    return deBoorAlgorithm(nurbsCurve.controlPoints, nurbsCurve.degree, nurbsCurve.knots, t);
}





// Function: evaluateNurbsSurface
/**
 * Evaluates a NURBS surface at the given parameter values (u, v).
 *
 * @param {Object} nurbsSurface - An object representing the NURBS surface.
 * @param {Array} nurbsSurface.controlPoints - A 2D array of control points for the NURBS surface.
 * @param {number} nurbsSurface.degreeU - The degree of the NURBS surface in the U direction.
 * @param {number} nurbsSurface.degreeV - The degree of the NURBS surface in the V direction.
 * @param {Array} nurbsSurface.knotsU - The knot vector in the U direction.
 * @param {Array} nurbsSurface.knotsV - The knot vector in the V direction.
 * @param {number} u - The parameter value in the U direction.
 * @param {number} v - The parameter value in the V direction.
 *
 * @returns {Object} The point on the NURBS surface corresponding to the parameters (u, v).
 */
function evaluateNurbsSurface(nurbsSurface, u, v) {
    return deBoorSurfaceAlgorithm(nurbsSurface.controlPoints, nurbsSurface.degreeU, nurbsSurface.degreeV, nurbsSurface.knotsU, nurbsSurface.knotsV, u, v);
}





// Function: findIntersection
/**
 * Finds the intersection points between two NURBS curves.
 *
 * This function utilizes an intersection algorithm to determine all intersection
 * points between two given NURBS curves, `curve1` and `curve2`.
 *
 * @param {Object} curve1 - The first NURBS curve to be checked for intersections.
 * @param {Object} curve2 - The second NURBS curve to be checked for intersections.
 * @returns {Array} An array of points representing the intersection locations between the two curves.
 * Each point is represented as an object containing the coordinates.
 */
function findIntersection(curve1, curve2) {
    return intersectionAlgorithm(curve1, curve2);
}





// Function: integrateCurve
undefined
undefined





// Function: intersectSurfaces
undefined
undefined





// Function: intersectionAlgorithm
/**
 * Computes the intersection between two NURBS curves.
 *
 * @function
 * @param {Object} curve1 - The first NURBS curve object.
 * @param {Object} curve2 - The second NURBS curve object.
 * @returns {Array} An array of intersection points.
 * @throws {Error} If finding the intersection fails or if provided curves are invalid.
 *
 * @description
 * This function takes two NURBS curve objects and returns the intersection points
 * between them. The curves must be valid NURBS curves. The intersection is calculated
 * using a specified algorithm which determines points where the curves meet.
 *
 * @example
 * const intersectionPoints = intersectionAlgorithm(curve1, curve2);
 */
function intersectionAlgorithm(curve1, curve2) {
    return findIntersection(curve1, curve2);
}





// Function: loftNurbsSurfaces
undefined
undefined





// Function: matchCurveKnotVectors
undefined
undefined





// Function: offsetSurface
undefined
undefined





// Function: projectPointOnCurve
undefined
undefined





// Function: refineKnotVector
/**
 * Refines the knot vector of a given NURBS curve or surface by inserting new knots.
 * 
 * @param {Object} curveOrSurface - The NURBS curve or surface to be refined.
 * @param {Array<number>} newKnots - The knots to be inserted into the knot vector.
 * 
 * @returns {Object} - Returns a refined NURBS curve or surface with updated control points and knot vector.
 * 
 * @property {Array<Object>} curveOrSurface.controlPoints - The control points of the curve or surface.
 * @property {number} curveOrSurface.degree - The degree of the curve (if it's a curve).
 * @property {number} curveOrSurface.degreeU - The degree of the surface in the U direction (if it's a surface).
 * @property {number} curveOrSurface.degreeV - The degree of the surface in the V direction (if it's a surface).
 * @property {Array<number>} curveOrSurface.knots - The knot vector (if it's a curve).
 * @property {Array<number>} curveOrSurface.knotsU - The knot vector in the U direction (if it's a surface).
 * @property {Array<number>} curveOrSurface.knotsV - The knot vector in the V direction (if it's a surface).
 * 
 * @private
 * @function insertKnot
 *   Internal utility function to insert a single knot into the knot vector and update control points.
 * 
 * @function findSpan
 *   Finds the knot span index in the knot vector for a given parameter.
 */
function refineKnotVector(curveOrSurface, newKnots) {
    var controlPoints, degree, knots;
    var isCurve = curveOrSurface.hasOwnProperty('degree');
    if (isCurve) {
        controlPoints = curveOrSurface.controlPoints;
        degree = curveOrSurface.degree;
        knots = curveOrSurface.knots;
    } else {
        controlPoints = curveOrSurface.controlPoints;
        degreeU = curveOrSurface.degreeU;
        degreeV = curveOrSurface.degreeV;
        knotsU = curveOrSurface.knotsU;
        knotsV = curveOrSurface.knotsV;
    }
    function insertKnot(knot, k, p, controlPoints, knots) {
        var n = controlPoints.length - 1;
        var m = knots.length - 1;
        var r = 1;
        var a = findSpan(knot, k, p, knots);
        var b = a + 1;
        var newControlPoints = [];
        for (var i = 0; i <= a - p; i++) {
            newControlPoints.push(controlPoints[i]);
        }
        for (var i = a - p + 1; i <= a; i++) {
            var alpha = (knot - knots[i]) / (knots[i + p] - knots[i]);
            var pt = {
                x: alpha * controlPoints[i].x + (1 - alpha) * controlPoints[i - 1].x,
                y: alpha * controlPoints[i].y + (1 - alpha) * controlPoints[i - 1].y,
                z: alpha * controlPoints[i].z + (1 - alpha) * controlPoints[i - 1].z
            };
            newControlPoints.push(pt);
        }
        for (var i = b; i <= n; i++) {
            newControlPoints.push(controlPoints[i]);
        }
        var newKnots = [];
        for (var i = 0; i <= a; i++) {
            newKnots.push(knots[i]);
        }
        newKnots.push(knot);
        for (var i = b; i <= m; i++) {
            newKnots.push(knots[i]);
        }
        return {
            controlPoints: newControlPoints,
            knots: newKnots
        };
    }
    function findSpan(u, n, p, U) {
        if (u >= U[n + 1])
            return n;
        if (u <= U[p])
            return p;
        var low = p;
        var high = n + 1;
        var mid = Math.floor((low + high) / 2);
        while (u < U[mid] || u >= U[mid + 1]) {
            if (u < U[mid]) {
                high = mid;
            } else {
                low = mid;
            }
            mid = Math.floor((low + high) / 2);
        }
        return mid;
    }
    for (var i = 0; i < newKnots.length; i++) {
        if (isCurve) {
            var result = insertKnot(newKnots[i], controlPoints.length - 1, degree, controlPoints, knots);
            controlPoints = result.controlPoints;
            knots = result.knots;
        } else {
            var nu = controlPoints.length - 1;
            var nv = controlPoints[0].length - 1;
            var knotResultU = insertKnot(newKnots[i], nu, degreeU, controlPoints, knotsU);
            controlPoints = knotResultU.controlPoints;
            knotsU = knotResultU.knots;
            var knotResultV = insertKnot(newKnots[i], nv, degreeV, controlPoints[0], knotsV);
            for (var j = 0; j < controlPoints.length; j++) {
                controlPoints[j] = knotResultV.controlPoints[j];
            }
            knotsV = knotResultV.knots;
        }
    }
    if (isCurve) {
        return createNurbsCurve(controlPoints, degree, knots);
    } else {
        return createNurbsSurface(controlPoints, degreeU, degreeV, knotsU, knotsV);
    }
}





// Function: shellSolid
undefined
undefined





