// Function: Curve
/**
 * @name Curve
 * @param {Array} points - An array of points defining the curve.
 * @constructor
 *
 * @description Creates a new curve with the given points.
 *
 * @property {Array} points - The points that define the curve.
 * @method getPoints() - Returns the current points of the curve.
 * @method setPoint(i, point) - Sets a point at the specified index in the curve.
function Curve(points) {
  this.points = points || [];
  this.getPoints = function() { return this.points; };
  this.setPoint = function(i, point) {
    if (i >= 0 && i < this.points.length) {
      this.points[i] = point;
    }
  };
}





// Function: Edge
/**
 * Creates a new edge object representing the line segment between two vertices.
 * 
 * @param {Array.<number>} vertex1 - The coordinates of the first vertex (x, y, z).
 * @param {Array.<number>} vertex2 - The coordinates of the second vertex (x, y, z).
 */
function Edge(vertex1, vertex2) {
  this.vertexA = {x: vertex1[0], y: vertex1[1], z: vertex1[2]};
  this.vertexB = {x: vertex2[0], y: vertex2[1], z: vertex2[2]};
}





// Function: Face
/**
 * @param {Object} surface - 
 * @param {Array} loops - 
 */
function Face(surface, loops) {
  const vertices = [];
  for (let i = 0; i < loops.length; i++) {
    const edge = {v1: loops[i].vertex1, v2: loops[i].vertex2};
    for (const edge2 of surface.edges) {
      if (edge.v1.x === edge2.v1.x && edge.v1.y === edge2.v1.y && edge.v1.z === edge2.v1.z &&
          edge.v2.x === edge2.v2.x && edge.v2.y === edge2.v2.y && edge.v2.z === edge2.v2.z) {
        const intersection = {x: (edge.v1.x + edge.v2.x) / 2, y: (edge.v1.y + edge.v2.y) / 2, z: (edge.v1.z + edge.v2.z) / 2};
        vertices.push(intersection);
      } else if (edge.v1.x === edge2.v2.x && edge.v1.y === edge2.v2.y && edge.v1.z === edge2.v2.z &&
                 edge.v2.x === edge2.v1.x && edge.v2.y === edge2.v1.y && edge.v2.z === edge2.v1.z) {
        const intersection = {x: (edge.v1.x + edge.v2.x) / 2, y: (edge.v1.y + edge.v2.y) / 2, z: (edge.v1.z + edge.v2.z) / 2};
        vertices.push(intersection);
      }
    }
  }
  surface.shells[0].faces.push({vertices});
}





// Function: Loop
/**
 * @param {Array.<{x: number, y: number}>} edges 
 * @return {Array.<[Edge1: {x: number, y: number}, Edge2: {x: number, y: number}]>}
 * Finds all non-intersecting edges in the given array and returns them.
 */
function Loop(edges){let result=[];for(let i=0;i<edges.length;i++){const currentEdge=edges[i];const nextEdge=edges[(i+1)%edges.length];if(!findIntersection(currentEdge,nextEdge)){result.push([currentEdge,nextEdge]);}else{console.error(`Intersection detected between edge ${i} and edge ${(i+1)%edges.length}. Loop creation interrupted.`);break;}}return result;}





// Function: Matrix
/**
 * @name Matrix
 * @param {Array} elements - The input matrix elements.
 * @description Creates a new matrix based on the given elements and defines a method for matrix multiplication.
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
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {number} z - The z-coordinate of the point.
 * @returns {{x: number, y: number, z: number}} - A new Point object with the given coordinates.
 */
function Point(x, y, z) {
  return {x, y, z};
}





// Function: Shell
/**
 * @class Shell
 *
 * @param {Array} faces - The initial faces of the shell.
 *
 * @description Represents a shell with multiple faces.
 */
/**
 * @member {Array} getFaces()
 *
 * @returns {Array} The faces of the shell.
 *
 * @description Gets the faces of the shell.
 */
