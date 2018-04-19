export class Rect {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  // Create a rectangle given two coordinates.
  // Coordinates are automatically swapped if necessary.
  constructor(x: number, y: number, x2: number, y2: number) {
    this.x = Math.min(x, x2);
    this.y = Math.min(y, y2);
    this.width = Math.abs(x2 - x);
    this.height = Math.abs(y2 - y);
  }

  // Returns true if the rectangle contains the coordinate.
  contains(x: number, y: number) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}