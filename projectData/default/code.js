// Function: analyzeSurfaceCurvature
/**
 * Analyzes the surface curvature of a given Bezier surface.
 *
 * @param {Object} surface - The Bezier surface to analyze.
 * @param {number} paramU - The U parameter value.
 * @param {number} paramV - The V parameter value.
 * @return {number} The surface curvature at the specified (u, v) parameters.
 */
function analyzeSurfaceCurvature(surface, paramU, paramV) {
    var d2dx = 0;
    var d2dy = 0;
    var d2dz = 0;

    for (var i = 0; i < surface.controlPoints.length; i++) {
        var controlPoint = surface.controlPoints[i];
        var weightU = surface.weights[i];
        var weightV = surface.weights[(i + 1) % surface.weights.length];

        if (paramU === 0 && paramV === 0) {
            d2dx += weightU * weightV * (controlPoint.x * controlPoint.x);
            d2dy += weightU * weightV * (controlPoint.y * controlPoint.y);
            d2dz += weightU * weightV * (controlPoint.z * controlPoint.z);
        } else if (paramU === 0) {
            var tangentX = (surface.weights[(i + 1) % surface.weights.length] - weightU) / surface.knotsV[i];
            var tangentY = (surface.weights[(i + 1) % surface.weights.length] * controlPoint.z - weightU * controlPoint.z) / surface.knotsV[i];
            var tangentZ = (weightU * controlPoint.y - surface.weights[(i + 1) % surface.weights.length] * controlPoint.y) / surface.knotsV[i];

            d2dx += weightU * weightV * (tangentX * tangentX);
            d2dy += weightU * weightV * (tangentY * tangentY);
            d2dz += weightU * weightV * (tangentZ * tangentZ);
        } else if (paramV === 0) {
            var tangentX = (surface.weights[(i + 1) % surface.weights.length] - weightU) / surface.knotsU[i];
            var tangentY = (weightU * controlPoint.y - surface.weights[(i + 1) % surface.weights.length] * controlPoint.y) / surface.knotsU[i];
            var tangentZ = (surface.weights[(i + 1) % surface.weights.length] * controlPoint.z - weightU * controlPoint.z) / surface.knotsU[i];

            d2dx += weightU * weightV * (tangentX * tangentX);
            d2dy += weightU * weightV * (tangentY * tangentY);
            d2dz += weightU * weightV * (tangentZ * tangentZ);
        } else {
            var uParam = surface.knotsU[Math.min(Math.floor((paramU - surface.knotsU[0]) / (surface.knotsU[1] - surface.knotsU[0])), surface.controlPoints.length - 2)];
            var vParam = surface.knotsV[Math.min(Math.floor((paramV - surface.knotsV[0]) / (surface.knotsV[1] - surface.knotsV[0])), surface.controlPoints.length - 2)];

            for (var j = 0; j < surface.controlPoints.length; j++) {
                if (Math.abs(surface.weights[j] * (uParam - surface.knotsU[j])) < Math.abs(weightU * (uParam - uParam))) {
                    weightU = surface.weights[j];
                    uParam = surface.knotsU[j];
                }
                if (Math.abs(surface.weights[(j + 1) % surface.weights.length] * (vParam - surface.knotsV[(j + 1) % surface.weights.length])) < Math.abs(weightV * (vParam - vParam))) {
                    weightV = surface.weights[(j + 1) % surface.weights.length];
                    vParam = surface.knotsV[(j + 1) % surface.weights.length];
                }
            }

            var tangentX = (weightU * controlPoint.x - weightV * surface.controlPoints[(vParam - surface.knotsV[0]) / (surface.knotsV[1] - surface.knotsV[0])] * surface.controlPoints[0].x) / ((uParam - surface.knotsU[0]) * (vParam - surface.knotsV[0]));
            var tangentY = (weightU * controlPoint.y - weightV * surface.controlPoints[(vParam - surface.knotsV[0]) / (surface.knotsV[1] - surface.knotsV[0])] * surface.controlPoints[0].y) / ((uParam - surface.knotsU[0]) * (vParam - surface.knotsV[0]));
            var tangentZ = (weightU * controlPoint.z - weightV * surface.controlPoints[(vParam - surface.knotsV[0]) / (surface.knotsV[1] - surface.knotsV[0])] * surface.controlPoints[0].z) / ((uParam - surface.knotsU[0]) * (vParam - surface.knotsV[0]));

            d2dx += weightU * weightV * (tangentX * tangentX);
            d2dy += weightU * weightV * (tangentY * tangentY);
            d2dz += weightU * weightV * (tangentZ * tangentZ);
        }
    }

    var curvature = Math.sqrt(d2dx + d2dy + d2dz) / surface.surfaceArea;

    return curvature;
}





// Function: blendSurfaces
/**
 * Blends two surfaces together based on a given blend radius.
 *
 * @param {Surface} surface1 The first surface to blend.
 * @param {Surface} surface2 The second surface to blend.
 * @param {Number} blendRadius The distance over which the surfaces will be blended.
 *
 * @returns {Surface} A new surface representing the blended result.
 */
function blendSurfaces(surface1, surface2, blendRadius) {
    var points = [];
    for (var u = 0; u <= 1; u += 0.01) {
        for (var v = 0; v <= 1; v += 0.01) {
            var point1 = evaluateSurfaceAtParam(surface1, u, v);
            var point2 = evaluateSurfaceAtParam(surface2, u, v);
            var blendPoint = blendPoints(point1, point2, blendRadius);
            points.push(blendPoint);
        }
    }
    return createNURBSSurface(1, 1, points, [0.01], [0.01]);
}

function blendPoints(p1, p2, radius) {
    var x = p1.x + (p2.x - p1.x) * ((Math.sqrt((radius ** 2) + (p2.z - p1.z) ** 2) - radius) / (p2.z - p1.z));
    var y = p1.y + (p2.y - p1.y) * ((Math.sqrt((radius ** 2) + (p2.z - p1.z) ** 2) - radius) / (p2.z - p1.z));
    return { x: x, y: y, z: p1.z };
}





// Function: booleanDifference
/**
 * Calculate the difference between two shapes.
 *
 * @param {Object} shape1 - The first shape to compare.
 * @param {Object} shape2 - The second shape to compare.
 * @return {Object} The resulting shape, if a difference was found.
 */
function booleanDifference(shape1, shape2) {
    let result = null;
    if (shape1 && shape2) {
        if (typeof shape1 === "object" && typeof shape2 === "object") {
            if (Object.prototype.toString.call(shape1) === "[object NURBSSurface]" && Object.prototype.toString.call(shape2) === "[object NURBSSurface]") {
                let surfaceResult = null;
                let paramUArray = [];
                let paramVArray = [];
                for (let paramU = 0; paramU <= 1; paramU += 0.01) {
                    for (let paramV = 0; paramV <= 1; paramV += 0.01) {
                        if (!booleanIntersection(shape1, blendSurfaces(shape2, shape1, Math.sqrt(Math.pow(paramU - 0.5, 2) + Math.pow(paramV - 0.5, 2))))) {
                            surfaceResult = closeSurface(surfaceResult ? surfaceResult : createNURBSSurface(3, [{x: paramU, y: paramV, z: 0}], [1], [0, 1, 1, 0], [0, 1], [0, 1]));
                        }
                    }
                }
                result = surfaceResult;
            } else {
                console.error("Unsupported shape type");
            }
        } else {
            console.error("Invalid input shapes");
        }
    } else {
        console.error("Invalid input arguments");
    }
    return result;
}





// Function: booleanIntersection
/**
 * Returns an array of points that are common to both shape1 and shape2.
 *
 * @param {Array} shape1 - The first shape to compare.
 * @param {Array} shape2 - The second shape to compare.
 * @return {Array} An array of points that are common to both shapes.
 */
function booleanIntersection(shape1, shape2) {
    var result = [];
    for (var i = 0; i < shape1.length; i++) {
        for (var j = 0; j < shape2.length; j++) {
            if (shape1[i].x === shape2[j].x && shape1[i].y === shape2[j].y && shape1[i].z === shape2[j].z) {
                result.push({ x: shape1[i].x, y: shape1[i].y, z: shape1[i].z });
            }
        }
    }
    return result;
}





// Function: booleanUnion
/**
* Combines two shapes by unioning their points.
*
* @param {Object} shape1 - The first shape to combine.
* @param {Object} shape2 - The second shape to combine.
*/
function booleanUnion(shape1, shape2) {
    for (var point1 in shape1.points) {
        var found = false;
        for (var point2 in shape2.points) {
            if (distanceBetween(point1, point2) <= 0.00001) {
                found = true;
                break;
            }
        }
        if (!found) {
            shape1.points.push(point1);
        }
    }
    for (var point2 in shape2.points) {
        var found = false;
        for (var point1 in shape1.points) {
            if (distanceBetween(point1, point2) <= 0.00001) {
                found = true;
                break;
            }
        }
        if (!found) {
            shape1.points.push(point2);
        }
    }
}

function distanceBetween(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
}





// Function: chamferEdges
/**
* Chamfers the edges of two surfaces by creating a blended curve and subtracting it from one of the original edges.
*
* @param {Object} edge1 - The first surface edge.
* @param {Object} edge2 - The second surface edge.
* @param {Number} distance - The distance at which to blend the curves.
* @returns {Object} The resulting chamfered edge.
function chamferEdges(edge1, edge2, distance) {
    const p1 = analyzeSurfaceCurvature(edge1, null, null);
    const p2 = analyzeSurfaceCurvature(edge2, null, null);
    const curve1 = createNURBSCurve(3, [p1.x, p1.y, p1.z], [], []);
    const curve2 = createNURBSCurve(3, [p2.x, p2.y, p2.z], [], []);
    const blendedCurve = blendSurfaces(curve1, curve2, distance);
    return booleanDifference(blendedCurve, edge1);
}





// Function: closeSurface
/**
 * Closes the surface by adding new control points and weights.
 *
 * @param {Object} surface The surface to close.
 * @returns {Object} Closed surface with updated control points, weights, knotsU, and knotsV.
 */