/**
 * @member {void} setFaces(newFaces)
 *
 * @param {Array|Object} newFaces - New faces to set for the shell.
 *
 * @description Sets the faces of the shell.
 */
/**
 * @member {Shell} clone()
 *
 * @returns {Shell} A cloned copy of this shell.
 *
 * @description Creates a deep copy of this shell.
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
 * @param {array} Shells - array of shell objects
 * @returns {number} the volume of the solid formed by stacking the shells
 */
function Solid(Shells) {
    let volume = 0;
    for (let i = 0; i < Shells.length; i++) {
        const shell = Shells[i];
        volume += shell.area() * Math.abs(shell.normal().dot(new Point(0, 0, 1))));
    }
    return volume;
}





// Function: Surface
/**
 * @class Surface
 * Represents a surface defined by control points.
 *
 * @param {Array} controlPoints - The control points that define the surface.
 */
/**
 * @method getCurve
 * Returns the curve of the surface defined by its control points.
 *
 * @return {Array} An array of objects representing the curve of the surface.
 */
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
 * @name Vector
 * @constructor
 * @description Creates a new vector with the specified x, y, and z components.
 * @param {number} x - The x component of the vector.
 * @param {number} y - The y component of the vector.
 * @param {number} z - The z component of the vector.
 */

/**
 * @name Vector.prototype.add
 * @description Adds two vectors together and returns the result.
 * @param {Vector} vector2 - The second vector to add.
 * @returns {Vector}
 */

/**
 * @name Vector.prototype.subtract
 * @description Subtracts one vector from another and returns the result.
 * @param {Vector} vector2 - The second vector to subtract.
 * @returns {Vector}
 */
function Vector(x, y, z) {
    return {x, y, z};
}

Vector.prototype.add = function(vector2) {
    return {x: this.x + vector2.x, y: this.y + vector2.y, z: this.z + vector2.z};
};

Vector.prototype.subtract = function(vector2) {
    return {x: this.x - vector2.x, y: this.y - vector2.y, z: this.z - vector2.z};
};





// Function: Vertex
/**
 * @constructor
 * Creates a new Vertex object from the given point.
 *
 * @param {Point} point - The point coordinates to initialize this vertex with.
 */
function Vertex(point) {
  this.x = point.x;
  this.y = point.y;
  this.z = point.z;
}





// Function: addEdge
/**
 * Adds an edge to a solid.
 *
 * @param {Object} solid - The solid to add the edge to.
 * @param {Object} edge - The edge to be added.
 */
function addEdge(solid, edge) {
  let newVertex1 = {x: edge.vertex1.x, y: edge.vertex1.y, z: edge.vertex1.z};
  let newVertex2 = {x: edge.vertex2.x, y: edge.vertex2.y, z: edge.vertex2.z};
  
  solid.vertices.push(newVertex1);
  solid.vertices.push(newVertex2);
}





// Function: addFace
/**
 * @param {Object} shell - The shell object.
 * @param {Object} face - The face object to be added.
 * @returns {Object} A new shell object with the given face added.
 */
function addFace(shell, face) {
  return {x:shell.x, y:shell.y, z:shell.z, faces:[...shell.faces,face]};
}





// Function: addLoop
/**
 * @param {Object} face - The object to add the loop to.
 * @param {*} loop - The loop to be added.
 * Adds a new loop to the given 'face' object, if it doesn't already have a 'loops' property or if that property is not an array. If necessary, initializes the 'loops' property with an empty array and then pushes the new loop onto it.
function addLoop(face, loop) {
  if (!("loops" in face) || !Array.isArray(face.loops)) face.loops = [];
  face.loops.push(loop);
}





// Function: addShell
/**
 * @param {Object} solid - input solid object
 * @param {Object} shell - input shell object
 * @returns {Object} newSolid - the resulting solid object with added shell
 */
function addShell(solid, shell) {
    var newSolid = {x: solid.x, y: solid.y, z: solid.z, shells: [solid.shells].concat([shell])};
    return newSolid;
}





