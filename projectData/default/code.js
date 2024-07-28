// Function: Curve
 /**
 * Represents a curve defined by an array of points.
 * @constructor
 * @param {Array} [points] - The initial points that define the curve.
 * @property {Array} points - The array of points defining the curve.
 * @method getPoints - Returns the current points of the curve.
 * @method setPoint - Sets a point at a specific index in the curve's points array.
 */
function Curve(points) {
    this.points = points || [];
    this.getPoints = function () {
        return this.points;
    };
    this.setPoint = function (i, point) {
        if (i >= 0 && i < this.points.length) {
            this.points[i] = point;
        }
    };
}





// Function: Edge
 /**
 * Represents an edge in a graph or geometric structure connecting two vertices.
 * @constructor
 * @param {number[]} vertex1 - The coordinates of the first vertex as an array [x, y, z].
 * @param {number[]} vertex2 - The coordinates of the second vertex as an array [x, y, z].
 * @property {Object} vertexA - The first vertex with its x, y, and z coordinates.
 * @property {Object} vertexB - The second vertex with its x, y, and z coordinates.
 */
function Edge(vertex1, vertex2) {
    this.vertexA = {
        x: vertex1[0],
        y: vertex1[1],
        z: vertex1[2]
    };
    this.vertexB = {
        x: vertex2[0],
        y: vertex2[1],
        z: vertex2[2]
    };
}





// Function: Face
 /**
 * Constructs a new face by finding intersections between edges of the surface and given loops.
 * @param {Object} surface - The surface object containing edges and shells.
 * @param {Array<{vertex1: Object, vertex2: Object}>} loops - An array of loop objects with vertices.
 */

function Face(surface, loops) {
  const vertices = [];
  for (let i = 0; i < loops.length; i++) {
    const edge = {v1: loops[i].vertex1, v2: loops[i].vertex2};
    for (const edge2 of surface.edges) {
      if ((edge.v1.x === edge2.v1.x && edge.v1.y === edge2.v1.y && edge.v1.z === edge2.v1.z &&
           edge.v2.x === edge2.v2.x && edge.v2.y === edge2.v2.y && edge.v2.z === edge2.v2.z) ||
          (edge.v1.x === edge2.v2.x && edge.v1.y === edge2.v2.y && edge.v1.z === edge2.v2.z &&
           edge.v2.x === edge2.v1.x && edge.v2.y === edge2.v1.y && edge.v2.z === edge2.v1.z)) {
        const intersection = {x: (edge.v1.x + edge.v2.x) / 2, y: (edge.v1.y + edge.v2.y) / 2, z: (edge.v1.z + edge.v2.z) / 2};
        vertices.push(intersection);
      }
    }
  }
  surface.shells[0].faces.push({vertices});
}





// Function: Loop
 /**
 * Creates a loop from an array of edges by checking for intersections and ensuring each edge is unique in the loop.
 * @param {Array<[number, number]>} edges - An array of edges represented as pairs of coordinates.
 * @returns {Array<[[number, number], [number, number]]>} An array of unique edge pairs forming a loop.
 */
function Loop(edges){let result=[];for(let i=0;i<edges.length;i++){const currentEdge=edges[i];const nextEdge=edges[(i+1)%edges.length];if(!findIntersection(currentEdge,nextEdge)){result.push([currentEdge,nextEdge]);}else{console.error(`Intersection detected between edge ${i} and edge ${(i+1)%edges.length}. Loop creation interrupted.`);break;}}return result;}





// Function: Matrix
 /**
 * Represents a matrix with elements provided during construction.
 * @constructor
 * @param {Array<Array<number>>} elements - The elements of the matrix.
 *
 * @method times
 * @param {Matrix} other - The matrix to multiply with.
 * @returns {Matrix} A new Matrix instance representing the product of this and the other matrix.
 */
function Matrix(elements) {
  this.elements = elements;
  this.times = function(other) {
    var result = [];
    for (var i = 0; i < elements.length; i++) {
      result[i] = [];
      for (var j = 0; j < other.elements[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < elements[0].length; k++) {
          sum += elements[i][k] * other.elements[k][j];
        }
        result[i].push(sum);
      }
    }
    return new Matrix(result);
  };
}





// Function: Point
 /**
 * Represents a point in three-dimensional space with x, y, and z coordinates.
 * @constructor
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @param {number} z - The z coordinate of the point.
 * @returns {Object} An object with properties x, y, and z representing the coordinates of the point.
 */
function Point(x, y, z) {
  return { x, y, z };
}





// Function: Shell
 /**
 * Represents a shell containing multiple faces.
 * @constructor
 * @param {Array<Object>} faces - The initial faces to be included in the shell.
 */
function Shell(faces) {
  this._faces = Array.isArray(faces) ? faces : [faces];
}

/**
 * Retrieves the array of faces contained within the shell.
 * @returns {Array<Object>} - The array of faces.
 */
Shell.prototype.getFaces = function() {
  return this._faces;
};

/**
 * Sets a new array of faces for the shell.
 * @param {Array<Object>} newFaces - The new array of faces to be set.
 */
Shell.prototype.setFaces = function(newFaces) {
  this._faces = newFaces instanceof Array ? newFaces : [newFaces];
};

/**
 * Creates a clone of the shell, including all its faces.
 * @returns {Shell} - A new Shell object with the same faces as the original.
 */