function closeSurface(surface) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    for (var i = 0; i < controlPoints.length; i++) {
        if (!knotsU.includes(knotsU[i])) {
            knotsU.push(knotsU[i]);
        }
        if (!knotsV.includes(knotsV[i])) {
            knotsV.push(knotsV[i]);
        }
    }

    var closedControlPoints = [];
    for (var i = 0; i < controlPoints.length; i++) {
        var point = controlPoints[i];
        var nextPoint;
        if (i == controlPoints.length - 1) {
            nextPoint = controlPoints[0];
        } else {
            nextPoint = controlPoints[i + 1];
        }
        closedControlPoints.push({x: point.x, y: point.y, z: point.z});
        closedControlPoints.push({x: (point.x + nextPoint.x) / 2, y: (point.y + nextPoint.y) / 2, z: (point.z + nextPoint.z) / 2});
    }

    var closedWeights = [];
    for (var i = 0; i < weights.length; i++) {
        closedWeights.push(weights[i]);
        closedWeights.push(weights[i] * -1);
    }

    var closedKnotsU = [...knotsU];
    closedKnotsU[closedKnotsU.length - 1] = knotsU[0];

    var closedKnotsV = [...knotsV];
    closedKnotsV[closedKnotsV.length - 1] = knotsV[0];

    return {degreeU: degreeU, degreeV: degreeV, controlPoints: closedControlPoints, weights: closedWeights, knotsU: closedKnotsU, knotsV: closedKnotsV};
}






// Function: createNURBSCurve
/**
 * Creates a NURBS (Non-uniform rational B-spline) curve with the given degree, control points, weights, and knots.
 *
 * @param {number} degree The degree of the polynomial used to define the curve.
 * @param {Array.<{x: number, y: number}>} controlPoints An array of control points that define the shape of the curve.
 * @param {Array.<number>} weights An array of weights associated with each control point.
 * @param {Array.<number>} knots An array of knot values that define the parameterization of the curve.
 *
 * @return {{weights: Array.<number>, knots: Array.<number>}} The created NURBS curve, represented as an object containing the updated weights and knots arrays.
 */
function createNURBSCurve(degree, controlPoints, weights, knots) {
    var n = controlPoints.length;
    var d = degree + 1;
    for (var i = 0; i < n; i++) {
        var point = controlPoints[i];
        var knot = knots[i];
        for (var j = 0; j < d; j++) {
            weights[i * d + j] *= Math.pow((point.x - knot) / (knots[n - 1] - knot), degree);
        }
    }
    return { weights: weights, knots: knots };
}





// Function: createNURBSSurface
/**
 * Creates a Nurbs surface given the degree in the U and V directions,
 * control points, weights, and knots.
 *
 * @param {number} degreeU - The degree of the surface in the U direction
 * @param {number} degreeV - The degree of the surface in the V direction
 * @param {array} controlPoints - A 2D array of control points
 * @param {array} weights - A 1D array of weights for each control point
 * @param {array} knotsU - A 1D array of knots in the U direction
 * @param {array} knotsV - A 1D array of knots in the V direction
 *
 * @return {array} The Nurbs surface as a 2D array of points
 */
function createNURBSSurface(degreeU, degreeV, controlPoints, weights, knotsU, knotsV) {
    var surface = [];
    for (var i = 0; i < controlPoints.length; i++) {
        surface.push([]);
        for (var j = 0; j < controlPoints[0].length; j++) {
            surface[i].push(0);
        }
    }
    for (var i = 0; i < controlPoints.length; i++) {
        for (var j = 0; j < controlPoints[0].length; j++) {
            var u = knotsU[j];
            for (var k = 0; k < degreeV + 1; k++) {
                surface[i][j] += weights[k] * Math.pow(1 - u, k) * Math.pow(u, degreeV - k);
            }
        }
    }
    return surface;
}





// Function: createPipeSurface
/**
* Creates a pipe surface based on the given curve and radius.
*
* @param {Object} curve - The curve to base the pipe surface on.
* @param {Number} radius - The radius of the pipe.
* @return {Object} - The created pipe surface.
*/
function createPipeSurface(curve, radius) {
    var controlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        controlPoints.push([curve.controlPoints[i][0], curve.controlPoints[i][1] + radius]);
    }
    return createNURBSSurface(3, controlPoints, [0.5, 0.5, 0.5, 0.5, 0.5, 0.5], [], []);
}





// Function: createRuledSurface
/**
 * Creates a ruled surface from two curves.
 *
 * @param {Object} curve1 - The first curve.
 * @param {Object} curve2 - The second curve.
 * @return {Object} An object representing the created ruled surface, with x, y, and z coordinates.
 */
function createRuledSurface(curve1, curve2) {
    let knotsU = [];
    let knotsV = [];
    for (let i = 0; i < curve1.controlPoints.length; i++) {
        knotsU.push(i / (curve1.controlPoints.length - 1));
    }
    for (let j = 0; j < curve2.controlPoints.length; j++) {
        knotsV.push(j / (curve2.controlPoints.length - 1));
    }
    let controlPoints = [];
    for (let i = 0; i < curve1.controlPoints.length; i++) {
        for (let j = 0; j < curve2.controlPoints.length; j++) {
            controlPoints.push([curve1.controlPoints[i][0], curve1.controlPoints[i][1], curve2.controlPoints[j][2]]);
        }
    }
    let degreeU = 3;
    let degreeV = 3;
    return { x: controlPoints.map(function(point) { return point[0]; }), y: controlPoints.map(function(point) { return point[1]; }), z: controlPoints.map(function(point) { return point[2]; }) };
}





// Function: curveBoundingBox
/**
 * Returns the bounding box for a given curve.
 *
 * @param {Object} curve The curve to compute the bounding box for.
 * @returns {{min: Object, max: Object}} The bounding box as an object with 'min' and 'max' properties.
 */
function curveBoundingBox(curve) {
    var min = {x: Infinity, y: Infinity, z: Infinity};
    var max = {x: -Infinity, y: -Infinity, z: -Infinity};

    for (var i = 0; i < curve.controlPoints.length; i++) {
        var point = curve.controlPoints[i];
        if (point.x < min.x) min.x = point.x;
        if (point.x > max.x) max.x = point.x;
        if (point.y < min.y) min.y = point.y;
        if (point.y > max.y) max.y = point.y;
        if (point.z < min.z) min.z = point.z;
        if (point.z > max.z) max.z = point.z;
    }

    return {min: min, max: max};
}






// Function: curveControlPolygon
/**
* @param {Object} curve - Curve object containing degree, weights, and knots.
* @returns {Array} Array of control points for the curve.
*
* Generates an array of control points that approximate a B-spline curve.
* The control points are calculated using the given curve's degree, weights, and knots.
*/
function curveControlPolygon(curve) {
    var degree = curve.degree;
    var weights = curve.weights;
    var knots = curve.knots;
    var controlPoints = [];
    
    for (var i = 0; i <= degree; i++) {
        for (var j = 0; j <= degree; j++) {
            var point = {};
            point.x = 0;
            point.y = 0;
            point.z = 0;
            for (var k = 0; k < knots.length - 1; k++) {
                if (knots[k] <= i / degree && knots[k + 1] > i / degree) {
                    var t = (i / degree - knots[k]) * (degree - 1);
                    point.x += weights[i * degree + j] * ((knots[k + 1] - k) * Math.pow(1 - t, degree - 1));
                }
            }
            controlPoints.push(point);
        }
    }
    
    return controlPoints;
}





// Function: curveDegreeElevation
/**
 * Elevation curve degree.
 *
 * @param {Curve} curve - The original curve.
 * @param {number} newDegree - The new degree of the curve.
 */
function curveDegreeElevation(curve, newDegree) {
    var weights = curve.weights;
    var controlPoints = curve.controlPoints;
    for (var i = 0; i < weights.length; i++) {
        weights[i] = deBoorAlgorithm(newDegree, controlPoints, curve.knots, i / (weights.length - 1));
    }
}





// Function: curveDerivativeAtParam
/**
 * @param {Array} curve - An array containing the degree, control points, weights, and knots of a B-spline curve.
 * @param {Number} param - The parameter value at which to compute the derivative.
 * @param {Number} order - The order of the B-spline curve (i.e., its degree).
 * @return {Array} An array containing the derivatives of the B-spline curve at the given parameter value.
 */
function curveDerivativeAtParam(curve, param, order) {
    var degree = curve[0];
    var controlPoints = curve[1];
    var weights = curve[2];
    var knots = curve[3];

    for (var i = 0; i < degree + 1; i++) {
        var basisDerivativeU = [];
        var basisDerivativeV = [];

        for (var j = 0; j <= degree; j++) {
            if (i == 0) {
                basisDerivativeU.push(weights[j] * (knots[i] - param));
                basisDerivativeV.push(weights[j] * (knots[degree + i] - param));
            } else if (i == degree) {
                basisDerivativeU.push(weights[j] * (param - knots[i - 1]));
                basisDerivativeV.push(weights[j] * (param - knots[degree + i - 1]));
            } else {
                basisDerivativeU.push(weights[j] * ((knots[i] - param) / (knots[i] - knots[i - 1])));
                basisDerivativeV.push(weights[j] * ((param - knots[degree + i - 1]) / (knots[degree + i] - knots[degree + i - 1]))));
            }
        }

        var curveDerivative = [];

        for (var k = 0; k < controlPoints.length; k++) {
            var point = [0, 0];

            for (var l = 0; l <= degree; l++) {
                point[0] += basisDerivativeU[l] * controlPoints[k][0];
                point[1] += basisDerivativeV[l] * controlPoints[k][1];
            }

            curveDerivative.push(point);
        }

        return curveDerivative;
    }
}





// Function: curveKnotInsertion
/**
 * Inserts a knot into the curve at the specified location.
 *
 * @param {Curve} curve - The curve to modify.
 * @param {number} knot - The new knot value to insert.
 */
function curveKnotInsertion(curve, knot) {
    var degree = curve.degree;
    var controlPoints = curve.controlPoints;
    var weights = curve.weights;
    var knots = curve.knots;
    var newKnots = [];
    var i;
    
    for (i = 0; i < knots.length; i++) {
        if (knots[i] <= knot) {
            break;
        }
    }
    
    for (; i < knots.length; i++) {
        newKnots.push(knots[i]);
    }
    
    var oldIndex = i - 1;
    var newIndex = knots.length;
    
    for (i = oldIndex; i < newIndex; i++) {
        if (knots[oldIndex] <= knot && knot <= knots[oldIndex + 1]) {
            newKnots.splice(newIndex++, 0, knot);
            break;
        }
        else if (knots[i] > knot) {
            newKnots.splice(i, 0, knot);
            break;
        }
    }
    
    curve.knots = newKnots;
}





