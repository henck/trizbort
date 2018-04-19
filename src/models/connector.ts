import { Model } from './model.js'
import { Map } from './map.js'
import { Room } from './room.js'
import { Direction, LineStyle } from '../enums/enums.js'
import { Xml } from '../io/xmlMap.js'
import { MapSettings } from './mapSettings.js';
import { ConnectorType } from '../enums/connectorType.js';

export class Connector extends Model {
  type: string;

  name: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  dockStart: Room; 
  dockEnd: Room;
  startDir: Direction;
  endDir: Direction;
  oneWay: boolean;
  startType: ConnectorType;
  endType: ConnectorType;
  startLabel: string;
  endLabel: string;
  
  private _color: string;
  private _lineStyle: LineStyle;
  private _lineWidth: number;
  private _isCurve: boolean;

  constructor(settings: MapSettings) {
    super();
    this.type = "Connector";
    this.name = '';
    this.dockStart = null;
    this.dockEnd = null;
    this.startDir = Direction.N;
    this.endDir = Direction.S;
    this.startX = this.startY = 0;
    this.endX = this.endY = 0;
    this.oneWay = false;
    this.startType = ConnectorType.Default;
    this.endType = ConnectorType.Default;
    this.startLabel = '';
    this.endLabel = '';
  }

  get color() {
    return this._color != null ? this._color : this.map.settings.connector.color;
  }

  set color(c: string) {
    this._color = c;
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.connector.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.connector.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
  }

  get isCurve() {
    return this._isCurve != null ? this._isCurve : this.map.settings.connector.isCurve;
  }

  set isCurve(curve: boolean) {
    this._isCurve = curve;
  }

  reverse() {
    if(!this.isDoubleDocked()) return;
    [this.dockEnd, this.dockStart]  = [this.dockStart, this.dockEnd];
    [this.endDir, this.startDir] = [this.startDir, this.endDir];
  }

  isDoubleDocked() {
    return this.dockStart && this.dockEnd;
  }

  clone(): Model {
    return this.cloneToTarget(new Connector(new MapSettings()));
  }  
}