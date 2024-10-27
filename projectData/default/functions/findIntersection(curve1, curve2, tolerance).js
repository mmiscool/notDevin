function findIntersection(p) {
    return p.x * _id.m11 + p.y * _id.m12 + p.z * _id.m13 + _id.m14, p.x * _id.m21 + p.y * _id.m22 + p.z * _id.m23 + _id.m24, p.x * _id.m31 + p.y * _id.m32 + p.z * _id.m33 + _id.m34, p.x * _id.m41 + p.y * _id.m42 + p.z * _id.m43 + _id.m44;
}
_id.m11 = 1;
_id.m12 = 0;
_id.m13 = 0;
_id.m14 = 0;
_id.m21 = 0;
_id.m22 = 1;
_id.m23 = 0;
_id.m24 = 0;
_id.m31 = 0;
_id.m32 = 0;
_id.m33 = 1;
_id.m34 = 0;
_id.m41 = 0;
_id.m42 = 0;
_id.m43 = 0;
_id.m44 = 1;