// Function: curveLength
/**
* Calculate the length of a curve defined by control points.
*
* @param {Object} curve - The curve definition object
* @return {Number} The total length of the curve
*/
function curveLength(curve) {
    var length = 0;
    for (var i = 1; i < curve.controlPoints.length; i++) {
        var p1 = evaluateCurveAtParam(curve, curve.knots[i - 1]);
        var p2 = evaluateCurveAtParam(curve, curve.knots[i]);
        length += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
    }
    return length;
}





// Function: curvePointProjection
/**
* Calculates the point on a curve that corresponds to a given input point.
*
* @param {Curve} curve The Bezier curve to use for calculation.
* @param {Point} point The input point to project onto the curve.
* @return {Point} The projected point on the curve.
*/
function curvePointProjection(curve, point) {
    var degree = curve.degree;
    var controlPoints = curve.controlPoints;
    var weights = curve.weights;
    var knots = curve.knots;
    var param = null;
    for (var i = 0; i < knots.length - 1; i++) {
        if (point.x > knots[i] && point.x <= knots[i + 1]) {
            param = deBoorAlgorithm(degree, controlPoints, knots, point.x);
            break;
        }
    }
    return evaluateCurveAtParam(curve, param);
}





// Function: curveReparameterization
/**
 * Reparameterizes a curve to have the given knot vector.
 *
 * @param {Array.<Array.<number>>} curve The original curve.
 * @param {Array.<number>} newKnotVector The desired knot vector.
 * @return {NURBSCurve} A reparameterized NURBS curve.
 */
function curveReparameterization(curve, newKnotVector) {
    var degree = curve[0].length - 1;
    var controlPoints = [];
    for (var i = 0; i < curve.length; i++) {
        controlPoints.push([curve[i][1], curve[i][2]]);
    }
    var weights = [];
    for (var i = 0; i < degree + 1; i++) {
        weights.push(1);
    }
    return createNURBSCurve(degree, controlPoints, weights, newKnotVector);
}





// Function: curveSubdivision
/**
 * @param {Object} curve - The curve to be subdivided.
 * @param {number} param - The parameter value used for subdivision.
 * @return {Object} A new curve resulting from the subdivision operation.
 *
 * Subdivides a NURBS curve at the given parameter value. The curve is split into two parts
 * at the parameter value, and new control points are created to represent the subdivided curve.
 */
function curveSubdivision(curve, param) {
    let degree = curve.degree;
    let controlPoints = curve.controlPoints;
    let weights = curve.weights;
    let knots = curve.knots;

    let newControlPoints = [];
    let newWeights = [];
    let newKnots = [];

    for (let i = 0; i < controlPoints.length; i++) {
        if (knots[i] <= param) {
            newControlPoints.push(controlPoints[i]);
            newWeights.push(weights[i]);
            newKnots.push(knots[i]);
        } else if (knots[i] > param && i === 0) {
            break;
        }
    }

    for (let i = controlPoints.length - 1; i >= 0; i--) {
        if (knots[i] >= param) {
            newControlPoints.push(controlPoints[i]);
            newWeights.push(weights[i]);
            newKnots.push(knots[i]);
        } else if (knots[i] < param && i === controlPoints.length - 1) {
            break;
        }
    }

    let newCurve = createNURBSCurve(degree, newControlPoints, weights, newKnots);
    return newCurve;
}






// Function: curveTangentAtParam
/**
 * Calculate the tangent of a curve at a given parameter value.
 *
 * @param {Curve} curve The curve to calculate the tangent for.
 * @param {number} param The parameter value to calculate the tangent at.
 * @returns {Object} An object representing the tangent vector (x, y, z).
 */
function curveTangentAtParam(curve, param) {
    var controlPoints = curve.controlPoints;
    var weights = curve.weights;
    var knots = curve.knots;
    var degree = curve.degree;

    for (var i = 0; i < degree + 1; i++) {
        var weight = weights[i];
        var knot = knots[i];

        if (knot <= param && param <= knot + (knots[degree] - knots[degree - 1]) / ((knots[degree] - knots[degree - 1]) * Math.pow((knots[degree] - knots[degree - 1]) / (knots[degree] - knots[degree - 2]), degree)) {
            var tangent = new { x: 0, y: 0, z: 0 };

            for (var j = 0; j < controlPoints.length; j++) {
                if (weights[j] !== 0) {
                    var weightProduct = weight * weights[j];
                    var knotDiff = param - knot;
                    var power = Math.pow(knotDiff / ((knots[degree] - knots[degree - 1]) / ((knots[degree] - knots[degree - 2]))), degree);
                    tangent.x += controlPoints[j].x * weightProduct * power;
                    tangent.y += controlPoints[j].y * weightProduct * power;
                    tangent.z += controlPoints[j].z * weightProduct * power;
                }
            }

            return tangent;
        }
    }
}





// Function: curveToPolyline
/**
* Converts a Bezier curve into a polyline.
*
* @param {Object} curve The Bezier curve to convert.
* @param {Number} tolerance The maximum deviation from the original curve allowed in the generated polyline.
* @returns {Array} An array of points representing the converted polyline.
*/
function curveToPolyline(curve, tolerance) {
    var points = [];
    for (var i = 0; i <= curve.controlPoints.length - 1; i++) {
        points.push({ x: curve.controlPoints[i].x, y: curve.controlPoints[i].y });
    }
    var polyLine = [];
    for (var i = 0; i < points.length - 1; i++) {
        var direction = subtract(points[i + 1], points[i]);
        for (var j = 0; j <= Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2)); j++) {
            polyLine.push({ x: points[i].x + j * direction.x / Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2)), y: points[i].y + j * direction.y / Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2)) });
        }
    }
    return polyLine;
}





// Function: deBoorAlgorithm
/**
 * The deBoorAlgorithm function calculates the point on a B-spline curve 
 * given its degree, control points, knots and parameter value.
 *
 * @param {Number} degree - The degree of the B-spline
 * @param {Array} controlPoints - An array of control points defining the shape of the spline
 * @param {Array} knots - An array of knot values that define the domain of the spline
 * @param {Number} param - The parameter value for which to calculate the point on the curve
 *
 * @returns {Number} The calculated point on the B-spline curve at the given parameter value
 */
function deBoorAlgorithm(degree, controlPoints, knots, param) {
    var n = degree + 1;
    var t = [];
    for (var i = 0; i < n; i++) {
        t[i] = 0;
    }
    for (var j = 0; j <= degree; j++) {
        var p = 1;
        for (var k = 0; k < n - 1; k++) {
            if (k < j) {
                p *= param - knots[k];
            } else if (k > j) {
                p *= knots[k + 1] - param;
            }
        }
        t[j] += controlPoints[j] * p;
    }
    return t[0];
}





// Function: deBoorAlgorithmSurface
/**
 * @param {Number} degreeU - 
 * @param {Number} degreeV - 
 * @param {Array} controlPoints - 
 * @param {Array} knotsU - 
 * @param {Array} knotsV - 
 * @param {Number} paramU - 
 * @param {Number} paramV - 
 * @return {{x: Number, y: Number, z: Number}} - 
 */
function deBoorAlgorithmSurface(degreeU, degreeV, controlPoints, knotsU, knotsV, paramU, paramV) {
    var indexU = findKnotIndex(knotsU, paramU);
    var indexV = findKnotIndex(knotsV, paramV);
    
    if (indexU == -1 || indexV == -1) return null;
    
    var basisFunctionsU = [];
    for (var i = 0; i <= degreeU; i++) {
        basisFunctionsU[i] = evaluateBasisFunction(degreeU, knotsU[indexU + i], paramU);
    }
    
    var basisFunctionsV = [];
    for (var i = 0; i <= degreeV; i++) {
        basisFunctionsV[i] = evaluateBasisFunction(degreeV, knotsV[indexV + i], paramV);
    }
    
    var resultX = 0;
    var resultY = 0;
    var resultZ = 0;
    
    for (var i = 0; i <= degreeU; i++) {
        for (var j = 0; j <= degreeV; j++) {
            resultX += controlPoints[indexU + i][indexV + j][0] * basisFunctionsU[i] * basisFunctionsV[j];
            resultY += controlPoints[indexU + i][indexV + j][1] * basisFunctionsU[i] * basisFunctionsV[j];
            resultZ += controlPoints[indexU + i][indexV + j][2] * basisFunctionsU[i] * basisFunctionsV[j];
        }
    }
    
    return {x: resultX, y: resultY, z: resultZ};
}

function findKnotIndex(knots, param) {
    for (var i = 0; i < knots.length - 1; i++) {
        if (knots[i] <= param && param <= knots[i + 1]) return i;
    }
    return -1;
}

function evaluateBasisFunction(degree, knot, param) {
    var basisValue = 1;
    
    for (var i = 0; i < degree; i++) {
        if (knot != param) {
            basisValue *= (param - knot) / (knots[i + 1] - knot);
        } else {
            return 0;
        }
    }
    
    return basisValue;
}





// Function: evaluateCurveAtParam
/**
 * Evaluates the curve at a given parameter.
 *
 * @param {Object} curve - The B-spline curve to evaluate.
 * @param {number} param - The parameter value to evaluate.
 * @return {{x: number, y: number, z: number}|null} - The evaluated point or null if outside the knot range.
 */
function evaluateCurveAtParam(curve, param) {
    var degree = curve.degree;
    var controlPoints = curve.controlPoints;
    var weights = curve.weights;
    var knots = curve.knots;

    for (var i = 0; i < degree; i++) {
        for (var j = 0; j <= i; j++) {
            if (knots[i] > param) break;
            if (param >= knots[j + degree - 1]) continue;
            var basisValue = deBoorAlgorithm(degree, controlPoints, knots, param);
            return {
                x: basisValue[0] * weights[i],
                y: basisValue[1] * weights[i],
                z: basisValue[2] * weights[i]
            };
        }
    }

    for (var i = degree; i < controlPoints.length; i++) {
        if (knots[i - 1] > param) break;
        if (param >= knots[i]) continue;
        var basisValue = deBoorAlgorithm(degree, controlPoints, knots, param);
        return {
            x: basisValue[0] * weights[i],
            y: basisValue[1] * weights[i],
            z: basisValue[2] * weights[i]
        };
    }

    return null;
}

