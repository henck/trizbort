import { Model } from './model.js'
import { Box } from './box.js'
import { Map } from './map.js'
import { Direction, LineStyle, RoomShape, Values } from '../enums/enums.js'
import { MapSettings } from './mapSettings.js';

export class Note extends Box {
  text: string;
  private _textColor: string;

  constructor(settings: MapSettings) {
    super(settings);
    this.type = 'Note';
    this.text = 'Note';

    this.width = settings.note.width;
    this.height = settings.note.height;
  }

  get textColor() {
    if(!this._textColor) return this.map.settings.note.textColor;
    return this._textColor;
  }

  set textColor(color: string) {
    this._textColor = color;
  }

  get fillColor() {
    return this._fillColor ? this._fillColor : this.map.settings.note.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
  }

  get borderColor() {
    return this._borderColor ? this._borderColor : this.map.settings.note.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
  }  

  get rounding() {
    return this._rounding != null ? this._rounding : this.map.settings.note.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
  }

  get shape() {
    return this._shape != null ? this._shape : this.map.settings.note.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.note.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.note.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
  }    

  clone(): Model {
    return this.cloneToTarget(new Note(new MapSettings()));
  }
}