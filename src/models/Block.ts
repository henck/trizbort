import { Model } from './Model'
import { Box } from './Box'
import { MapSettings } from './MapSettings';

import { LineStyle, RoomShape } from '../enums'

export class Block extends Box {
  constructor(settings: MapSettings) {
    super();
    this._type = 'Block';
    this._w = settings.block.width;
    this._h = settings.block.height;
  }

  get fillColor(): string {
    return this._fillColor ?? this.map.settings.block.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this.setDirty();
  }

  get borderColor(): string {
    return this._borderColor ?? this.map.settings.block.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
    this.setDirty();
  }  

  get rounding(): number {
    return this._rounding ?? this.map.settings.block.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
    this.setDirty();
  }

  get shape(): RoomShape {
    return this._shape ?? this.map.settings.block.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
    this.setDirty();
  }

  get lineStyle(): LineStyle {
    return this._lineStyle ?? this.map.settings.block.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.setDirty();
  }

  get lineWidth(): number {
    return this._lineWidth ?? this.map.settings.block.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this.setDirty();
  }    

  clone(): Model {
    return this.cloneToTarget(new Block(new MapSettings()));
  }
}