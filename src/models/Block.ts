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

  /**
   * Load a Block from a POJO from a JSON source.
   * @param settings Map settings
   * @param src POJO
   */  
  static load(settings: MapSettings, src: object): Block {
    // Create a new Block
    let block = new Block(settings);
    // Copy fields from POJO into Block
    for(let key in src) {
      (block as any)[key] = (src as any)[key];
    }
    return block;
  }    

  /**
   * Return Block's background fill color. If not set, return
   * default block fill color from map settings.
   * @returns HTML color
   */
  get fillColor(): string {
    return this._fillColor ?? this.map.settings.block.fillColor;
  }

  /**
   * Set Block's background fill color.
   * @param color HTML color, or null to revert to default from map settings
   */
  set fillColor(color: string) {
    this._fillColor = color;
    this.setDirty();
  }

  /**
   * Return Block's border color. If not set, return
   * default block border color from map settings.
   * @returns HTML color
   */  
  get borderColor(): string {
    return this._borderColor ?? this.map.settings.block.borderColor;
  }

  /**
   * Set Block's border color color.
   * @param color HTML color, or null to revert to default from map settings
   */
  set borderColor(color: string) {
    this._borderColor = color;
    this.setDirty();
  }  

  /**
   * Return Block's border rounding. If not set, return
   * default block border rounding from map settings.
   * @returns Border rounding in px
   */  
  get rounding(): number {
    return this._rounding ?? this.map.settings.block.rounding;
  }

  /**
   * Set Block's rounding.
   * @param r Rounding in px, or null to revert to default from map settings
   */
  set rounding(r: number) {
    this._rounding = r;
    this.setDirty();
  }

  /**
   * Return Block's shape. If not set, return
   * default block shape from map settings.
   * @returns RoomShape
   */  
  get shape(): RoomShape {
    return this._shape ?? this.map.settings.block.shape;
  }

  /**
   * Set Block's shape.
   * @param s RoomShape, or null to revert to default from map settings
   */
  set shape(s: RoomShape) {
    this._shape = s;
    this.setDirty();
  }

  /**
   * Return Block's line style. If not set, return
   * default block line style from map settings.
   * @returns LineStyle
   */  
  get lineStyle(): LineStyle {
    return this._lineStyle ?? this.map.settings.block.lineStyle;
  }

  /**
   * Set Block's line style.
   * @param style LineStyle, or null to revert to default from map settings
   */
  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.setDirty();
  }

  /**
   * Return Block's line width. If not set, return
   * default block line width from map settings.
   * @returns Line width in px
   */  
  get lineWidth(): number {
    return this._lineWidth ?? this.map.settings.block.lineWidth;
  }

  /**
   * Set Block's line width.
   * @param width Line width in px, or null to revert to default from map settings
   */
  set lineWidth(width: number) {
    this._lineWidth = width;
    this.setDirty();
  }    

  clone(): Model {
    return this.cloneToTarget(new Block(new MapSettings()));
  }
}