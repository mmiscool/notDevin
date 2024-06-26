function Solid(Shells) {
  let volume = 0;
  for (let i = 0; i < Shells.length; i++) {
      const shell = Shells[i];
      volume += shell.area() * Math.abs(shell.normal().dot(new Point(0, 0, 1)));
  }
  return volume;
}