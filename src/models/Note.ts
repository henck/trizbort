import { LineStyle, RoomShape } from '../enums'
import { Model } from './Model'
import { Box } from './Box'
import { MapSettings } from './MapSettings';

export class Note extends Box {
  protected _text: string;
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
    this._changed = true;
  }
  private _textColor: string;

  constructor(settings: MapSettings) {
    super(settings);
    this.type = 'Note';
    this.text = 'Note';

    this._w = settings.note.width;
    this._h = settings.note.height;
  }

  get textColor() {
    if(!this._textColor) return this.map.settings.note.textColor;
    return this._textColor;
  }

  set textColor(color: string) {
    this._textColor = color;
    this._changed = true;
  }

  get fillColor() {
    return this._fillColor ? this._fillColor : this.map.settings.note.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this._changed = true;
  }

  get borderColor() {
    return this._borderColor ? this._borderColor : this.map.settings.note.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
    this._changed = true;
  }  

  get rounding() {
    return this._rounding != null ? this._rounding : this.map.settings.note.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
    this._changed = true;
  }

  get shape() {
    return this._shape != null ? this._shape : this.map.settings.note.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
    this._changed = true;
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.note.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this._changed = true;
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.note.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this._changed = true;
  }    

  clone(): Model {
    return this.cloneToTarget(new Note(new MapSettings()));
  }

}