import { LineStyle, RoomShape } from '../enums'
import { Model } from './Model'
import { Box } from './Box'
import { MapSettings } from './MapSettings';

export class Note extends Box {
  protected _text: string;
  protected _textColor: string;

  constructor(settings: MapSettings) {
    super();
    this.type = 'Note';
    this.text = 'Note'; // Default Note text
    this._w = settings.note.width;
    this._h = settings.note.height;
  }  

  /**
   * Load a Note from a POJO from a JSON source.
   * @param settings Map settings
   * @param src POJO
   */
  static load(settings: MapSettings, src: object): Note {
    // Create a new Note
    let note = new Note(settings);
    // Copy fields from POJO into Note.
    for(let key in src) {
      (note as any)[key] = (src as any)[key];
    }
    return note;
  }  
  
  /**
   * Return Note's text.
   */
  public get text(): string {
    return this._text;
  }

  /**
   * Set Note's text.
   */
  public set text(value: string) {
    this._text = value;
    this.setDirty();
  }

  /**
   * Return Note's text color. If not set, return
   * default note text color from map settings.
   * @returns HTML color
   */  
  get textColor(): string {
    return this._textColor ?? this.map.settings.note.textColor;
  }

  /**
   * Set Note's text color.
   * @param color HTML color, or null to revert to default from map settings
   */  
  set textColor(color: string) {
    this._textColor = color;
    this.setDirty();
  }

  /**
   * Return Note's background fill color. If not set, return
   * default note fill color from map settings.
   * @returns HTML color
   */  
  get fillColor(): string {
    return this._fillColor ?? this.map.settings.note.fillColor;
  }

  /**
   * Set Note's background fill color.
   * @param color HTML color, or null to revert to default from map settings
   */  
  set fillColor(color: string) {
    this._fillColor = color;
    this.setDirty();
  }

  /**
   * Return Note's border color. If not set, return
   * default note border color from map settings.
   * @returns HTML color
   */  
  get borderColor(): string {
    return this._borderColor ?? this.map.settings.note.borderColor;
  }

  /**
   * Set Note's border color.
   * @param color HTML color, or null to revert to default from map settings
   */  
  set borderColor(color: string) {
    this._borderColor = color;
    this.setDirty();
  }  

  /**
   * Return Note's border rounding. If not set, return
   * default note border rounding from map settings.
   * @returns Rounding in px
   */  
  get rounding(): number {
    return this._rounding ?? this.map.settings.note.rounding;
  }

  /**
   * Set Note's border rounding.
   * @param color Rounding in px, or null to revert to default from map settings
   */  
  set rounding(r: number) {
    this._rounding = r;
    this.setDirty();
  }

  /**
   * Return Note's shape. If not set, return
   * default note shape from map settings.
   * @returns RoomShape
   */  
  get shape(): RoomShape {
    return this._shape ?? this.map.settings.note.shape;
  }

  /**
   * Set Note's shape.
   * @param color RoomShape, or null to revert to default from map settings
   */  
  set shape(s: RoomShape) {
    this._shape = s;
    this.setDirty();
  }

  /**
   * Return Note's line style. If not set, return
   * default note line style from map settings.
   * @returns LineStyle
   */  
  get lineStyle(): LineStyle {
    return this._lineStyle ?? this.map.settings.note.lineStyle;
  }

  /**
   * Set Note's line style.
   * @param color LineStyle, or null to revert to default from map settings
   */  
  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.setDirty();
  }

  /**
   * Return Note's line width. If not set, return
   * default note line width from map settings.
   * @returns Line width in px
   */  
  get lineWidth(): number {
    return this._lineWidth ?? this.map.settings.note.lineWidth;
  }

  /**
   * Set Note's line width.
   * @param color Line width in px, or null to revert to default from map settings
   */  
  set lineWidth(width: number) {
    this._lineWidth = width;
    this.setDirty();
  }    

  clone(): Model {
    return this.cloneToTarget(new Note(new MapSettings()));
  }

}