function deBoorAlgorithm(degree, controlPoints, knots, param) {
    if (degree == 1) {
        for (var i = 0; i < controlPoints.length; i++) {
            if (knots[i] <= param && param < knots[i + 1]) {
                return [controlPoints[i][0], controlPoints[i][1], controlPoints[i][2]];
            }
        }
    }

    var basisValue = new Array(degree);
    for (var i = 0; i < degree; i++) {
        if (knots[i] > param) {
            basisValue.fill(0);
            for (var j = 0; j <= i - 1; j++) {
                basisValue[j] = weights[i - 1];
            }
            return basisValue;
        }
    }

    for (var i = degree; i < controlPoints.length; i++) {
        if (knots[i - 1] > param) {
            basisValue.fill(0);
            for (var j = 0; j <= i - degree; j++) {
                basisValue[j] = weights[i];
            }
            return basisValue;
        }
    }

    return null;
}





// Function: evaluateSurfaceAtParam
/**
 * Evaluates the surface at given parameters.
 *
 * @param {Object} surface - The NURBS surface to evaluate.
 * @param {number} paramU - The parameter value for U dimension.
 * @param {number} paramV - The parameter value for V dimension.
 * @returns {Array} The evaluated surface values.
 */
function evaluateSurfaceAtParam(surface, paramU, paramV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    var basisU = [];
    var basisV = [];

    for (var i = 0; i <= degreeU; i++) {
        basisU[i] = deBoorAlgorithm(degreeU, controlPoints[i], knotsU, paramU);
    }

    for (var j = 0; j <= degreeV; j++) {
        basisV[j] = deBoorAlgorithm(degreeV, controlPoints[0][j], knotsV, paramV);
    }

    var result = new Array(basisU.length * basisV.length);

    for (var i = 0; i < basisU.length; i++) {
        for (var j = 0; j < basisV.length; j++) {
            result[i * basisV.length + j] = basisU[i] * basisV[j];
        }
    }

    return result;
}





// Function: extrudeCurve
/**
* Extrudes a curve into 3D space.
*
* @param {Object} curve - The curve to extrude, containing control points, weights and knots.
* @param {Array} direction - The direction vector for the extrusion.
* @param {Number} distance - The distance along the direction vector to extrude the curve.
* @returns {Object} A NURBS surface created from the extruded curve.
*/
function extrudeCurve(curve, direction, distance) {
    var controlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        controlPoints.push([curve.controlPoints[i].x + direction[0] * distance,
                             curve.controlPoints[i].y + direction[1] * distance,
                             curve.controlPoints[i].z + direction[2] * distance]);
    }
    var weights = [];
    for (var i = 0; i < curve.weights.length; i++) {
        weights.push(curve.weights[i]);
    }
    var knotsU = [];
    for (var i = 0; i <= curve.knots.length; i++) {
        knotsU.push(curve.knots[i]);
    }
    return createNURBSSurface(1, 1, controlPoints, weights, knotsU, []);
}





// Function: filletEdges
/**
 * @param {Object} edge1 - description of edge1
 * @param {Object} edge2 - description of edge2
 * @param {Number} radius - description of radius
 *
 * @returns {Boolean} result of filletEdges operation
 *
 * Description: This function calculates the boolean intersection of two surfaces.
 */
function filletEdges(edge1, edge2, radius) {
    var curve1 = analyzeSurfaceCurvature(edge1, 0, 1);
    var curve2 = analyzeSurfaceCurvature(edge2, 0, 1);
    return booleanIntersection(blendSurfaces(curve1, curve2, radius));
}





// Function: findCurveIntersections
/**
 * Finds the intersections between two curves.
 *
 * @param {Curve} curve1 - The first curve.
 * @param {Curve} curve2 - The second curve.
 * @returns {Array.<{x: number, y: number, z: number}>} An array of intersection points.
 */
function findCurveIntersections(curve1, curve2) {
    var result = [];
    for (var i = 0; i < curve1.controlPoints.length; i++) {
        var p1 = evaluateCurveAtParam(curve1, curve1.knots[i]);
        for (var j = 0; j < curve2.controlPoints.length; j++) {
            var p2 = evaluateCurveAtParam(curve2, curve2.knots[j]);
            if (isPointOnLine(p1, p2, curve1) && isPointOnLine(p1, p2, curve2)) {
                result.push({x: p1.x, y: p1.y, z: 0});
            }
        }
    }
    return result;
}

function isPointOnLine(point1, point2, curve) {
    var param = deBoorAlgorithmSurface(curve.degreeU, curve.degreeV, curve.controlPoints, curve.knotsU, curve.knotsV, point1.x, point2.y);
    if (isNaN(param)) return false;
    var p = evaluateSurfaceAtParam(curve, param, 0);
    return Math.abs(p.x - point1.x) < 0.00001 && Math.abs(p.y - point2.y) < 0.00001;
}





// Function: findSurfaceIntersections
/**
 * Finds the surface intersections between two surfaces.
 *
 * @param {Surface} surface1 The first surface to check for intersections.
 * @param {Surface} surface2 The second surface to check for intersections.
 * @returns {Array.<Point>} An array of points where the two surfaces intersect.
 */
function findSurfaceIntersections(surface1, surface2) {
    for (var u = 0; u <= 1; u += 0.01) {
        for (var v = 0; v <= 1; v += 0.01) {
            var point = evaluateSurfaceAtParam(surface1, u, v);
            if (point !== null && isPointOnSurface(surface2, point)) {
                point = evaluateSurfaceAtParam(surface2, u, v);
                if (point !== null && isPointOnSurface(surface1, point)) {
                    return [point];
                }
            }
        }
    }
    return [];
}

function isPointOnSurface(surface, point) {
    var distance = 0;
    for (var i = 0; i < surface.controlPoints.length; i++) {
        var controlPoint = surface.controlPoints[i];
        var vector = subtractVectors(subtractVectors(point, controlPoint), surface.normalAtParam(0.5, 0.5));
        distance += vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
    }
    return distance < 1e-6;
}

function subtractVectors(vector1, vector2) {
    return { x: vector1.x - vector2.x, y: vector1.y - vector2.y, z: vector1.z - vector2.z };
}





// Function: globalCurveInterpolation
/**
 * @param {Array.<{x: number, y: number, z: number}>} points An array of control points.
 * @param {number} degree The degree of the NURBS curve.
 * @return {NURBSCurve}
 */
function globalCurveInterpolation(points, degree) {
    let knots = [];
    let weights = [];
    let controlPoints = [];

    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        let knot = point.x;
        knots.push(knot);
        let weight = 1.0 / points.length;
        weights.push(weight);
        controlPoints.push([point.y, point.z]);
    }

    return createNURBSCurve(degree, controlPoints, weights, knots);
}






// Function: globalSurfaceInterpolation
/**
 * Creates a global surface interpolation using NURBS.
 *
 * @param {Array} points - Array of control points.
 * @param {Number} degreeU - Degree in the U direction.
 * @param {Number} degreeV - Degree in the V direction.
 * @returns {Object} The interpolated surface.
 */
function globalSurfaceInterpolation(points, degreeU, degreeV) {
    var controlPoints = [];
    var knotsU = [];
    var knotsV = [];
    var weights = [];

    for (var i = 0; i < points.length; i++) {
        controlPoints.push([points[i].x, points[i].y, points[i].z]);
        knotsU.push(i / (points.length - 1));
        weights.push(1);
    }

    return createNURBSSurface(degreeU, degreeV, controlPoints, weights, knotsU, knotsV);
}





// Function: intersectionCurveSurface
/**
 * Returns the intersection curve of a given NURBS curve and surface.
 *
 * This function finds the points where the curve intersects with the surface by evaluating
 * both the curve and the surface at different parameter values. It then checks if the z-value
 * of the curve is equal to the z-value of the surface at each point, and if so, adds it to the
 * intersection curve.
 *
 * @param {NURBS Curve} curve - The NURBS curve to find the intersection with.
 * @param {NURBS Surface} surface - The NURBS surface to find the intersection with.
 * @returns {Array} An array of points where the curve intersects with the surface.
function intersectionCurveSurface(curve, surface) {
    var paramU = [];
    var paramV = [];
    for (var i = 0; i < curve.knots.length - 1; i++) {
        if (curve.deBoorAlgorithm(curve.degree, curve.controlPoints, curve.knots, i) > surface.evaluateSurfaceAtParam(surface, surface.knotsU[0], surface.knotsV[0]).z) {
            paramU.push(i);
        }
    }
    for (var i = 0; i < surface.knotsV.length - 1; i++) {
        if (curve.deBoorAlgorithm(curve.degree, curve.controlPoints, curve.knots, 0) > surface.evaluateSurfaceAtParam(surface, surface.knotsU[0], i).z) {
            paramV.push(i);
        }
    }
    var intersectionCurve = [];
    for (var i = 0; i < paramU.length; i++) {
        for (var j = 0; j < paramV.length; j++) {
            var point = surface.evaluateSurfaceAtParam(surface, paramU[i], paramV[j]);
            if (curve.deBoorAlgorithm(curve.degree, curve.controlPoints, curve.knots, curve.evaluateCurveAtParam(curve, point).t) === point.z) {
                intersectionCurve.push({x: point.x, y: point.y, z: point.z});
            }
        }
    }
    return intersectionCurve;
}





// Function: intersectionSurfaceSurface
/**
* Finds the intersection points of two NURBS surfaces.
*
* @param {Object} surface1 The first NURBS surface.
* @param {Object} surface2 The second NURBS surface.
* @return {Array} An array of intersection points, or an empty array if no intersection is found.
*/
function intersectionSurfaceSurface(surface1, surface2) {
    var knotsU1 = surface1.knotsU;
    var knotsV1 = surface1.knotsV;
    var controlPoints1 = surface1.controlPoints;
    var degreeU1 = surface1.degreeU;
    var degreeV1 = surface1.degreeV;
    
    var knotsU2 = surface2.knotsU;
    var knotsV2 = surface2.knotsV;
    var controlPoints2 = surface2.controlPoints;
    var degreeU2 = surface2.degreeU;
    var degreeV2 = surface2.degreeV;

    for (var i = 0; i < knotsU1.length - 1; i++) {
        for (var j = 0; j < knotsV1.length - 1; j++) {
            var paramU1 = deBoorAlgorithm(degreeU1, controlPoints1, knotsU1, i);
            var paramV1 = deBoorAlgorithm(degreeV1, controlPoints1, knotsV1, j);
            
            var point1 = evaluateSurfaceAtParam(surface1, paramU1, paramV1);

            for (var k = 0; k < knotsU2.length - 1; k++) {
                for (var l = 0; l < knotsV2.length - 1; l++) {
                    var paramU2 = deBoorAlgorithm(degreeU2, controlPoints2, knotsU2, k);
                    var paramV2 = deBoorAlgorithm(degreeV2, controlPoints2, knotsV2, l);

                    var point2 = evaluateSurfaceAtParam(surface2, paramU2, paramV2);

                    if (point1.x === point2.x && point1.y === point2.y && point1.z === point2.z) {
                        // found an intersection
                        return [point1];
                    }
                }
            }
        }
    }

    return [];
}