// Function: addVectors
/**
 * @param {Object} v1 - The first vector.
 * @param {Object} v2 - The second vector.
 * @returns {Object} - The sum of the two vectors.
 */
function addVectors(v1, v2) {
    return {x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z};
}





// Function: addVertex
/**
 * @param {Object} solid - The solid object to add the vertex to.
 * @param {Array|Number} vertex - The vertex to be added, can be either an array or a single number representing a 3D point (x,y,z).
 * Adds a new vertex to the specified solid's shell.
function addVertex(solid, vertex) {
    solid.shell.push(new shell());
    var lastFace = solid.shell[solid.shell.length-1].faces[solid.shell[solid.shell.length-1].faces.length-1];
    lastFace.vertices.push(vertex);
}





// Function: cloneCurve
/**
 * @param {Object} curve - The curve to be cloned.
 * @returns {Object} A new curve with the same points as the input curve.
 */
function cloneCurve(curve) {
    const clonedPoints = curve.points.map(point => ({ x: point.x, y: point.y, z: point.z }));
    return { points: clonedPoints };
}





// Function: cloneMatrix
/**
 * @param {Array[]} matrix The input matrix to be cloned.
 * @returns {{x: Array[], y: Array[], z: Array[]}} The cloned matrix with the same shape as the input.
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
 * @param {Object} point - The point to clone.
 * @returns {Object} A new point with the same x, y, and z values as the input point.
 */
function clonePoint(point) {
  return {x: point.x, y: point.y, z: point.z};
}





// Function: cloneSolid
/**
 * Creates a deep clone of the given solid object, including all its shells and faces.
 * @param {Solid} solid The solid object to be cloned.
 * @return {Solid} A new solid object that is a deep copy of the original.
 */
function cloneSolid(solid) {
    const shells = [];
    for (const shell of solid.shells) {
        const clonedShell = {};
        for (const face of shell.faces) {
            const clonedFace = new Face(face.controlPoints, []);
            for (const loop of face.loops) {
                let cloneLoop;
                if (!loop.edges.length) {
                    cloneLoop = new Loop([], []);
                } else {
                    const clonedEdge = new Edge(loop.edges[0]);
                    let cloneEdges = [clonedEdge];
                    for (let i = 1; i < loop.edges.length; i++) {
                        const edge = loop.edges[i];
                        cloneEdges.push(new Edge(edge));
                    }
                    cloneLoop = new Loop([], cloneEdges);
                }
                clonedFace.loops.push(cloneLoop);
            }
            clonedShell.faces.push(clonedFace);
        }
        for (let i = 0; i < shells.length; i++) {
            const shell = solid.shells[i];
            const clonedShellPart = {};
            clonedShellPart.faces = [];
            for (const face of shell.faces) {
                clonedShellPart.faces.push(new Face(face));
            }
            shells.push(clonedShellPart);
        }
        const clonedSolid = new Solid([], shells);
        return clonedSolid;
    }
}





// Function: cloneSurface
/**
 * @param {Array.<Array.<{x: number, y: number, z: number}>}> surface 
 * @returns {{data: Array.<Array.<{x: number, y: number, z: number}>>}}
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
 * @param {Object} vector - The original vector object.
 * @returns {Object} - A cloned copy of the input vector object.
 */
function cloneVector(vector) {
  return { x: vector.x, y: vector.y, z: vector.z };
}





// Function: createCone
/**
 * @param {number} baseRadius - Base radius of the cone.
 * @param {number} topRadius - Top radius of the cone.
 * @param {number} height - Height of the cone.
 * @returns {Array} An array containing the surface and solid definitions of the cone.
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
* @param {number} radius - 
* @param {number} height -
* @returns {} - 
*/
function createCylinder(radius, height) {
    const topBase = {x:0, y:0, z:height/2};
    const bottomBase = {x:0, y:0, z:-height/transform({x:0,y:0,z:height/2},'Y',-height)};
    
    const baseProfile = createCone(radius, radius, height);
    const topProfile = createCone(radius, radius, height).translate({'Z':height/2});
    return extrude(baseProfile, {x:0,y:1,z:0}, height).union(revolve(topProfile, {x:0,y:1,z:0}, Math.PI*2));
}





