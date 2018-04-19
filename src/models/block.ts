import { Model } from './model.js'
import { Box } from './box.js'
import { Map } from './map.js'
import { Direction, LineStyle, RoomShape, Values } from '../enums/enums.js'
import { MapSettings } from './mapSettings.js';

export class Block extends Box {
  constructor(settings: MapSettings) {
    super(settings);
    this.type = 'Block';

    this.width = settings.block.width;
    this.height = settings.block.height;
  }

  get fillColor() {
    return this._fillColor ? this._fillColor : this.map.settings.block.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
  }

  get borderColor() {
    return this._borderColor ? this._borderColor : this.map.settings.block.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
  }  

  get rounding() {
    return this._rounding != null ? this._rounding : this.map.settings.block.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
  }

  get shape() {
    return this._shape != null ? this._shape : this.map.settings.block.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.block.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.block.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
  }    

  clone(): Model {
    return this.cloneToTarget(new Block(new MapSettings()));
  }
}