// Function: isCurveClosed
/**
 * Determines whether a curve is closed.
 *
 * @param {Object} curve The curve to check.
 * @returns {boolean} True if the curve is closed, false otherwise.
 */
function isCurveClosed(curve) {
    var knots = curve.knots;
    var controlPoints = curve.controlPoints;
    var degree = curve.degree;
    for (var i = 0; i < knots.length - 1; i++) {
        if (knots[i] !== knots[knots.length - 1]) {
            return false;
        }
    }
    return true;
}





// Function: isSurfaceClosed
/**
 * Checks if a surface is closed.
 *
 * @param {Object} surface The surface to check for closure.
 * @returns {boolean} Whether the surface is closed or not.
 */
function isSurfaceClosed(surface) {
  var knotsU = surface.knotsU;
  var knotsV = surface.knotsV;
  for (var i = 0; i < knotsU.length - 1; i++) {
    if (knotsU[i] !== knotsU[i + 1]) return false;
  }
  for (var j = 0; j < knotsV.length - 1; j++) {
    if (knotsV[j] !== knotsV[j + 1]) return false;
  }
  return true;
}





// Function: localCurveRefinement
/**
 * @description Refine a curve by inserting knots to reduce the error.
 *
 * @param {Curve} curve - The curve to refine.
 * @param {number} tolerance - The maximum deviation allowed between the original and refined curves.
 * @return {Curve} The refined curve.
 */

/**
 * @description Finds the best knot in a segment of the curve that minimizes the error.
 *
 * @param {Knot[]} knots - The array of knots to search.
 * @param {number} degree - The degree of the polynomial used to evaluate the curve.
 * @param {{}} controlPoints - The control points of the curve.
 * @param {{}} weights - The weights of the curve.
 * @param {{x:number,y:number}} point - The point to compare with the refined curve.
 * @param {{x:number,y:number}} tangent - The tangent vector at the point.
 * @param {number} paramStart - The start parameter of the segment.
 * @param {number} paramEnd - The end parameter of the segment.
 * @return {number} The best knot in the segment.
 */

/**
 * @description Finds the best knot in a segment of the curve that minimizes the error.
 *
 * @param {Knot[]} knots - The array of knots to search.
 * @param {number} degree - The degree of the polynomial used to evaluate the curve.
 * @param {{}} controlPoints - The control points of the curve.
 * @param {{}} weights - The weights of the curve.
 * @param {{x:number,y:number}} point - The point to compare with the refined curve.
 * @param {{x:number,y:number}} tangent - The tangent vector at the point.
 * @param {number} paramStart - The start parameter of the segment.
 * @param {number} paramEnd - The end parameter of the segment.
 * @return {number} The best knot in the segment.
 */

/**
 * @description Finds the best knot within a specific interval that minimizes the error.
 *
 * @param {Knot[]} knots - The array of knots to search.
 * @param {number} degree - The degree of the polynomial used to evaluate the curve.
 * @param {{}} controlPoints - The control points of the curve.
 * @param {{}} weights - The weights of the curve.
 * @param {{x:number,y:number}} point - The point to compare with the refined curve.
 * @param {{x:number,y:number}} tangent - The tangent vector at the point.
 * @param {number} start - The start parameter of the interval.
 * @param {number} end - The end parameter of the interval.
 * @return {number} The best knot in the interval.
 */

/**
 * @description Finds the best knot within a specific interval that minimizes the error.
 *
 * @param {Knot[]} knots - The array of knots to search.
 * @param {number} degree - The degree of the polynomial used to evaluate the curve.
 * @param {{}} controlPoints - The control points of the curve.
 * @param {{}} weights - The weights of the curve.
 * @param {{x:number,y:number}} point - The point to compare with the refined curve.
 * @param {{x:number,y:number}} tangent - The tangent vector at the point.
 * @return {number} The best knot in the interval.
 */

/**
 * @description Calculates the deviation between two points.
 *
 * @param {{x:number,y:number}} point1 - The first point.
 * @param {{x:number,y:number}} point2 - The second point.
 * @return {number} The deviation between the two points.
function localCurveRefinement(curve, tolerance) {
    let knots = curve.knots;
    let degree = curve.degree;
    let controlPoints = curve.controlPoints;
    let weights = curve.weights;

    for (let i = 0; i < knots.length - 1; i++) {
        let paramStart = knots[i];
        let paramEnd = knots[i + 1];

        let segment = evaluateCurveAtParam(curve, paramStart);
        let endSegment = evaluateCurveAtParam(curve, paramEnd);

        let distance = curveLength(curve) / (paramEnd - paramStart);
        let numDivisions = Math.ceil(tolerance * distance);

        for (let j = 0; j < numDivisions; j++) {
            let param = (j * (paramEnd - paramStart)) / numDivisions + paramStart;
            let point = evaluateCurveAtParam(curve, param);
            let tangent = curveTangentAtParam(curve, param);

            let knot = findKnot(knots, degree, controlPoints, weights, segment, endSegment, point, tangent);

            if (knot !== null) {
                knots.splice(i + 1, 0, knot);
                i++;
                break;
            }
        }
    }

    return curve;
}

function findKnot(knots, degree, controlPoints, weights, segment, endSegment, point, tangent) {
    let maxDeviation = Infinity;
    let bestKnot = null;

    for (let i = 0; i < knots.length - 1; i++) {
        let paramStart = knots[i];
        let paramEnd = knots[i + 1];

        if (paramStart <= segment[0] && endSegment[0] <= paramEnd) {
            let newKnot = findBestKnot(knots, degree, controlPoints, weights, point, tangent, paramStart, paramEnd);
            if (newKnot !== null && deviation(point, evaluateCurveAtParam(curve, newKnot)) < maxDeviation) {
                maxDeviation = deviation(point, evaluateCurveAtParam(curve, newKnot));
                bestKnot = newKnot;
            }
        }
    }

    return bestKnot;
}

function findBestKnot(knots, degree, controlPoints, weights, point, tangent, paramStart, paramEnd) {
    let bestDeviation = Infinity;
    let bestKnot = null;

    for (let i = 0; i < knots.length - 1; i++) {
        if (knots[i] <= paramStart && paramEnd <= knots[i + 1]) {
            let newKnot = findBestKnotInSegment(knots, degree, controlPoints, weights, point, tangent, paramStart, paramEnd, i);
            if (newKnot !== null && deviation(point, evaluateCurveAtParam(curve, newKnot)) < bestDeviation) {
                bestDeviation = deviation(point, evaluateCurveAtParam(curve, newKnot));
                bestKnot = newKnot;
            }
        }
    }

    return bestKnot;
}

function findBestKnotInSegment(knots, degree, controlPoints, weights, point, tangent, paramStart, paramEnd, index) {
    let leftKnot = knots[index];
    let rightKnot = knots[index + 1];

    if (leftKnot <= paramStart && paramEnd <= rightKnot) {
        return findBestKnotInInterval(knots, degree, controlPoints, weights, point, tangent, paramStart, paramEnd);
    } else if (paramStart <= leftKnot && rightKnot <= paramEnd) {
        return findBestKnotInInterval(knots, degree, controlPoints, weights, point, tangent, leftKnot, rightKnot);
    }

    return null;
}

function findBestKnotInInterval(knots, degree, controlPoints, weights, point, tangent, start, end) {
    let bestDeviation = Infinity;
    let bestKnot = null;

    for (let i = Math.floor((start + end) / 2); i >= start && i <= end; i--) {
        let newKnot = evaluateCurveAtParam(curve, i);
        if (deviation(point, newKnot) < bestDeviation) {
            bestDeviation = deviation(point, newKnot);
            bestKnot = i;
        } else if (deviation(point, newKnot) > bestDeviation) {
            break;
        }
    }

    return bestKnot;
}

function deviation(point1, point2) {
    let dx = point1.x - point2.x;
    let dy = point1.y - point2.y;

    return Math.sqrt(dx * dx + dy * dy);
}





// Function: localSurfaceRefinement
/**
 * Refines the local surface around each control point based on the specified tolerance.
 *
 * @param {Object} surface - The surface to refine.
 * @param {number} tolerance - The maximum distance between adjacent points to consider refinement necessary.
 */
function localSurfaceRefinement(surface, tolerance) {
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var controlPoints = surface.controlPoints;
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;

    for (var i = 0; i < knotsU.length - 1; i++) {
        for (var j = 0; j < knotsV.length - 1; j++) {
            var surfacePoint = evaluateSurfaceAtParam(surface, knotsU[i], knotsV[j]);
            var neighborPoints = [
                evaluateSurfaceAtParam(surface, knotsU[i], knotsV[j+1]),
                evaluateSurfaceAtParam(surface, knotsU[i+1], knotsV[j])
            ];

            if (distanceBetweenPoints(surfacePoint, neighborPoints[0]) > tolerance &&
                distanceBetweenPoints(surfacePoint, neighborPoints[1]) > tolerance) {
                // Refine the surface here
                // This is a placeholder for actual refinement logic
                console.log("Refining surface at (" + knotsU[i] + ", " + knotsV[j] + ")");
            }
        }
    }
}

function distanceBetweenPoints(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
}





// Function: loftCurves
/**
* @description Generate a NURBS surface from an array of curves.
* @param {Array} curveList - The list of curves to generate the surface from.
* @returns {NURBSSurface}
*/
function loftCurves(curveList) {
    let controlPoints = [];
    let weights = [];
    let knotsU = [];
    let knotsV = [];

    for (let i = 0; i < curveList.length; i++) {
        let curve = curveList[i];
        let controlPoint = analyzeSurfaceCurvature(curve, 0, 1);
        controlPoints.push(controlPoint);

        weights.push(1);
        knotsU.push(0);
        knotsV.push(i / (curveList.length - 1));
    }

    return createNURBSSurface(2, 1, controlPoints, weights, knotsU, knotsV);
}





// Function: mirrorCurve
/**
 * @param {Curve} curve The original curve to be mirrored.
 * @param {Plane} plane The plane that the curve should be mirrored across.
 * @return {Curve} The new curve, which is a mirror of the input curve.
 */