// Function: createPrism
/**
 * @name createPrism
 * @description Creates a prism shape given base and height.
 * @param {Object} base - Base point of the prism.
 * @param {Number} height - Height of the prism.
 * @returns {Object} The created prism solid.
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
 * Creates a sphere with the given radius.
 *
 * @param {number} radius - The radius of the sphere.
 * @returns {{type: string, contents: [{type: string, edges: [], vertices: ({x: number, y: number, z: number}[])}, ...]}} - A representation of the sphere as a 3D object.
 */
function createSphere(radius) {
    const controlPoints = [{x:-radius, y:-radius*Math.sqrt(3)/2, z:0},{x:radius, y:-radius*Math.sqrt(3)/2, z:0},{x:0, y:radius*Math.sqrt(3)/2, z:0}];
    const surface = {controlPoints};
    return {type:"Solid", contents:[{type:"Shell", contents:[{type:"Loop", edges:[]}, {type:"Face4", vertices:controlPoints}]}]};
}





// Function: createTorus
/**
 * @function createTorus
 * 
 * Creates a torus (doughnut) shape given major and minor radii.
 * 
 * @param {number} majorRadius - the outer radius of the torus
 * @param {number} minorRadius - the inner radius of the torus
 * 
 * @return {{surface: Array}} - an object with a surface property containing an array of points that form the torus shape
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
 * @param {Object} v1 - First vector.
 * @param {Object} v2 - Second vector.
 * @returns {Object} Cross product of the two input vectors.
 */
function crossProduct(v1,v2){let x=v1.y*v2.z-v1.z*v2.y;let y=v1.z*v2.x-v1.x*v2.z;let z=v1.x*v2.y-v1.y*v2.x;return{x:x,y:y,z:z};}





// Function: dotProduct
/**
 * Calculates the dot product of two vectors.
 *
 * @param {Vector} v1 - The first vector.
 * @param {Vector} v2 - The second vector.
 * @return {Number} The dot product of the two vectors.
 */
function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}





// Function: evaluateCurve
/**
 * @param {Object} curve - The curve object.
 * @param {Number} t - The parameter value.
 * @returns {Object} The interpolated point on the curve.
 */
function evaluateCurve(curve,t) {
    let currentPoint=curve.points[0];
    for(let i=1;i<curve.points.length;i++){
        const nextPoint=curve.points[i];
        if(t<=calculateDistanceBetweenPoints(currentPoint,nextPoint)/getCurveLength(curve)){
            return createVectorFromPoints(currentPoint,nextPoint).scale((t/calculateDistanceBetweenPoints(currentPoint,nextPoint))*getVectorDirection(currentPoint,nextPoint));
         }
     }
    currentPoint=curve.points[curve.points.length-1];
    const remainingDistance=getCurveLength(curve)-calculateDistanceBetweenPoints(currentPoint,t);
    return createVectorFromPoints(currentPoint,interpolatePointOnCurve(t,currentPoint,curve.points[curve.points.length-1])).scale((remainingDistance/getVectorDirection(currentPoint,curve.points[curve.points.length-1])).magnitude())*getVectorDirection(currentPoint,curve.points[curve.points.length-1]));
}

