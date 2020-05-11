import { Model } from './Model'
import { Direction, LineStyle, RoomShape } from '../enums'

export abstract class Box extends Model {
  protected _x: number;
  protected _y: number;
  protected _w: number;
  protected _h: number;
  protected _lineStyle: LineStyle;
  protected _lineWidth: number;  
  protected _shape: RoomShape;
  protected _rounding: number;
  protected _fillColor: string;
  protected _borderColor: string;

  /**
   * Return Box's X-coordinate
   * @returns X-coordinate
   */
  get x(): number {
    return this._x;
  }

  /**
   * Set Box's X-coordinate
   * @param val X-coordinate in px
   */  
  set x(val: number) {
    this._x = val;
    this.setDirty();
  }

  /**
   * Return Box's Y-coordinate
   * @returns Y-coordinate
   */
  get y(): number {
    return this._y;
  }

  /**
   * Set Box's Y-coordinate
   * @param val Y-coordinate in px
   */
  set y(val: number) {
    this._y = val;
    this.setDirty();
  }

  /**
   * Return Box's width
   * @returns Box width in px
   */
  get width(): number {
    return this._w;
  }

  /**
   * Set box's width in px
   * @param val Box width in px
   */
  set width(val: number) {
    this._w = val;
    this.setDirty();
  }

  /**
   * Return Box's height
   * @returns Box height in px
   */
  get height(): number {
    return this._h;
  }

  /**
   * Set box's height in px
   * @param val Box height in px
   */  
  set height(val: number) {
    this._h = val;
    this.setDirty();
  }

  //
  // Convert a direction to a canvas position on the room's edge.
  // 
  directionToPos(dir: Direction, forceRectangle: boolean) {
    let x = 0;
    let y = 0;
    if(this._shape == RoomShape.Rectangle || forceRectangle) {
      var { x: vx, y: vy } = Direction.toVector(dir);
      x = Math.floor(vx * (this._w / 2) + this._w / 2) + this._x;
      y = Math.floor(vy * (this._h /2) + this._h / 2) + this._y;
      // Find room rounding radius. It must never be greater than 1/4 of the room's side.
      // The following code does nothing if rounding = 0.
      let r = this._rounding;
      if(r > this._w * 0.25) r = this._w * 0.25;
      if(r > this._h * 0.25) r = this._h * 0.25;
      // Calculate the shift along the x or y axis.
      let rdist = r - Math.sqrt(r*r / 2);
      // Diagonal directions must lie exactly in the middle of the rounded corner;
      if(dir == Direction.NW) {
        x = x + rdist;
        y = y + rdist;
      }
      if(dir == Direction.NE) {
        x = x - rdist;
        y = y + rdist;
      }
      if(dir == Direction.SE) {
        x = x - rdist;
        y = y - rdist;
      }
      if(dir == Direction.SW) {
        x = x + rdist;
        y = y - rdist;
      }      
    }
    else if(this._shape == RoomShape.Ellipse) {
      x = Math.floor(Math.cos(Direction.toRadians(dir)) * (this.width / 2) + this.width / 2) + this.x;
      y = Math.floor(Math.sin(Direction.toRadians(dir)) * (this.height / 2) + this.height / 2) + this.y;
    }
    else if(this._shape == RoomShape.Octagon) {
      var { x: vx, y: vy } = Direction.toVector(dir);
      // If a diagonal direction (NE, SE, SW, NW):
      if(Math.abs(vx) == 1 && Math.abs(vy) == 1) {
        vx = vx * 0.75;
        vy = vy * 0.75;
      }
      x = Math.floor(vx * (this.width / 2) + this.width / 2) + this.x;
      y = Math.floor(vy * (this.height /2) + this.height / 2) + this.y;
    }
    return { x: x, y: y };
  }  
}