function mirrorCurve(curve, plane) {
    var controlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        var point = curve.controlPoints[i];
        var mirroredPoint = {
            x: 2 * plane.normal.x * point.z + plane.point.x - 2 * plane.normal.x * point.x,
            y: 2 * plane.normal.y * point.z + plane.point.y - 2 * plane.normal.y * point.y,
            z: 2 * plane.normal.z * point.z + plane.point.z - 2 * plane.normal.z * point.x
        };
        controlPoints.push(mirroredPoint);
    }
    var newCurve = createNURBSCurve(curve.degree, controlPoints, curve.weights, curve.knots);
    return newCurve;
}





// Function: mirrorSurface
/**
 * Creates a mirrored version of the input surface.
 *
 * @param {Object} surface - The original surface to be mirrored.
 * @param {Object} plane - The plane used for mirroring.
 * @return {Object} The mirrored surface.
 */
function mirrorSurface(surface, plane) {
    var newControlPoints = [];
    for (var i = 0; i < surface.controlPoints.length; i++) {
        var point = surface.controlPoints[i];
        var mirroredPoint = {};
        mirroredPoint.x = 2 * plane.normal.x * (plane.point.x - point.x) + point.x;
        mirroredPoint.y = 2 * plane.normal.y * (plane.point.y - point.y) + point.y;
        mirroredPoint.z = 2 * plane.normal.z * (plane.point.z - point.z) + point.z;
        newControlPoints.push(mirroredPoint);
    }
    var newKnotVectorU = surface.knotVectorU.slice();
    var newKnotVectorV = surface.knotVectorV.slice();
    for (var i = 0; i < newKnotVectorU.length; i++) {
        newKnotVectorU[i] = plane.normal.x * (plane.point.x - newKnotVectorU[i]) + newKnotVectorU[i];
    }
    for (var i = 0; i < newKnotVectorV.length; i++) {
        newKnotVectorV[i] = plane.normal.y * (plane.point.y - newKnotVectorV[i]) + newKnotVectorV[i];
    }
    var mirroredSurface = {
        controlPoints: newControlPoints,
        knotVectorU: newKnotVectorU,
        knotVectorV: newKnotVectorV
    };
    return mirroredSurface;
}





// Function: offsetCurve
/**
 * @name offsetCurve
 * @function
 * @param {Object} curve - The original NURBS curve.
 * @param {Number} distance - The distance to offset the curve.
 * @returns {Object} A new NURBS curve that is the offset of the original curve by the specified distance.
 */
function offsetCurve(curve, distance) {
    var newControlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        var point = curve.controlPoints[i];
        var newPoint = {x: point.x + distance * point.z, y: point.y, z: point.z};
        newControlPoints.push(newPoint);
    }
    return createNURBSCurve(curve.degree, newControlPoints, curve.weights, curve.knots);
}





// Function: offsetSurface
/**
 * @name offsetSurface
 * @description Offsets a surface by the given distance.
 * @param {Object} surface The surface to offset.
 * @param {Number} distance The amount of distance to offset the surface.
 * @returns {Object} The updated surface with offset control points.
 */
function offsetSurface(surface, distance) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    for (var i = 0; i < controlPoints.length; i++) {
        controlPoints[i][2] += distance;
    }

    return { degreeU: degreeU, degreeV: degreeV, controlPoints: controlPoints, weights: weights, knotsU: knotsU, knotsV: knotsV };
}





// Function: projectCurveOntoSurface
/**
* Projects a NURBS curve onto a given surface.
*
* @param {NURBS Curve} curve - The curve to project.
* @param {NURBS Surface} surface - The surface to project onto.
* @returns {NURBS Surface} The projected surface.
*/
function projectCurveOntoSurface(curve, surface) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        var point = curve.controlPoints[i];
        var weights = [];
        for (var j = 0; j <= degreeU; j++) {
            weights[j] = deBoorAlgorithm(degreeU, [point], surface.knotsU, i, j);
        }
        controlPoints.push({ x: 0, y: 0, z: 0, weights: weights });
    }
    for (var i = 0; i <= degreeV; i++) {
        var knot = surface.knotsV[i];
        var points = [];
        for (var j = 0; j < controlPoints.length; j++) {
            points.push({ x: controlPoints[j].x, y: controlPoints[j].y, z: controlPoints[j].z });
        }
        var curve = createNURBSCurve(degreeU, points, surface.weightsV, [knot]);
        for (var j = 0; j <= degreeV; j++) {
            weights[j] = deBoorAlgorithm(degreeV, [curve], surface.knotsV, i, j);
        }
        controlPoints.push({ x: 0, y: 0, z: 0, weights: weights });
    }
    var resultSurface = createNURBSSurface(degreeU, degreeV, controlPoints, surface.weightsU, surface.knotsU, surface.knotsV);
    return resultSurface;
}





// Function: refineCurveKnotVector
/**
 * Refine the curve knot vector by adding new knots.
 *
 * @param {Object} curve - The curve object.
 * @param {Array} additionalKnots - The additional knots to add.
 */
function refineCurveKnotVector(curve, additionalKnots) {
    var degree = curve.degree;
    var knots = curve.knots;
    var weights = curve.weights;
    var controlPoints = curve.controlPoints;
    
    for (var i = 0; i < additionalKnots.length; i++) {
        var knot = additionalKnots[i];
        
        // check if the knot is inside the existing knot vector
        var found = false;
        for (var j = 0; j < knots.length; j++) {
            if (knot >= knots[j] && knot <= knots[j + 1]) {
                found = true;
                break;
            }
        }
        
        // add the new knot to the existing knot vector
        if (!found) {
            var kInsertIndex = 0;
            for (var j = 0; j < knots.length; j++) {
                if (knot >= knots[j] && knot <= knots[j + 1]) {
                    kInsertIndex = j;
                    break;
                }
            }
            if (kInsertIndex > 0) {
                for (var j = knots.length - 1; j > kInsertIndex; j--) {
                    knots[j] = knots[j - 1];
                }
            }
            knots.splice(kInsertIndex, 0, knot);
        }
    }
}





// Function: refineSurfaceKnotVector
/**
 * Refine the surface knot vector by adding new knots and removing existing ones.
 *
 * @param {Surface} surface The surface to refine.
 * @param {Array<number>} additionalKnotsU Additional U-knots to add.
 * @param {Array<number>} additionalKnotsV Additional V-knots to add.
 * @return {Surface} The refined surface.
 */
function refineSurfaceKnotVector(surface, additionalKnotsU, additionalKnotsV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var weights = surface.weights;

    for (var i = 0; i < additionalKnotsU.length; i++) {
        if (knotsU.indexOf(additionalKnotsU[i]) === -1) {
            knotsU.push(additionalKnotsU[i]);
        }
    }

    for (var j = 0; j < additionalKnotsV.length; j++) {
        if (knotsV.indexOf(additionalKnotsV[j]) === -1) {
            knotsV.push(additionalKnotsV[j]);
        }
    }

    var newKnotVectorU = [];
    for (var i = 0; i < knotsU.length; i++) {
        if (knotsU[i] < controlPoints[0][0]) {
            newKnotVectorU.push(knotsU[i]);
        } else if (knotsU[i] > controlPoints[knotsU.length - 1][0]) {
            newKnotVectorU.push(knotsU[i]);
        }
    }

    var newKnotVectorV = [];
    for (var j = 0; j < knotsV.length; j++) {
        if (knotsV[j] < controlPoints[0][1]) {
            newKnotVectorV.push(knotsV[j]);
        } else if (knotsV[j] > controlPoints[knotsV.length - 1][1]) {
            newKnotVectorV.push(knotsV[j]);
        }
    }

    surface.knotsU = newKnotVectorU;
    surface.knotsV = newKnotVectorV;

    return surface;
}





// Function: revolveCurve
/**
 * @param {Object} curve - The input curve to revolve.
 * @param {String} axis - The axis around which the curve is revolved (x, y, or z).
 * @param {Number} angle - The angle of rotation in radians.
 * @returns {Object} The resulting NURBS curve after revolution.
 */
function revolveCurve(curve, axis, angle) {
    var controlPoints = [];
    for (var i = 0; i < curve.controlPoints.length; i++) {
        var point = curve.controlPoints[i];
        controlPoints.push({
            x: point.x * Math.cos(angle) - point.z * Math.sin(angle),
            y: point.y,
            z: point.x * Math.sin(angle) + point.z * Math.cos(angle)
        });
    }
    return createNURBSCurve(1, controlPoints, [1], [0]);
}





// Function: shellSurface
/**
* @param {Array} surface - The original surface points.
* @param {Number} thickness - The thickness of the shell surface.
* @return {Array} - The resulting shell surface points.
*/
function shellSurface(surface, thickness) {
    var result = [];
    for (var i = 0; i < surface.length; i++) {
        var point = surface[i];
        var newPoint1 = {x: point.x - thickness, y: point.y, z: point.z};
        var newPoint2 = {x: point.x + thickness, y: point.y, z: point.z};
        result.push(newPoint1);
        result.push(newPoint2);
    }
    return result;
}





// Function: splitCurve
/**
 * @param {Object} curve - Curve object.
 * @param {number} param - Param value.
 * @return {Object} New curve object with updated control points and knots.
 */
function splitCurve(curve, param) {
    var degree = curve.degree;
    var controlPoints = curve.controlPoints;
    var weights = curve.weights;
    var knots = curve.knots;

    for (var i = 0; i < degree; i++) {
        controlPoints[i] /= (weights[0] * (knots[1] - param) + weights[1] * (param - knots[0]));
    }

    for (var i = 0; i < degree; i++) {
        controlPoints[i] *= (weights[0] * (knots[1] - param) + weights[1] * (param - knots[0]));
    }

    var newKnots = [];
    for (var i = 0; i < knots.length; i++) {
        if (knots[i] <= param) {
            newKnots.push(knots[i]);
        } else {
            break;
        }
    }

    for (var i = knots.length - 1; i >= 0; i--) {
        if (knots[i] > param) {
            newKnots.push(knots[i]);
        } else {
            break;
        }
    }

    return { degree: degree, controlPoints: controlPoints, weights: [weights[0], weights[1]], knots: newKnots };
}





