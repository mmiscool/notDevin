function addLoop(face, loop) {
  if (!("loops" in face) || !Array.isArray(face.loops)) face.loops = [];
  face.loops.push(loop);
}