Shell.prototype.clone = Shell.prototype.cloneCurve = function() {
  return new Shell(this._faces);
};
function Shell(faces) {
  this._faces = Array.isArray(faces) ? faces : [faces];
}

Shell.prototype.getFaces = function() {
  return this._faces;
};

Shell.prototype.setFaces = function(newFaces) {
  this._faces = newFaces instanceof Array ? newFaces : [newFaces];
};

Shell.prototype.clone = Shell.prototype.cloneCurve = function() {
  return new Shell(this._faces);
};





// Function: Solid
 /**
 * Calculates the volume of a solid object represented by an array of shells.
 * @param {Array} Shells - An array of shell objects, each with methods to calculate its area and normal vector.
 * @returns {number} The calculated volume of the solid.
 */
function Solid(Shells) {
  let volume = 0;
  for (let i = 0; i < Shells.length; i++) {
      const shell = Shells[i];
      volume += shell.area() * Math.abs(shell.normal().dot(new Point(0, 0, 1)));
  }
  return volume;
}





// Function: Surface
 /**
 * Represents a surface defined by an array of control points.
 * @constructor
 * @param {Array<{x: number, y: number, z: number}>} controlPoints - The array of control points defining the surface.
 */

function Surface(controlPoints) {
    this.controlPoints = controlPoints;
}

/**
 * Generates a curve based on the control points of the surface.
 * @returns {Array<{x: number, y: number, z: number}>} An array of objects representing the curve segments between consecutive control points.
 */
Surface.prototype.getCurve = function() {
    let curve = [];
    for (let i = 0; i < this.controlPoints.length - 1; i++) {
        curve.push({x: this.controlPoints[i].x, y: this.controlPoints[i].y, z: this.controlPoints[i].z});
        curve.push({x: this.controlPoints[i].x, y: this.controlPoints[i].y, z: this.controlPoints[i + 1].z});
    }
    return curve;
};
function Surface(controlPoints) {
    this.controlPoints = controlPoints;
}

Surface.prototype.getCurve = function() {
    let curve = [];
    for (let i = 0; i < this.controlPoints.length - 1; i++) {
        curve.push({x: this.controlPoints[i].x, y: this.controlPoints[i].y, z: this.controlPoints[i].z});
        curve.push({x: this.controlPoints[i].x, y: this.controlPoints[i].y, z: this.controlPoints[i + 1].z});
    }
    return curve;
};





// Function: Vector
 /**
 * Represents a three-dimensional vector with x, y, and z components.
 * @constructor
 * @param {number} x - The x coordinate of the vector.
 * @param {number} y - The y coordinate of the vector.
 * @param {number} z - The z coordinate of the vector.
 */
function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

/**
 * Adds two vectors and returns a new vector as the result.
 * @param {Vector} vector2 - The vector to add to the current vector.
 * @returns {Vector} A new Vector object representing the sum of the two vectors.
 */
Vector.prototype.add = function(vector2) {
    return new Vector(this.x + vector2.x, this.y + vector2.y, this.z + vector2.z);
};

/**
 * Subtracts another vector from the current vector and returns a new vector as the result.
 * @param {Vector} vector2 - The vector to subtract from the current vector.
 * @returns {Vector} A new Vector object representing the difference of the two vectors.
 */
Vector.prototype.subtract = function(vector2) {
    return new Vector(this.x - vector2.x, this.y - vector2.y, this.z - vector2.z);
};
function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector.prototype.add = function(vector2) {
    return new Vector(this.x + vector2.x, this.y + vector2.y, this.z + vector2.z);
};

Vector.prototype.subtract = function(vector2) {
    return new Vector(this.x - vector2.x, this.y - vector2.y, this.z - vector2.z);
};





// Function: Vertex
 /**
 * Represents a vertex in three-dimensional space with coordinates (x, y, z).
 * @constructor
 * @param {Object} point - The point object containing the x, y, and z coordinates.
 * @param {number} point.x - The x coordinate of the vertex.
 * @param {number} point.y - The y coordinate of the vertex.
 * @param {number} point.z - The z coordinate of the vertex.
 */
function Vertex(point) {
  this.x = point.x;
  this.y = point.y;
  this.z = point.z;
}





// Function: addEdge
 /**
 * Adds an edge to a solid by creating new vertices and adding them to the solid's vertex list.
 * @param {Object} solid - The solid object to which the edge will be added.
 * @param {Object} edge - The edge object containing vertex information.
 * @param {Object} edge.vertex1 - The first vertex of the edge.
 * @param {number} edge.vertex1.x - The x-coordinate of the first vertex.
 * @param {number} edge.vertex1.y - The y-coordinate of the first vertex.
 * @param {number} edge.vertex1.z - The z-coordinate of the first vertex.
 * @param {Object} edge.vertex2 - The second vertex of the edge.
 * @param {number} edge.vertex2.x - The x-coordinate of the second vertex.
 * @param {number} edge.vertex2.y - The y-coordinate of the second vertex.
 * @param {number} edge.vertex2.z - The z-coordinate of the second vertex.
 * @param {Array} solid.vertices - The array of vertices in the solid to which new vertices will be added.
 */
function addEdge(solid, edge) {
  let newVertex1 = {x: edge.vertex1.x, y: edge.vertex1.y, z: edge.vertex1.z};
  let newVertex2 = {x: edge.vertex2.x, y: edge.vertex2.y, z: edge.vertex2.z};
  
  solid.vertices.push(newVertex1);
  solid.vertices.push(newVertex2);
}





