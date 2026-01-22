export class Rect {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  /**
   * Create a rectangle given two coordinates.
   * Coordinates are automatically swapped if necessary.
   */
  constructor(x: number, y: number, x2: number, y2: number) {
    this.set(x, y, x2, y2);
  }

  set(x: number, y: number, x2: number, y2: number){
    this.x = Math.min(x, x2);
    this.y = Math.min(y, y2);
    this.width = Math.abs(x2 - x);
    this.height = Math.abs(y2 - y);
  }

  maximize(r: Rect) {
    this.set(Math.min(this.x, r.x), Math.min(this.y, r.y), Math.max(this.x + this.width, r.x + r.width), Math.max(this.y + this.height, r.y + r.height));
  }

  expand(w: number, h?: number) {
    h = h || w;
    this.set(this.x - w, this.y - h, this.x + this.width + 2*w, this.y + this.height + 2*h);
  }

  /**
   * Returns `true` if the rectangle contains the coordinate.
   */
  contains(x: number, y: number) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }

  /**
   * Returns `true` if this rectangle intersects with another rectangle.
   */
  intersects(r: Rect) {
    return this.x < r.x + r.width && this.x + this.width > r.x &&
           this.y < r.y + r.height && this.y + this.height > r.y;
  }
}