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