// Function: addFace
 /**
 * Adds a face to the shell's faces array and returns the modified shell object.
 * @param {Object} shell - The shell object which contains the faces array.
 * @param {string} face - The face string to be added to the faces array.
 * @returns {Object} - The updated shell object with the new face added.
 */
function addFace(shell, face) {
  shell.faces = [...shell.faces, face];
  return shell;
}





// Function: addLoop
 /**
 * Adds a loop to the given face object.
 * If the face does not have a 'loops' property or it is not an array, initializes it as an empty array.
 * Then pushes the provided loop into the 'loops' array of the face.
 * @param {Object} face - The face object to which the loop will be added.
 * @param {Array} loop - The loop to add to the face.
 */
function addLoop(face, loop) {
  if (!("loops" in face) || !Array.isArray(face.loops)) face.loops = [];
  face.loops.push(loop);
}





// Function: addShell
 /**
 * Adds a shell to the given solid object.
 * @param {Object} solid - The original solid object which contains at least properties x, y, z and shells.
 * @param {Object} shell - The shell object to be added to the solid's shells array.
 * @returns {Object} newSolid - A new solid object with the additional shell in its shells array.
 */
function addShell(solid, shell) {
    var newSolid = {x: solid.x, y: solid.y, z: solid.z, shells: [...solid.shells, shell]};
    return newSolid;
}





// Function: addVectors
 /**
 * Adds two vectors component-wise and returns the result as a new vector.
 * @param {Object} v1 - The first vector with properties x, y, and z.
 * @param {Object} v2 - The second vector with properties x, y, and z.
 * @returns {Object} A new vector that is the sum of v1 and v2.
 */
function addVectors(v1, v2) {
    return {x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z};
}





// Function: addVertex
 /**
 * Adds a vertex to the last shell in the given solid object.
 * @param {Object} solid - The solid object containing shells and vertices.
 * @param {Array} vertex - The vertex array to be added to the last shell's faces.
 */
function addVertex(solid, vertex) {
    solid.shell.push({});
    var lastShell = solid.shell[solid.shell.length - 1];
    if (!lastShell.faces) {
        lastShell.faces = [];
    }
    lastShell.faces.push({ vertices: [vertex] });
}





// Function: cloneCurve
 /**
 * Clones a curve by creating a deep copy of its points.
 * @param {Object} curve - The original curve object containing an array of point objects with x, y, and z properties.
 * @returns {Object} - Returns a new object containing the cloned points array.
 */
function cloneCurve(curve) {
    const clonedPoints = curve.points.map(point => ({ x: point.x, y: point.y, z: point.z }));
    return { points: clonedPoints };
}





// Function: cloneMatrix
 /**
 * Creates a deep clone of the given matrix.
 * @param {Array<Array<number>>} matrix - The input matrix to be cloned.
 * @returns {{x: Array<Array<number>>, y: Array<Array<number>>, z: Array<Array<number>}} - A new object containing three copies of the original matrix.
 */
function cloneMatrix(matrix) {
    var result = [];
    for (var i = 0; i < matrix.length; i++) {
        result[i] = [];
        for (var j = 0; j < matrix[0].length; j++) {
            result[i][j] = matrix[i][j];
        }
    }
    return {x: result, y: result, z: result};
}





// Function: clonePoint
 /**
 * Clones a point object by creating a new object with the same x, y, and z properties as the original.
 * @param {Object} point - The point object to be cloned.
 * @param {number} point.x - The x-coordinate of the point.
 * @param {number} point.y - The y-coordinate of the point.
 * @param {number} point.z - The z-coordinate of the point (optional).
 * @returns {Object} A new object with the same properties as the original point.
 */
function clonePoint(point) {
  return {x: point.x, y: point.y, z: point.z};
}





// Function: cloneSolid
 /**
 * Clones the given solid by creating a deep copy of its shells and their associated faces, loops, edges, and vertices.
 * @param {Solid} solid - The solid to be cloned.
 * @returns {Solid} A new Solid instance with cloned shells and their contents.
 */
function cloneSolid(solid) {
    const shells = solid.shells.map(shell => ({
        faces: shell.faces.map(face => ({
            controlPoints: face.controlPoints,
            loops: face.loops.map(loop => ({
                edges: loop.edges.length ? [new Edge(loop.edges[0])] : [],
                vertices: []
            }))
        }))
    }));
    return new Solid([], shells);
}





// Function: cloneSurface
 /**
 * Clones a surface array and its nested points, preserving the x, y, z coordinates of each point.
 * @param {Array<Array<{x: number, y: number, z: number}>>} surface - The surface to be cloned.
 * @returns {{data: Array<Array<{x: number, y: number, z: number}>}} - A clone of the input surface with nested points.
 */
function cloneSurface(surface) {
  let result = [];
  for (let i = 0; i < surface.length; i++) {
    let point = [];
    for (let j = 0; j < surface[i].length; j++) {
      point.push({x: surface[i][j].x, y: surface[i][j].y, z: surface[i][j].z});
    }
    result.push(point);
  }
  return {data: result};
}