// Function: splitSurface
/**
 * Splits a surface into two parts based on the given parameters.
 *
 * @param {Object} surface The surface to split.
 * @param {Number} paramU The parameter U to split by.
 * @param {Number} paramV The parameter V to split by.
 * @return {[Array]} An array of two surfaces, the left and right parts.
 */
function splitSurface(surface, paramU, paramV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    var weights = surface.weights;

    var leftSurface = new Array();
    var rightSurface = new Array();

    for (var i = 0; i < controlPoints.length; i++) {
        var point = controlPoints[i];
        if (point[0] <= paramU) {
            leftSurface.push(point);
        } else if (point[0] > paramV) {
            rightSurface.push(point);
        }
    }

    for (var i = 0; i < knotsU.length; i++) {
        var knot = knotsU[i];
        if (knot <= paramU) {
            leftSurface.push([knot, 0]);
        } else if (knot > paramV) {
            rightSurface.push([knot, 0]);
        }
    }

    for (var i = 0; i < knotsV.length; i++) {
        var knot = knotsV[i];
        if (knot <= paramU) {
            leftSurface.push([0, knot]);
        } else if (knot > paramV) {
            rightSurface.push([0, knot]);
        }
    }

    for (var i = 0; i < weights.length; i++) {
        var weight = weights[i];
        if (weight <= paramU) {
            leftSurface.push(weight);
        } else if (weight > paramV) {
            rightSurface.push(weight);
        }
    }

    return [leftSurface, rightSurface];
}





// Function: surfaceArea
/**
* Calculates the surface area of a given surface.
*
* @param {Object} surface - The surface to calculate the area for.
* @returns {Number} The calculated surface area.
*/
function surfaceArea(surface) {
    let sum = 0;
    for (let u = 0; u <= surface.knotsU.length - 1; u++) {
        for (let v = 0; v <= surface.knotsV.length - 1; v++) {
            let basisU = analyzeSurfaceCurvature(surface, u, v).basis;
            let basisV = analyzeSurfaceCurvature(surface, u, v).basis;
            sum += Math.abs(basisU * basisV);
        }
    }
    return sum;
}





// Function: surfaceBoundingBox
/**
 * Calculate the bounding box of a given surface.
 *
 * @param {Object} surface The surface to calculate the bounding box for.
 * @returns {{x: number, y: number, z: number, width: number, height: number, depth: number}} The bounding box as an object with x, y, z coordinates and width, height, depth values.
 */
function surfaceBoundingBox(surface) {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var minZ = Infinity;
    var maxZ = -Infinity;

    for (var i = 0; i < surface.controlPoints.length; i++) {
        var point = surface.controlPoints[i];
        if (point.x < minX) minX = point.x;
        if (point.x > maxX) maxX = point.x;
        if (point.y < minY) minY = point.y;
        if (point.y > maxY) maxY = point.y;
        if (point.z < minZ) minZ = point.z;
        if (point.z > maxZ) maxZ = point.z;
    }

    return {x: minX, y: minY, z: minZ, width: maxX - minX, height: maxY - minY, depth: maxZ - minZ};
}





// Function: surfaceControlNet
/**
 * Generates a network of control points for a surface.
 *
 * @param {Object} surface The surface object to generate the control point network from.
 * @returns {Array} An array of arrays, where each inner array represents a row in the control point network.
 */
function surfaceControlNet(surface) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;
    
    var net = [];
    for (var i = 0; i < controlPoints.length; i++) {
        var point = controlPoints[i];
        var row = [];
        for (var j = 0; j < controlPoints[0].length; j++) {
            row.push(point[j]);
        }
        net.push(row);
    }
    
    return net;
}





// Function: surfaceDegreeElevation
/**
 * @name surfaceDegreeElevation
 * @param {Object} surface - The surface to modify.
 * @param {number} newDegreeU - The new degree U for the surface.
 * @param {number} newDegreeV - The new degree V for the surface.
 * @returns {Object} The modified surface.
 */
function surfaceDegreeElevation(surface, newDegreeU, newDegreeV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    for (var i = 0; i < controlPoints.length; i++) {
        controlPoints[i].curveDegreeElevation(newDegreeU);
    }

    for (var j = 0; j < weights.length; j++) {
        weights[j] = deBoorAlgorithmSurface(newDegreeU, newDegreeV, controlPoints, knotsU, knotsV, knotsU[j], knotsV[j]);
    }

    surface.degreeU = newDegreeU;
    surface.degreeV = newDegreeV;

    return surface;
}






// Function: surfaceDerivativeAtParam
/**
 * @param {Object} surface - The control point and weight array of the NURBS surface.
 * @param {Number} paramU - The parameter value for U direction.
 * @param {Number} paramV - The parameter value for V direction.
 * @param {Number} orderU - The order of the basis function in U direction.
 * @param {Number} orderV - The order of the basis function in V direction.
 * @returns {Object} The derivative of the NURBS surface at the given parameter values.
 */
function surfaceDerivativeAtParam(surface, paramU, paramV, orderU, orderV) {
    var basisFunctions = [];
    for (var i = 0; i < surface.controlPoints.length; i++) {
        basisFunctions.push([]);
        for (var j = 0; j < surface.weights[i].length; j++) {
            basisFunctions[i].push({
                x: surface.controlPoints[i][0] * surface.weights[i][j],
                y: surface.controlPoints[i][1] * surface.weights[i][j],
                z: surface.controlPoints[i][2] * surface.weights[i][j]
            });
        }
    }
    var derivativeU = {
        x: 0,
        y: 0,
        z: 0
    };
    var derivativeV = {
        x: 0,
        y: 0,
        z: 0
    };
    for (var i = 0; i < surface.controlPoints.length; i++) {
        for (var j = 0; j < surface.weights[i].length; j++) {
            var basisU = basisFunctions[i][j];
            var basisV = basisFunctions[i + 1][j] ? basisFunctions[i + 1][j] : { x: 0, y: 0, z: 0 };
            var derivativeUU = {
                x: surface.weights[i][j] * (basisU.x - basisV.x),
                y: surface.weights[i][j] * (basisU.y - basisV.y),
                z: surface.weights[i][j] * (basisU.z - basisV.z)
            };
            var derivativeVV = {
                x: 0,
                y: 0,
                z: 0
            };
            for (var k = 0; k < surface.controlPoints.length; k++) {
                for (var l = 0; l < surface.weights[k].length; l++) {
                    var basisUU = basisFunctions[k][l];
                    var basisVV = basisFunctions[k + 1][l] ? basisFunctions[k + 1][l] : { x: 0, y: 0, z: 0 };
                    derivativeVV.x += surface.weights[k][l] * (basisUU.x - basisVV.x);
                    derivativeVV.y += surface.weights[k][l] * (basisUU.y - basisVV.y);
                    derivativeVV.z += surface.weights[k][l] * (basisUU.z - basisVV.z);
                }
            }
            derivativeU.x += derivativeUU.x;
            derivativeU.y += derivativeUU.y;
            derivativeU.z += derivativeUU.z;
            derivativeV.x += derivativeVV.x / Math.pow(surface.knotsU[paramU], orderU + 1);
            derivativeV.y += derivativeVV.y / Math.pow(surface.knotsU[paramU], orderU + 1);
            derivativeV.z += derivativeVV.z / Math.pow(surface.knotsU[paramU], orderU + 1);
        }
    }
    return {
        x: derivativeU.x * surface.weights[paramU][0],
        y: derivativeU.y * surface.weights[paramU][0],
        z: derivativeU.z * surface.weights[paramU][0]
    };
}





// Function: surfaceKnotInsertion
/**
 * @param {Surface} surface 
 * @param {Array} knotU 
 * @param {Array} knotV 
 */ 

/**
 * Inserts knots into a Bezier surface.
 *
 * This method can be implemented based on the specific needs of your application.
 */
function surfaceKnotInsertion(surface, knotU, knotV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    // Your implementation here
}






// Function: surfaceNormalAtParam
/**
 * Calculates the surface normal at a given parameterized position (u, v) on a NURBS surface.
 *
 * @param {NURBS.Surface} surface - The NURBS surface to calculate the normal for.
 * @param {number} paramU - The U parameter value.
 * @param {number} paramV - The V parameter value.
 * @returns {Array.<number>} The surface normal at the given position (u, v).
 */
function surfaceNormalAtParam(surface, paramU, paramV) {
    let du = [];
    let dv = [];
    for (let i = 0; i < surface.controlPoints.length; i++) {
        let controlPoint = surface.controlPoints[i];
        du.push([controlPoint[0], controlPoint[1], controlPoint[2]]);
        dv.push([controlPoint[3], controlPoint[4], controlPoint[5]]);
    }
    for (let i = 0; i < surface.weights.length; i++) {
        let weight = surface.weights[i];
        for (let j = 0; j < du.length; j++) {
            du[j][0] += weight * surface.controlPoints[i][6] * surface.knotsU[i + 1] - surface.knotsU[i];
            du[j][1] += weight * surface.controlPoints[i][7] * surface.knotsU[i + 1] - surface.knotsU[i];
            du[j][2] += weight * surface.controlPoints[i][8] * surface.knotsU[i + 1] - surface.knotsU[i];
        }
        for (let j = 0; j < dv.length; j++) {
            dv[j][0] += weight * surface.controlPoints[i][9] * surface.knotsV[j + 1] - surface.knotsV[j];
            dv[j][1] += weight * surface.controlPoints[i][10] * surface.knotsV[j + 1] - surface.knotsV[j];
            dv[j][2] += weight * surface.controlPoints[i][11] * surface.knotsV[j + 1] - surface.knotsV[j];
        }
    }
    let normal = [0, 0, 0];
    for (let i = 0; i < du.length; i++) {
        for (let j = 0; j < dv.length; j++) {
            normal[0] += du[i][0] * dv[j][1] - dv[i][0] * du[j][1];
            normal[1] += du[i][1] * dv[j][2] - dv[i][1] * du[j][2];
            normal[2] += du[i][2] * dv[j][0] - dv[i][2] * du[j][0];
        }
    }
    return [normal[0], normal[1], normal[2]];
}






// Function: surfacePointProjection
/**
 * @param {Object} surface - the NURBS surface to project onto
 * @param {Object} point - the 3D point to project
 * @returns {Object} - the projected 2D point and its closest distance from the surface, or null if no close enough points were found
 */
