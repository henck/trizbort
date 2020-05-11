import { LineStyle, RoomShape } from '../enums'
import { Model } from './Model'
import { Box } from './Box'
import { MapSettings } from './MapSettings';

export class Note extends Box {
  protected _text: string;
  private _textColor: string;

  constructor(settings: MapSettings) {
    super();
    this.type = 'Note';
    this.text = 'Note';
    this._w = settings.note.width;
    this._h = settings.note.height;
  }  
  
  public get text(): string {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
    this.setDirty();
  }

  get textColor(): string {
    return this._textColor ?? this.map.settings.note.textColor;
  }

  set textColor(color: string) {
    this._textColor = color;
    this.setDirty();
  }

  get fillColor(): string {
    return this._fillColor ?? this.map.settings.note.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this.setDirty();
  }

  get borderColor(): string {
    return this._borderColor ?? this.map.settings.note.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
    this.setDirty();
  }  

  get rounding(): number {
    return this._rounding ?? this.map.settings.note.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
    this.setDirty();
  }

  get shape(): RoomShape {
    return this._shape ?? this.map.settings.note.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
    this.setDirty();
  }

  get lineStyle(): LineStyle {
    return this._lineStyle ?? this.map.settings.note.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.setDirty();
  }

  get lineWidth(): number {
    return this._lineWidth ?? this.map.settings.note.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this.setDirty();
  }    

  clone(): Model {
    return this.cloneToTarget(new Note(new MapSettings()));
  }

}