// Function: cloneVector
 /**
 * Clones a vector object by creating a new object with the same x, y, and z properties as the original.
 * @param {Object} vector - The vector object to be cloned.
 * @param {number} vector.x - The x-coordinate of the vector.
 * @param {number} vector.y - The y-coordinate of the vector.
 * @param {number} vector.z - The z-coordinate of the vector.
 * @returns {Object} A new object with the same properties as the input vector.
 */
function cloneVector(vector) {
  return { x: vector.x, y: vector.y, z: vector.z };
}





// Function: createCone
 /**
 * Generates a cone with specified base and top radii and height.
 * @param {number} baseRadius - The radius of the base of the cone.
 * @param {number} topRadius - The radius of the top of the cone.
 * @param {number} height - The vertical distance from the base to the top of the cone.
 * @returns {[Array<[number, number, number]>, Array<{faces: [{x: number, y: number}], shell: number}>]} An array containing two elements:
 *  1. A list of points representing the surface of the cone.
 *  2. A list of faces that form the solid structure of the cone.
 */
function createCone(baseRadius, topRadius, height) {
  const surface = [];
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j < 2; j++) {
      if (j === 0) {
        let z = baseRadius;
      } else {
        let z = height - topRadius * Math.sqrt(3) / 2;
      }
      surface.push([i, j, z]);
    }
  }
  const solid = [];
  solid.push({faces: [[{x: 0, y: 0}, {x: 1, y: 0}, {x: 0.5, y: Math.sqrt(3) / 2}]], shell: 0});
  return [surface, solid];
}





// Function: createCylinder
 /**
 * Creates a cylinder with the specified radius and height.
 * @param {number} radius - The radius of the cylinder's circular bases.
 * @param {number} height - The height of the cylinder.
 * @returns {Object} - A mesh representing the cylinder, composed of an extruded base profile and a revolved top profile.
 */
function createCylinder(radius, height) {
    const topBase = {
        x: 0,
        y: 0,
        z: height / 2
    };
    const bottomBase = {
        x: 0,
        y: 0,
        z: -height / 2
    };
    const baseProfile = [
        {
            x: radius,
            y: 0
        },
        {
            x: -radius,
            y: 0
        }
    ];
    const topProfile = [
        {
            x: radius,
            y: height
        },
        {
            x: -radius,
            y: height
        }
    ];
    return extrude(baseProfile, {
        x: 0,
        y: 1,
        z: 0
    }, height).union(revolve(topProfile, {
        x: 0,
        y: 1,
        z: 0
    }, Math.PI * 2));
}





// Function: createPrism
 /**
 * Creates a prism with the given base and height.
 * @param {Object} base - The base point of the prism, represented as an object with x, y, and z coordinates.
 * @param {number} base.x - The x-coordinate of the base point.
 * @param {number} base.y - The y-coordinate of the base point.
 * @param {number} height - The height of the prism.
 * @returns {Object} - A solid object representing the prism, with shell and surfaces properties.
 */
function createPrism(base, height) {
  const basePoint = {x:base.x, y:base.y, z:0};
  const topPoint = {x:base.x, y:base.y, z:height};
  const faceSurface = [{points:[basePoint, topPoint], curve:[1]}];
  const shell = [{surfaces:faceSurface, curves:[]}];
  const solid = [{shell:shell}];
  extrude({profile:faceSurface[0]}, {axis: 'z'}, height);
  return solid[0];
}





// Function: createSphere
 /**
 * Creates a sphere object with the given radius.
 * @param {number} radius - The radius of the sphere.
 * @returns {Object} - A solid object representing the sphere, including its type and contents.
 */
function createSphere(radius) {
    const controlPoints = [{x:-radius, y:-radius*Math.sqrt(3)/2, z:0},{x:radius, y:-radius*Math.sqrt(3)/2, z:0},{x:0, y:radius*Math.sqrt(3)/2, z:0}];
    const surface = {controlPoints};
    return {type:"Solid", contents:[{type:"Shell", contents:[{type:"Loop", edges:[]}, {type:"Face4", vertices:controlPoints}]}]};
}





// Function: createTorus
 /**
 * Creates a torus shape given the major and minor radii.
 * @param {number} majorRadius - The radius of the tube around the central axis.
 * @param {number} minorRadius - The radius of the cross-section of the tube.
 * @returns {{surface: Array<[Object, Object]>}} - An object containing an array of line segments forming the surface of the torus.
 */
function createTorus(majorRadius, minorRadius) {
    const profilePoints = [];
    for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 150) {
        let phi = Math.acos(Math.cos(theta) - 0.5);
        let x = majorRadius + minorRadius * Math.sin(phi);
        let y = minorRadius * Math.cos(phi);
        profilePoints.push({x, y});
    }
    const surface = [];
    for (let i = 0; i < profilePoints.length; i++) {
        surface.push([profilePoints[i], profilePoints[(i + 1) % profilePoints.length]]);
    }
    return {surface};
}





// Function: crossProduct
 /**
 * Computes the cross product of two vectors in three-dimensional space.
 * @param {Object} v1 - The first vector with properties x, y, and z.
 * @param {Object} v2 - The second vector with properties x, y, and z.
 * @returns {Object} A new vector representing the cross product of v1 and v2, with properties x, y, and z.
 */
function crossProduct(v1, v2) { let x = v1.y * v2.z - v1.z * v2.y; let y = v1.z * v2.x - v1.x * v2.z; let z = v1.x * v2.y - v1.y * v2.x; return { x: x, y: y, z: z }; }





