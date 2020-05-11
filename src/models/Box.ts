import { Model } from './Model'
import { Direction, LineStyle, RoomShape } from '../enums'
import { MapSettings } from './MapSettings';


export class Box extends Model {
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

  constructor(settings: MapSettings) {
    super();
    this._x = 0;
    this._y = 0;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get width(): number {
    return this._w;
  }

  get height(): number {
    return this._h;
  }

  set x(val: number) {
    this._x = val;
    this.dirty();
  }

  set y(val: number) {
    this._y = val;
    this.dirty();
  }

  set width(val: number) {
    this._w = val;
    this.dirty();
  }

  set height(val: number) {
    this._h = val;
    this.dirty();
  }

  get fillColor() {
    return this._fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this.dirty();
  }

  get borderColor() {
    return this._borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
    this.dirty();
  }  

  get rounding() {
    return this._rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
    this.dirty();
  }

  get shape() {
    return this._shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
    this.dirty();
  }

  get lineStyle() {
    return this._lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.dirty();
  }

  get lineWidth() {
    return this._lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this.dirty();
  }
  
  //
  // Convert a direction to a canvas position on the room's edge.
  // 
  directionToPos(dir: Direction, forceRectangle: boolean) {
    let x = 0;
    let y = 0;
    if(this.shape == RoomShape.Rectangle || forceRectangle) {
      var { x: vx, y: vy } = Direction.toVector(dir);
      x = Math.floor(vx * (this._w / 2) + this._w / 2) + this._x;
      y = Math.floor(vy * (this._h /2) + this._h / 2) + this._y;
      // Find room rounding radius. It must never be greater than 1/4 of the room's side.
      // The following code does nothing if rounding = 0.
      let r = this.rounding;
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
    else if(this.shape == RoomShape.Ellipse) {
      x = Math.floor(Math.cos(Direction.toRadians(dir)) * (this.width / 2) + this.width / 2) + this.x;
      y = Math.floor(Math.sin(Direction.toRadians(dir)) * (this.height / 2) + this.height / 2) + this.y;
    }
    else if(this.shape == RoomShape.Octagon) {
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