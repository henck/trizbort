import { Model } from './Model'
import { Box } from './Box'
import { MapSettings } from './MapSettings';

import { LineStyle, RoomShape } from '../enums'

export class Block extends Box {
  constructor(settings: MapSettings) {
    super(settings);
    this._type = 'Block';

    this._w = settings.block.width;
    this._h = settings.block.height;
  }

  get fillColor() {
    return this._fillColor ? this._fillColor : this.map.settings.block.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this.dirty();
  }

  get borderColor() {
    return this._borderColor ? this._borderColor : this.map.settings.block.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
    this.dirty();
  }  

  get rounding() {
    return this._rounding != null ? this._rounding : this.map.settings.block.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
    this.dirty();
  }

  get shape() {
    return this._shape != null ? this._shape : this.map.settings.block.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
    this.dirty();
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.block.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.dirty();
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.block.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this.dirty();
  }    

  clone(): Model {
    return this.cloneToTarget(new Block(new MapSettings()));
  }
}