// Function: dotProduct
 /**
 * Calculates the dot product of two vectors in three-dimensional space.
 * @param {Object} v1 - The first vector with properties x, y, and z.
 * @param {Object} v2 - The second vector with properties x, y, and z.
 * @returns {number} The dot product of the two vectors.
 */
function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}





// Function: evaluateCurve
 /**
 * Evaluates a curve at a given parameter t to find the point on the curve corresponding to that parameter.
 * @param {Object} curve - The curve object containing an array of points representing the curve.
 * @param {number} t - The parameter value along the curve, ranging from 0 to the total curve length.
 * @returns {Object} - A vector representing the point on the curve corresponding to the parameter t.
 */
```
function evaluateCurve(curve, t) {
    let currentPoint = curve.points[0];
    for (let i = 1; i < curve.points.length; i++) {
        const nextPoint = curve.points[i];
        if (t <= calculateDistanceBetweenPoints(currentPoint, nextPoint) / getCurveLength(curve)) {
            return createVectorFromPoints(currentPoint, nextPoint).scale((t / calculateDistanceBetweenPoints(currentPoint, nextPoint)) * getVectorDirection(currentPoint, nextPoint));
        }
    }
    currentPoint = curve.points[curve.points.length - 1];
    const remainingDistance = getCurveLength(curve) - calculateDistanceBetweenPoints(currentPoint, t);
    return createVectorFromPoints(currentPoint, interpolatePointOnCurve(t, currentPoint, curve.points[curve.points.length - 1])).scale((remainingDistance / getVectorDirection(currentPoint, curve.points[curve.points.length - 1])).magnitude()) * getVectorDirection(currentPoint, curve.points[curve.points.length - 1]);
}

function calculateDistanceBetweenPoints(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
}

function getCurveLength(curve) {
    let length = 0;
    for (let i = 1; i < curve.points.length; i++) {
        length += calculateDistanceBetweenPoints(curve.points[i - 1], curve.points[i]);
    }
    return length;
}

function createVectorFromPoints(p1, p2) {
    return { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
}

function getVectorDirection(p1, p2) {
    let vector = createVectorFromPoints(p1, p2);
    let magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
    return { x: vector.x / magnitude, y: vector.y / magnitude, z: vector.z / magnitude };
}

function interpolatePointOnCurve(t, p1, p2) {
    let ratio = t / calculateDistanceBetweenPoints(p1, p2);
    return { x: p1.x + (p2.x - p1.x) * ratio, y: p1.y + (p2.y - p1.y) * ratio, z: p1.z + (p2.z - p1.z) * ratio };
}





// Function: evaluateSurface
 /**
 * Evaluates the surface at given parameters u and v.
 * @param {Surface} surface - The surface to evaluate.
 * @param {number} u - The parameter along the U direction.
 * @param {number} v - The parameter along the V direction.
 * @returns {Point} A new Point object representing the evaluated surface at (u, v).
 */
function evaluateSurface(surface, u, v) {
    const controlPoints = surface.controlPoints;
    if (u === 0 && v === 0)
        return new Point();
    const uVector = [];
    for (let i = 0; i < controlPoints.length - 1; i++) {
        uVector.push([
            controlPoints[i][0] - controlPoints[i + 1][0],
            controlPoints[i][1] - controlPoints[i + 1][1],
            controlPoints[i][2] - controlPoints[i + 1][2]
        ]);
    }
    const point = new Point();
    for (let i = 0; i < surface.loops.length; i++) {
        let localU = 0;
        let localV = 0;
        for (let j = 0; j < surface.loops[i].length - 1; j++) {
            localU += surface.loops[i][j][0] * uVector[j][0];
            localV += surface.loops[i][j][0] * (evaluateCurve(surface.loops[i], v)[0] - surface.loops[i][j][0]) + surface.loops[i][j][1] * (evaluateCurve(surface.loops[i], v)[1] - surface.loops[i][j][1]);
        }
        point = new Point(localU, localV, 0);
    }
    let cv = [
        0,
        0,
        0
    ];
    for (let i = 0; i < uVector.length - 1; i++) {
        cv[0] += (uVector[i][1] * localV - uVector[i][2] * (evaluateCurve(surface.loops[0], v)[1] - surface.loops[0][i][1]) + uVector[i][2] * (evaluateCurve(surface.loops[0], v)[2] - surface.loops[0][i][2])) / localU;
        cv[1] += (uVector[i][2] * localV - uVector[i][0] * (evaluateCurve(surface.loops[0], v)[2] - surface.loops[0][i][2]) + uVector[i][0] * (evaluateCurve(surface.loops[0], v)[0] - surface.loops[0][i][0])) / localU;
        cv[2] += (uVector[i][0] * localV - uVector[i][1] * (evaluateCurve(surface.loops[0], v)[0] - surface.loops[0][i][0]) + uVector[i][1] * (evaluateCurve(surface.loops[0], v)[1] - surface.loops[0][i][1])) / localU;
    }
    return point.add(new Point(cv[0], cv[1], cv[2])).scale(localU);
}





// Function: extrude
 /**
 * Extrudes a profile along a specified direction by a given distance to generate a shell.
 * @param {Array<{x: number, y: number, z: number}>} profile - The array of points defining the profile to be extruded.
 * @param {{x: number, y: number, z: number}} direction - The vector representing the direction in which to extrude the profile.
 * @param {number} distance - The total distance to extrude the profile along the given direction.
 * @returns {[Array<[number, number, number]>, Array<[number, number, number]>]} An array containing two arrays:
 *                                                                            1. The original curve of points defining the profile.
 *                                                                            2. The shell of points generated by extruding the profile along the direction.
 */
function extrude(profile, direction, distance) {
  let curve = [];
  for (let i = 0; i < profile.length; i++) {
    curve.push([profile[i].x, profile[i].y, profile[i].z]);
  }
  let shell = [];
  let translationVector = [direction.x, direction.y, direction.z];
  
  for (let t = 0; t <= distance; t++) {
    let point = [];
    for (let i = 0; i < curve.length; i++) {
      point.push(curve[i][0] + translationVector[0], 
                 curve[i][1] + translationVector[1], 
                 curve[i][2] + translationVector[2]);
    }
    shell.push(point);
  }
  
  return [curve, shell];
}





// Function: findIntersection
 /**
 * Finds the intersection point between two edges in 3D space, if it exists.
 * @param {Array<Array<number>>} edge1 - The first edge represented by an array of two points (start and end).
 * @param {Array<Array<number>>} edge2 - The second edge represented by an array of two points (start and end).
 * @returns {Vertex|null} - The intersection point as a Vertex object, or null if there is no intersection.
 */
function findIntersection(edge1, edge2) {
    const v1 = subtractVectors(subtractVectors(edge1[1], edge1[0]), edge2[0]);
    const v2 = crossProduct(subtractVectors(edge2[1], edge1[0]), subtractVectors(edge2[0], edge1[0]));
    let d0 = dotProduct(v1, v2);

    if (Math.abs(d0) < Number.EPSILON) return null; // No intersection

    let s = -dotProduct(subtractVectors(edge1[0], edge2[0]), v2) / d0;
    let t = -dotProduct(subtractVectors(edge1[0], edge2[1]), v2) / d0;

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return Vertex.fromPoint(addVectors(edge1[0], multiplyVectorByScalar(v1, s)));
    } else {
        return null; // No intersection within bounds
    }
}





// Function: intersect
 /**
 * Computes the intersection points between two solid shells by checking each pair of faces for coplanarity and finding their intersections.
 * @param {Object} solid1 - The first solid with shells containing faces to be intersected.
 * @param {Array<Object>} solid1.shells - An array of shell objects, each containing an array of face objects.
 * @param {Object} solid2 - The second solid with shells containing faces to be intersected.
 * @param {Array<Object>} solid2.shells - An array of shell objects, each containing an array of face objects.
 * @returns {Array<Object>} intersections - An array of intersection points between the faces of the two solids. Each object contains a property 'points' which is an array of intersection point coordinates.
 */
function intersect(solid1, solid2) {
    let intersections = [];
    for (let i = 0; i < solid1.shells.length; i++) {
        for (let j = 0; j < solid2.shells.length; j++) {
            let currentShell1 = solid1.shells[i];
            let currentShell2 = solid2.shells[j];
            for (let k = 0; k < currentShell1.faces.length; k++) {
                let face1 = currentShell1.faces[k];
                for (let l = 0; l < currentShell2.faces.length; l++) {
                    let face2 = currentShell2.faces[l];
                    if (face1.isCoplanarWith(face2) && findIntersection(face1, face2).points.length > 0) {
                        let intersectionPoints = findIntersection(face1, face2);
                        intersections.push({ points: intersectionPoints });
                    }
                }
            }
        }
    }
    return intersections;
}





// Function: loft
 /**
 * Generates a solid object from an array of profiles using lofting technique.
 * @param {Array<Object>} profiles - An array of profile objects, each representing a cross-section of the solid along its length.
 * @returns {Object} - A solid object with type "Solid" and an array of shells.
 */
function loft(profiles) {
    let shells = [];
    for (let i = 0; i < profiles.length - 1; i++) {
        let curveFrom = [profiles[i], projToProfileAxis(profiles[i + 1], profiles[i])];
        let curveTo = evaluateCurve(curveFrom, t);
        
        let surface = {controlPoints: [], loops: [{vertices: [addVertex(shells[0], curveFrom), addVertex(shells[0], curveTo)]}]};;
        
        shells.push(createShell(surface));
    }
    
    return {type: "Solid", shells: shells};
}





// Function: multiplyMatrices
 /**
 * Multiplies two matrices together.
 * @param {number[][]} m1 - The first matrix to multiply, represented as a 2D array of numbers.
 * @param {number[][]} m2 - The second matrix to multiply, represented as a 2D array of numbers.
 * @returns {number[][]} A new matrix that is the result of multiplying m1 and m2.
 */
function multiplyMatrices(m1, m2) {
  let result = [];
  for (let i = 0; i < m1.length; i++) {
    result[i] = [];
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}





// Function: multiplyMatrixVector
 /**
 * Multiplies a matrix by a vector and returns the resulting vector.
 * @param {Object} matrix - The matrix to be multiplied, represented as an object with x, y, and z properties each containing arrays of numbers.
 * @param {Object} vector - The vector to be multiplied, represented as an object with x, y, and z properties each containing a number.
 * @returns {Object} - The resulting vector from the multiplication, represented as an object with x, y, and z properties each containing a number.
 */
function multiplyMatrixVector(matrix, vector) {
  let result = {x: 0, y: 0, z: 0};
  for (let i = 0; i < matrix.length; i++) {
    let sum = {x: 0, y: 0, z: 0};
    for (let j = 0; j < vector.y.length; j++) {
      if (j < vector.y.length - 1) {
        sum.x += matrix[i][j] * vector.y[j];
        sum.y += matrix[i][j + 1] * vector.y[j];
        sum.z += matrix[i][j + 2] * vector.y[j];
      } else {
        sum.x += matrix[i][j] * vector.y[j];
      }
    }
    result.x += sum.x;
    result.y += sum.y;
    result.z += sum.z;
  }
  return {x: result.x, y: result.y, z: result.z};
}





// Function: projectPointOnSurface
 /**
 * Evaluates the surface and projects a point onto it by linearly combining the basis vectors of the surface.
 * @param {Object} point - The point to be projected, containing x, y, and z coordinates.
 * @param {Object} surface - The surface object, containing u and v components representing basis vectors.
 * @returns {Object} An object with x, y, and z properties representing the projected point on the surface.
 */
function projectPointOnSurface(point, surface) {
  const [u, v] = evaluateSurface(surface);
  return { x: u * point.x + v * surface.u, y: u * point.y + v * surface.v, z: u * point.z };
}





// Function: revolve
 /**
 * Generates a solid by revolving a profile around an axis by a given angle.
 * @param {Array<Point>} profile - The array of points defining the profile to be revolved.
 * @param {Vector} axis - The vector representing the axis around which the profile will be revolved.
 * @param {number} angle - The angle in radians by which the profile will be rotated.
 * @returns {Solid} A solid object generated by revolving the given profile around the specified axis by the given angle.
 */
function revolve(profile, axis, angle) {
  let curve = Curve([profile]);
  let matrix = new Matrix();
  let rotatedProfile = [];
  for (let i = 0; i < profile.length; i++) {
    let vector = Vector.subtract(new Point(), profile[i]);
    rotatedProfile.push(Matrix.multiplyVector(matrix, vector));
  }
  let solid = Solid();
  for (let loop of curve.loops) {
    let shell = Shell();
    for (let face of loop.faces) {
      addFace(shell, new Face(rotatedProfile, face.controlPoints));
    }
    addShell(solid, shell);
  }
  return solid;
}





// Function: rotate
 /**
 * Rotates a point around an axis by a specified angle.
 * @param {Object} point - The point to be rotated, represented as an object with x, y, and z properties.
 * @param {Object} axis - The axis of rotation, represented as an object with x, y, and z properties.
 * @param {number} angle - The angle in radians by which the point should be rotated around the axis.
 * @returns {Object} - A new object representing the rotated point, with x, y, and z properties updated according to the rotation.
 */
function rotate(point, axis, angle) {
    var v = {x: point.x - axis.x, y: point.y - axis.y, z: point.z - axis.z};
    var uMag = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
    var xAxis = {x: axis.x / uMag, y: 0, z: 0};
    var yAxis = {x: 0, y: axis.y / uMag, z: 0};
    var zAxis = {x: 0, y: 0, z: axis.z / uMag};

    var xRotationMatrix = [
        [Math.cos(angle), -Math.sin(angle)*v.x/uMag, Math.sin(angle)*v.z/uMag],
        [Math.sin(angle)*v.y/uMag + Math.cos(angle)*(axis.y/uMag), Math.cos(angle) - Math.sin(angle)*axis.y/uMag*v.z/uMag, -Math.sin(angle)*v.z/uMag + Math.cos(angle)*(axis.z/uMag)],
        [-Math.sin(angle)*v.z/uMag + Math.cos(angle)*(axis.z/uMag), 0, Math.cos(angle) - Math.sin(angle)*axis.z/uMag*v.y/uMag]
    ];

    var yRotationMatrix = [
        [Math.cos(angle), 0, -Math.sin(angle)],
        [0, Math.cos(angle), 0],
        [Math.sin(angle), 0, Math.cos(angle)]
    ];

    var zRotationMatrix = [
        [Math.cos(angle), -Math.sin(angle)*v.x/uMag, Math.sin(angle)*v.y/uMag],
        [Math.sin(angle)*v.z/uMag + Math.cos(angle)*(axis.z/uMag), 0,
         -Math.sin(angle)*v.y/uMag + Math.cos(angle)*(axis.y/uMag)],
        [-Math.sin(angle)*v.x/uMag + Math.cos(angle)*(axis.x/uMag), 0, Math.cos(angle) - Math.sin(angle)*axis.x/uMag*v.y/uMag]
    ];

    var x = point.x;
    var y = point.y;
    var z = point.z;

    var rotatedX = (xRotationMatrix[0][0]*x + xRotationMatrix[0][1]*(y-axis.y) + xRotationMatrix[0][2]*(z-axis.z)) * uMag + axis.x;
    var rotatedY = (xRotationMatrix[1][0]*(x-axis.x) + yRotationMatrix[1][1]*y + zRotationMatrix[1][2]*(z-axis.z)) * uMag + axis.y;
    var rotatedZ = (xRotationMatrix[2][0]*(x-axis.x) + xRotationMatrix[2][1]*(y-axis.y) + zRotationMatrix[2][2]*(z-axis.z)) * uMag + axis.z;

    return {x: rotatedX, y: rotatedY, z: rotatedZ};
}





// Function: scale
 /**
 * Scales the given point by a specified scale factor and returns a new scaled point object.
 * @param {Object} point - The original point to be scaled, containing x, y, and z coordinates.
 * @param {number} scaleFactor - The scaling factor to apply to each coordinate of the point.
 * @returns {Object} A new object representing the scaled point, with properties x, y, and z all multiplied by the scale factor.
 */
function scale(point, scaleFactor) {
 return { x: point.x * scaleFactor, y: point.y * scaleFactor, z: point.z * scaleFactor };
}





// Function: subtract
 /**
 * Subtracts one solid from another by comparing each shell in the second solid and subtracting its loops from the corresponding shells in the first solid, then returning the result of the subtraction.
 * @param {Object} solid1 - The base solid to subtract from.
 * @param {Object} solid2 - The solid to subtract from the base solid.
 * @returns {Object} A new solid that is the result of subtracting solid2 from solid1.
 */
function subtract(solid1, solid2) {
    let shellDifference = new Shell();
    
    const clonedSolid1 = cloneSolid(solid1);
    const clonedSolid2 = cloneSolid(solid2);
    
    for (const shell2 of Solids.getShells(clonedSolid2)) {
        let loopDifference;
        
        for (const loop2 of Solids.getLoops(shell2)) {
            let faceDifference = new Face();
            
            for (const face2 of Solids.getFaces(loop2)) {
                let edgeDifference = [];
                
                const edges2 = Solids.getEdges(face2);
                for (const edge2 of edges2) {
                    if (!Solid.hasEdge(edgeDifference, edge2)) {
                        let vertexDifference;
                        
                        const vertices2 = Solids.getVertices(edge2);
                        for (const vertex2 of vertices2) {
                            if (!Solid.hasVertex(vertexDifference, vertex2)) {
                                let pointDifference;
                                
                                const points1 = Solids.getPoints(clonedSolid1);
                                if (!points1.some(point => Vector.equals(vertex2, point))) {
                                    pointDifference = new Point(vertex2.x, vertex2.y, vertex2.z);
                                } else {
                                    let existingPoint;
                                    for (const point of points1) {
                                        if (Vector.equals(vertex2, point)) {
                                            existingPoint = point;
                                            break;
                                        }
                                    }
                                    
                                    if (!existingPoint) continue;
                                    
                                    pointDifference = subtractVectors(point, existingPoint);
                                }
                                
                                edgeDifference.push(pointDifference);
                            }
                        }
                        
                        faceDifference.addEdge(edgeDifference);
                    }
                }
                
                loopDifference = subtractLoops(loop2, loopDifference);
            }
            
            shellDifference.addLoop(loopDifference);
        }
        
        addShell(shellDifference, clonedSolid1);
    }
    
    return subtractSolids(clonedSolid1, solid2);
}





// Function: subtractVectors
 /**
 * Subtracts the components of two vectors and returns a new vector with the results.
 * @param {Object} v1 - The first vector object with properties x, y, and z.
 * @param {Object} v2 - The second vector object with properties x, y, and z.
 * @returns {Object} A new vector object with components (xA: v1.x - v2.x, yA: v1.y - v2.y, zA: v1.z - v2.z).
 */
function subtractVectors(v1, v2) {
    return { xA: v1.x - v2.x, yA: v1.y - v2.y, zA: v1.z - v2.z };
}





// Function: sweep
 /**
 * Evaluates the curve defined by the given path and sweeps the profile along this curve to generate a solid object.
 * @param {Object} profile - The profile object used for sweeping.
 * @param {Array} path - The array of points defining the path of the sweep.
 * @returns {void}
 */
function sweep(profile, path) {
    const curve = evaluateCurve(path);
    let solid = null;

    for (let t of curve.getPoints()) {
        const edge = new Edge(t.previousPoint, t.point);
        if (!solid) {
            solid = new Solid();
        }
        addFace(solid, profile, edge);
        addShell(solid, profile, edge);
    }
}





// Function: translate
 /**
 * Translates a point by adding the components of a vector to the corresponding coordinates of the point.
 * @param {Object} point - The original point object with properties x, y, and z.
 * @param {Object} vector - The translation vector object with properties x, y, and z.
 * @returns {Object} A new object representing the translated point with properties x, y, and z.
 */
function translate(point, vector) {
    let x = point.x + vector.x;
    let y = point.y + vector.y;
    let z = point.z + vector.z;
    return {x, y, z};
}





// Function: union
 /**
 * Combines two solids by creating a new solid with all faces from both solids, without duplicates.
 * @param {Object} solid1 - The first solid to be combined.
 * @param {Object} solid2 - The second solid to be combined.
 * @returns {Object} A new Solid object containing the union of the two input solids' faces.
 */
function union(solid1, solid2) {
    const resultShells = [];
    function isVertexInLoop(loop, vertex) {
        return loop.edges.some(edge => edge.vertex1 === vertex || edge.vertex2 === vertex);
    }
    const resultShellsSet = new Set();
    for (const face of solid1.shells) {
        if (!resultShellsSet.has(face)) {
            addShell(new Solid(), face);
            resultShellsSet.add(face);
        }
    }
    for (const face of solid2.shells) {
        if (!resultShellsSet.has(face)) {
            addShell(new Solid(), face);
            resultShellsSet.add(face);
        }
    }
    return new Solid(resultShells);
}





