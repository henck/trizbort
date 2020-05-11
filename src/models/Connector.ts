import { Direction, LineStyle, ConnectorType } from '../enums'
import { Model } from './Model'
import { Room } from './Room'
import { MapSettings } from './MapSettings';

export class Connector extends Model {
  private _name: string
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value;
    this.dirty();
  }

  private _startX: number
  public get startX(): number {
    return this._startX
  }
  public set startX(value: number) {
    this._startX = value;
    this.dirty();
  }

  private _startY: number
  public get startY(): number {
    return this._startY
  }
  public set startY(value: number) {
    this._startY = value;
    this.dirty();
  }

  private _endX: number
  public get endX(): number {
    return this._endX
  }
  public set endX(value: number) {
    this._endX = value;
    this.dirty();
  }

  private _endY: number
  public get endY(): number {
    return this._endY
  }
  public set endY(value: number) {
    this._endY = value;
    this.dirty();
  }

  private _dockStart: Room 
  public get dockStart(): Room {
    return this._dockStart
  }
  public set dockStart(value: Room) {
    this._dockStart = value;
    this.dirty();
  }

  private _dockEnd: Room
  public get dockEnd(): Room {
    return this._dockEnd
  }
  public set dockEnd(value: Room) {
    this._dockEnd = value;
    this.dirty();
  }

  private _startDir: Direction
  public get startDir(): Direction {
    return this._startDir
  }
  public set startDir(value: Direction) {
    this._startDir = value;
    this.dirty();
  }

  private _endDir: Direction
  public get endDir(): Direction {
    return this._endDir
  }
  public set endDir(value: Direction) {
    this._endDir = value;
    this.dirty();
  }

  private _oneWay: boolean
  public get oneWay(): boolean {
    return this._oneWay
  }
  public set oneWay(value: boolean) {
    this._oneWay = value;
    this.dirty();
  }

  private _startType: ConnectorType
  public get startType(): ConnectorType {
    return this._startType
  }
  public set startType(value: ConnectorType) {
    this._startType = value;
    this.dirty();
  }

  private _endType: ConnectorType
  public get endType(): ConnectorType {
    return this._endType
  }
  public set endType(value: ConnectorType) {
    this._endType = value;
    this.dirty();
  }

  private _startLabel: string
  public get startLabel(): string {
    return this._startLabel
  }
  public set startLabel(value: string) {
    this._startLabel = value
  }

  private _endLabel: string
  public get endLabel(): string {
    return this._endLabel
  }
  public set endLabel(value: string) {
    this._endLabel = value
    this.dirty();
  }
  
  private _color: string;
  private _lineStyle: LineStyle;
  private _lineWidth: number;
  private _isCurve: boolean;

  constructor(settings: MapSettings) {
    super();
    this._type = "Connector";
    this._name = '';
    this._dockStart = null;
    this._dockEnd = null;
    this._startDir = Direction.N;
    this._endDir = Direction.S;
    this._startX = this.startY = 0;
    this._endX = this.endY = 0;
    this._oneWay = false;
    this._startType = ConnectorType.Default;
    this._endType = ConnectorType.Default;
    this._startLabel = '';
    this._endLabel = '';
  }

  get color() {
    return this._color != null ? this._color : this.map.settings.connector.color;
  }

  set color(c: string) {
    this._color = c;
    this.dirty();
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.connector.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.dirty();
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.connector.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this.dirty();
  }

  get isCurve() {
    return this._isCurve != null ? this._isCurve : this.map.settings.connector.isCurve;
  }

  set isCurve(curve: boolean) {
    this._isCurve = curve;
    this.dirty();
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