function calculateDistanceBetweenPoints(p1,p2){
    return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2)+Math.pow(p2.z-p1.z,2));
}
function getCurveLength(curve){
    let length=0;
    for(let i=1;i<curve.points.length;i++){
        length+=calculateDistanceBetweenPoints(curve.points[i-1],curve.points[i]);
     }
    return length;
}
function createVectorFromPoints(p1,p2){
    return {x:p2.x-p1.x,y:p2.y-p1.y,z:p2.z-p1.z};
}
function getVectorDirection(p1,p2){
    let vector=createVectorFromPoints(p1,p2);
    let magnitude=Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2)+Math.pow(vector.z,2));
    return {x:vector.x/magnitude,y:vector.y/magnitude,z:vector.z/magnitude};
}
function interpolatePointOnCurve(t,p1,p2){
    let ratio=t/calculateDistanceBetweenPoints(p1,p2);
    return {x:p1.x+(p2.x-p1.x)*ratio,y:p1.y+(p2.y-p1.y)*ratio,z:p1.z+(p2.z-p1.z)*ratio};
}





// Function: evaluateSurface
/**
 * @param {Object} surface 
 * @param {Number} u 
 * @param {Number} v 
 * @returns {Point}
 */
function evaluateSurface(surface, u, v) {
    const controlPoints = surface.controlPoints;
    
    if (u === 0 && v === 0) return new Point();
    
    const uVector = [];
    for (let i = 0; i < controlPoints.length - 1; i++) {
        uVector.push([controlPoints[i][0] - controlPoints[i + 1][0], controlPoints[i][1] - controlPoints[i + 1][1], controlPoints[i][2] - controlPoints[i + 1][2]]);
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
    
    let cv = [0, 0, 0];
    for (let i = 0; i < uVector.length - 1; i++) {
        cv[0] += (uVector[i][1] * localV - uVector[i][2] * (evaluateCurve(surface.loops[0], v)[1] - surface.loops[0][i][1]) + uVector[i][2] * (evaluateCurve(surface.loops[0], v)[2] - surface.loops[0][i][2])) / localU;
        cv[1] += (uVector[i][2] * localV - uVector[i][0] * (evaluateCurve(surface.loops[0], v)[2] - surface.loops[0][i][2]) + uVector[i][0] * (evaluateCurve(surface.loops[0], v)[0] - surface.loops[0][i][0])) / localU;
        cv[2] += (uVector[i][0] * localV - uVector[i][1] * (evaluateCurve(surface.loops[0], v)[0] - surface.loops[0][i][0]) + uVector[i][1] * (evaluateCurve(surface.loops[0], v)[1] - surface.loops[0][i][1])) / localU;
    }
    
    return point.add(new Point(cv[0], cv[1], cv[2])).scale(localU);
}





// Function: extrude
/**
 * @name extrude
 * @description Extrudes a profile in the specified direction and distance.
 * @param {array} profile - The 3D points that make up the profile to be extruded.
 * @param {object} direction - The vector representing the direction of extrusion.
 * @param {number} distance - The distance to extrude the profile.
 * @returns {array} An array containing the original profile and the extruded shell.
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
 * Finds the intersection point of two edges in 3D space.
 * 
 * @param {Array} edge1 - The first edge, represented as an array of vertices.
 * @param {Array} edge2 - The second edge, represented as an array of vertices.
 * @return {Vertex|Null} The intersection point if it lies within the bounds of both edges, otherwise null.
function findIntersection(edge1, edge2) {
    const v1 = subtractVectors(subtractVectors(vertex2 = edge1[1], vertex1 = edge1[0]), vertex3 = edge2[0]);
    const v2 = crossProduct(subtractVectors(vertex4 = edge2[1], vertex1), subtractVectors(vertex3, vertex1));
    let d0 = dotProduct(v1, v2);

    if (Math.abs(d0) < Number.EPSILON) return null; // No intersection

    let s = -dotProduct(subtractVectors(vertex1, vertex3), v2) / d0;
    let t = -dotProduct(subtractVectors(vertex1, vertex4), v2) / d0;

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return Vertex.fromPoint(addVectors(vertex1, multiplyVectorByScalar(v1, s)));
    } else {
        return null; // No intersection within bounds
    }
}





// Function: intersect
/**
 * @param {object} solid1 - First solid object.
 * @param {object} solid2 - Second solid object.
 * @return {array} An array of intersection objects, each containing the points where the two solids intersect.
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
 * @param {Array} profiles - An array of profile points.
 * @returns {{type: string, shells: Array}} - The lofted solid object.
 *
 * Lofts a series of connected surfaces from the given profile points.
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
 * Multiply two matrices together.
 *
 * @param {Array<Array<number>>} m1 The first matrix.
 * @param {Array<Array<number>>} m2 The second matrix.
 * @returns {Array<Array<number>>} The product of the two input matrices.
 */
function multiplyMatrices(m1, m2) {
let result=[];
for(let i=0;i<m1.length;i++){
result[i]=[];
for(let j=0;j<m2[0].length;j++){
let sum=0;
for(let k=0;k<m1[0].length;k++){
sum+=m1[i][k]*m2[k][j];
}
result[i][j]=sum;
}
}
return result;





// Function: multiplyMatrixVector
/**
 * @param {Array} matrix - The input matrix.
 * @param {Object} vector - The input vector.
 * @returns {Object} The result of the matrix-vector multiplication.
 */
function multiplyMatrixVector(matrix, vector) {
  let result = {x: 0, y: 0, z: 0};
  for (let i = 0; i < matrix.length; i++) {
    let sum = {x: 0, y: 0, z: 0};
    for (let j = 0; j < vector.x; j++) {
      sum.x += matrix[i][j] * vector.y[j];
      sum.y += matrix[i][j+1] * vector.y[j];
      sum.z += matrix[i][j+2] * vector.y[j];
    }
    result.x += sum.x;
    result.y += sum.y;
    result.z += sum.z;
  }
  return {x: result.x, y: result.y, z: result.z};
}





// Function: projectPointOnSurface
/**
 * Projects a point onto a surface.
 * @param {Object} point - The point to project.
 * @param {Object} surface - The surface to project onto.
 * @return {Object} The projected point.
 */
function projectPointOnSurface(point, surface) {
  const [u, v] = evaluateSurface(surface);
  return { x: u * point.x + v * surface.u, y: u * point.y + v * surface.v, z: u * point.z };
}





// Function: revolve
/**
 * @param {Array<Point>} profile The 3D profile to revolve.
 * @param {Vector} axis The axis of rotation.
 * @param {Number} angle The angle of rotation in radians.
 * @return {Solid} The resulting solid after revolving the profile.
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
 * @param {Object} point - The point to be rotated.
 * @param {Object} axis - The axis of rotation.
 * @param {Number} angle - The angle of rotation in radians.
 * @returns {Object} The rotated point.
 */
function rotate(point, axis, angle) {
    var u = {x: point.x - axis.x, y: point.y - axis.y, z: point.z - axis.z};
    var uMag = Math.sqrt(u.x*u.x + u.y*u.y + u.z*u.z);
    var xAxis = {x: axis.x / uMag, y: 0, z: 0};
    var yAxis = {x: 0, y: axis.y / uMag, z: 0};
    var zAxis = {x: 0, y: 0, z: axis.z / uMag};

    var xRotationMatrix = [[Math.cos(angle), -Math.sin(angle)*u.x/uMag, Math.sin(angle)*u.z/uMag],
                             [Math.sin(angle)*u.y/uMag + Math.cos(angle)*(axis.y/axisMag), Math.cos(angle) - Math.sin(angle)*axis.y/axisMag*u.z/uMag,
                             [-Math.sin(angle)*u.z/uMag + Math.cos(angle)*(axis.z/axisMag)]];
    var yRotationMatrix = [[Math.cos(angle), 0, -Math.sin(angle)],
                             [0, Math.cos(angle), 0],
                             [Math.sin(angle), 0, Math.cos(angle)]];
    var zRotationMatrix = [[Math.cos(angle), -Math.sin(angle)*u.x/uMag, Math.sin(angle)*u.y/uMag],
                             [Math.sin(angle)*u.z/uMag + Math.cos(angle)*(axis.z/axisMag), 0,
                             [-Math.sin(angle)*u.y/uMag + Math.cos(angle)*(axis.y/axisMag)]];
    var x = point.x;
    var y = point.y;
    var z = point.z;

    var rotatedX = (xRotationMatrix[0][0]*x + xRotationMatrix[0][1]*(y - axis.y) + xRotationMatrix[0][2]*(z - axis.z)) * uMag + axis.x;
    var rotatedY = (xRotationMatrix[1][0]*(x - axis.x) + yRotationMatrix[1][1]*y + zRotationMatrix[1][2]*(z - axis.z)) * uMag + axis.y;
    var rotatedZ = (xRotationMatrix[2][0]*(x - axis.x) + xRotationMatrix[2][1]*(y - axis.y) + zRotationMatrix[2][2]*(z - axis.z)) * uMag + axis.z;

    return {x: rotatedX, y: rotatedY, z: rotatedZ};
}





// Function: scale
/**
 * @param {Object} point - The point to scale.
 * @param {number} scaleFactor - The factor by which to scale the point.
 * @returns {Object} Scaled point with x, y, and z coordinates.
 */
function scale(point,scaleFactor){return{ x:point.x*scaleFactor,y:point.y*scaleFactor,z:point.z*scaleFactor};}





// Function: subtract
/**
 * @param {Object} solid1 
 * @param {Object} solid2 
 * @returns {Object}
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
 * @param {Object} v1 First vector.
 * @param {Object} v2 Second vector.
 * @returns {Object} Resultant vector after subtracting v2 from v1.
 */
function subtractVectors(v1,v2){return{xA:v1.x-v2.x,yA:v1.y-v2.y,zA:v1.z-v2.z};}





// Function: sweep
/**
 * @param {Object} profile - 
 * @param {String} path - 
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
 * @param {Object} point - Point to translate.
 * @param {Object} vector - Vector to add to the point.
 * @returns {Object} Translated point with updated x, y, and z coordinates.
 */
function translate(point, vector) {
    let x = point.x + vector.x;
    let y = point.y + vector.y;
    let z = point.z + vector.z;
    return {x, y, z};





// Function: union
/**
 * @param {Solid} solid1
 * @param {Solid} solid2
 * @return {Solid}
 */
function union(solid1, solid2) {
    let shells = [];
    for (let i = 0; i < solid1.shells.length; i++) {
        shells.push(cloneShell(solid1.shells[i]));
    }
    shells = addShells(shells, cloneShellArray(solid2.shells));

    let faces = [];
    for (let i = 0; i < solid1.faces.length; i++) {
        faces.push(cloneFace(solid1.faces[i]));
    }
    for (let i = 0; i < solid2.faces.length; i++) {
        faces.push(cloneFace(solid2.faces[i]));
    }

    let loops = [];
    for (let i = 0; i < solid1.loops.length; i++) {
        loops.push(cloneLoop(solid1.loops[i]));
    }
    for (let i = 0; i < solid2.loops.length; i++) {
        loops.push(cloneLoop(solid2.loops[i]));
    }

    let edges = [];
    for (let i = 0; i < solid1.edges.length; i++) {
        edges.push(cloneEdge(solid1.edges[i], solid2.vertices));
    }
    for (let i = 0; i < solid2.edges.length; i++) {
        edges.push(cloneEdge(solid2.edges[i], solid1.vertices, solid2.vertices));
    }

    let unionSolid = new Solid();
    unionSolid.shells = shells;
    unionSolid.faces = faces;
    unionSolid.loops = loops;
    unionSolid.edges = edges;
    unionSolid.vertices = solid1.vertices.concat(solid2.vertices);

    return unionSolid;
}

function cloneShell(shell) {
    // implement me
}

function addShells(shells, shellArray) {
    // implement me
}

function cloneShellArray(shellArray) {
    // implement me
}

function cloneFace(face) {
    // implement me
}

function cloneLoop(loop) {
    // implement me
}

function cloneEdge(edge, vertices) {
    // implement me
}