function surfacePointProjection(surface, point) {
  var u = 0;
  var v = 0;
  var minDistance = Infinity;
  var closestPoint = null;

  for (var i = 0; i < surface.knotsU.length - 1; i++) {
    for (var j = 0; j < surface.knotsV.length - 1; j++) {
      var uVal = surface.deBoorAlgorithmSurface(surface.degreeU, surface.controlPoints, surface.knotsU, surface.knotsV, i, j);
      var vVal = surface.deBoorAlgorithmSurface(surface.degreeV, surface.controlPoints, surface.knotsU, surface.knotsV, i, j);

      if (Math.abs(point.x - uVal) + Math.abs(point.y - vVal) <= 0.001) {
        return {x: point.x, y: point.y, z: evaluateSurfaceAtParam(surface, u, v)};
      }

      var distance = Math.pow(evaluateSurfaceAtParam(surface, i + (u - surface.knotsU[0]) / (surface.knotsU[i + 1] - surface.knotsU[0])), 2) +
        Math.pow(evaluateSurfaceAtParam(surface, j + (v - surface.knotsV[0]) / (surface.knotsV[j + 1] - surface.knotsV[0])), 2);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = {x: evaluateSurfaceAtParam(surface, u), y: evaluateSurfaceAtParam(surface, v), z: evaluateSurfaceAtParam(surface, u, v)};
      }
    }
  }

  return closestPoint;
}





// Function: surfaceReparameterization
/**
 * @param {Surface} surface The input surface.
 * @param {Array<number>} newKnotVectorU The new knot vector for the U direction.
 * @param {Array<number>} newKnotVectorV The new knot vector for the V direction.
 * @returns {{controlPoints: Array<Array<number>>, weights: Array<number>, degreeU: number, degreeV: number, knotsU: Array<number>, knotsV: Array<number>}} The updated surface information.
function surfaceReparameterization(surface, newKnotVectorU, newKnotVectorV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    for (var i = 0; i < newKnotVectorU.length; i++) {
        if (newKnotVectorU[i] > knotsU[degreeU]) {
            for (var j = degreeU; j >= 0; j--) {
                controlPoints[j][1] = deBoorAlgorithm(degreeU, controlPoints[j], knotsU, newKnotVectorU[i], 1);
                weights[j] = weights[j] * controlPoints[j][2];
            }
        } else if (newKnotVectorU[i] < knotsU[0]) {
            for (var j = degreeU; j >= 0; j--) {
                controlPoints[j][1] = deBoorAlgorithm(degreeU, controlPoints[j], knotsU, newKnotVectorU[i], 1);
                weights[j] = weights[j] * controlPoints[j][2];
            }
        }
    }

    for (var i = 0; i < newKnotVectorV.length; i++) {
        if (newKnotVectorV[i] > knotsV[degreeV]) {
            for (var j = degreeV; j >= 0; j--) {
                controlPoints[j][2] = deBoorAlgorithm(degreeV, controlPoints[j][1], knotsV, newKnotVectorV[i], 1);
                weights[j] = weights[j] * controlPoints[j][2];
            }
        } else if (newKnotVectorV[i] < knotsV[0]) {
            for (var j = degreeV; j >= 0; j--) {
                controlPoints[j][2] = deBoorAlgorithm(degreeV, controlPoints[j][1], knotsV, newKnotVectorV[i], 1);
                weights[j] = weights[j] * controlPoints[j][2];
            }
        }
    }

    return { controlPoints: controlPoints, weights: weights, degreeU: degreeU, degreeV: degreeV, knotsU: newKnotVectorU, knotsV: newKnotVectorV };
}






// Function: surfaceSubdivision
/**
 * Subdivides the given surface at the specified parametric coordinates (U, V).
 *
 * @param {Object} surface The surface to be subdivided.
 * @param {Number} paramU The U-coordinate of the subdivision point.
 * @param {Number} paramV The V-coordinate of the subdivision point.
 * @returns {Object} The new control points, weights, and knots for the subdivided surface.
 */
function surfaceSubdivision(surface, paramU, paramV) {
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;
    var controlPoints = surface.controlPoints;
    var weights = surface.weights;
    var knotsU = surface.knotsU;
    var knotsV = surface.knotsV;

    var newControlPoints = [];
    for (var i = 0; i < controlPoints.length; i++) {
        if ((knotsU[i] <= paramU && paramU <= knotsU[i + degreeU]) &&
            (knotsV[0] <= paramV && paramV <= knotsV[knotsV.length - 1])) {
            newControlPoints.push({
                x: controlPoints[i].x,
                y: controlPoints[i].y,
                z: controlPoints[i].z
            });
        }
    }

    var newWeights = [];
    for (var i = 0; i < weights.length; i++) {
        if ((knotsU[i] <= paramU && paramU <= knotsU[i + degreeU]) &&
            (knotsV[0] <= paramV && paramV <= knotsV[knotsV.length - 1])) {
            newWeights.push(weights[i]);
        }
    }

    var newKnotsU = [];
    for (var i = 0; i < knotsU.length; i++) {
        if (knotsU[i] <= paramU && paramU <= knotsU[i + degreeU]) {
            newKnotsU.push(knotsU[i]);
        }
    }

    var newKnotsV = [];
    for (var i = 0; i < knotsV.length; i++) {
        if (knotsV[i] <= paramV && paramV <= knotsV[i + degreeV]) {
            newKnotsV.push(knotsV[i]);
        }
    }

    return { controlPoints: newControlPoints, weights: newWeights, knotsU: newKnotsU, knotsV: newKnotsV };
}





// Function: surfaceToMesh
/**
 * Converts a surface into a mesh.
 *
 * @param {Object} surface - The surface to convert.
 * @param {Number} tolerance - The maximum distance between points in the mesh.
 * @return {Array} The resulting mesh.
 */
```
function surfaceToMesh(surface, tolerance) {
    var knotVectorU = surface.knotsU;
    var knotVectorV = surface.knotsV;
    var controlPoints = surface.controlPoints;
    var degreeU = surface.degreeU;
    var degreeV = surface.degreeV;

    var mesh = [];

    for (var u = 0; u <= knotVectorU.length - 1; u++) {
        for (var v = 0; v <= knotVectorV.length - 1; v++) {
            var point = evaluateSurfaceAtParam(surface, u, v);
            if (!mesh.some(function(m) { return distance(m, point) < tolerance })) {
                mesh.push(point);
            }
        }
    }

    return mesh;
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
}





// Function: sweepCurve
/**
* Creates a swept surface along a given curve.
*
* @param {Curve} curve The curve to sweep along.
* @param {Path} path The path defining the distance between control points.
* @return {Surface} The generated surface.
*/
function sweepCurve(curve, path) {
    var surface = createNURBSSurface(1, 1, [[0, 0, 0], [curve.length(), 0, 0]], [[0], []], [0, curve.length()], [[0]]);
    for (var i = 0; i < curve.length(); i++) {
        var controlPoint = curve.evaluateAtParam(i);
        createRuledSurface(surface, surface, [{x: controlPoint.x, y: controlPoint.y, z: controlPoint.z}], {radius: path.distanceToNextPoint(i)});
    }
    return surface;
}





// Function: trimCurve
/**
* Trims the control points, weights and knots of a Bezier curve to a specified range.
*
* @param {Object} curve The Bezier curve object.
* @param {Number} paramStart The start parameter value (inclusive).
* @param {Number} paramEnd The end parameter value (inclusive).
* @returns {Object} A new curve with trimmed control points, weights and knots.
*/
function trimCurve(curve, paramStart, paramEnd) {
    var startKnot = null;
    var endKnot = null;

    for (var i = 0; i < curve.knots.length; i++) {
        if (curve.knots[i] >= paramStart && startKnot === null) {
            startKnot = i;
        }
        if (curve.knots[i] >= paramEnd && endKnot === null) {
            endKnot = i;
        }
    }

    if (startKnot === null || endKnot === null) {
        throw new Error("Invalid parameter range");
    }

    var startWeight = 0;
    for (var i = startKnot; i < curve.knots.length && startWeight === 0; i++) {
        if (curve.knots[i] >= paramStart) {
            startWeight = curve.weights[i];
        }
    }

    var endWeight = 0;
    for (var i = endKnot - 1; i >= 0 && endWeight === 0; i--) {
        if (curve.knots[i] <= paramEnd) {
            endWeight = curve.weights[i];
        }
    }

    var newControlPoints = [];
    var newWeights = [];
    var newKnots = [];

    for (var i = startKnot; i < endKnot; i++) {
        newControlPoints.push(curve.controlPoints[i]);
        newWeights.push(startWeight);
        if (curve.knots[i] !== curve.knots[startKnot]) {
            newKnots.push(curve.knots[i]);
        }
    }

    return { controlPoints: newControlPoints, weights: newWeights, knots: newKnots };
}





// Function: trimSurface
/**
 * Trims the surface control points to only those that lie within a given boundary curve.
 *
 * @param {Object} surface The NURBS surface to trim.
 * @param {Object} boundaryCurve The boundary curve used for trimming.
 * @return {Object} The trimmed surface.
 */
function trimSurface(surface, boundaryCurve) {
    var surfaceKnotsU = surface.knotsU;
    var surfaceKnotsV = surface.knotsV;
    var surfaceDegreeU = surface.degreeU;
    var surfaceDegreeV = surface.degreeV;
    var surfaceControlPoints = surface.controlPoints;
    var boundaryKnots = boundaryCurve.knots;
    var boundaryDegree = boundaryCurve.degree;
    var boundaryControlPoints = boundaryCurve.controlPoints;

    for (var i = 0; i < surfaceControlPoints.length; i++) {
        var point = surfaceControlPoints[i];
        if (!pointOutsideBoundary(point, boundaryKnots, boundaryControlPoints)) {
            surfaceControlPoints.splice(i, 1);
            i--;
        }
    }

    function pointOutsideBoundary(point, boundaryKnots, boundaryControlPoints) {
        for (var j = 0; j < boundaryControlPoints.length - 1; j++) {
            var controlPoint1 = boundaryControlPoints[j];
            var controlPoint2 = boundaryControlPoints[j + 1];
            if (point.x >= Math.min(controlPoint1.x, controlPoint2.x) &&
                point.x <= Math.max(controlPoint1.x, controlPoint2.x) &&
                point.y >= Math.min(controlPoint1.y, controlPoint2.y) &&
                point.y <= Math.max(controlPoint1.y, controlPoint2.y)) {
                continue;
            }
            return true;
        }
        return false;
    }

    surface.knotsU = surfaceKnotsU;
    surface.degreeU = surfaceDegreeU;
    surface.controlPoints = surfaceControlPoints;

    return surface;
}






