import { Direction, LineStyle, ConnectorType } from '../enums'
import { Model } from './Model'
import { Room } from './Room'
import { MapSettings } from './MapSettings';

export class Connector extends Model {
  private _name: string;
  private _startX: number;
  private _startY: number;
  private _endX: number;
  private _endY: number;
  private _dockStart: Room;
  private _dockEnd: Room;  
  private _startDir: Direction;
  private _endDir: Direction;  
  private _oneWay: boolean;
  private _startType: ConnectorType;  
  private _endType: ConnectorType;  
  private _startLabel: string;
  private _endLabel: string;  
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
  
  /** 
   * Returns connector name, e.g. "trapdoor"
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Sets connector name, e.g. "trapdoor"
   */
  public set name(value: string) {
    this._name = value;
    this.setDirty();
  }
  
  public get startX(): number {
    return this._startX
  }

  public set startX(value: number) {
    this._startX = value;
    this.setDirty();
  }

  public get startY(): number {
    return this._startY;
  }

  public set startY(value: number) {
    this._startY = value;
    this.setDirty();
  }
  
  public get endX(): number {
    return this._endX;
  }

  public set endX(value: number) {
    this._endX = value;
    this.setDirty();
  }
  
  public get endY(): number {
    return this._endY;
  }

  public set endY(value: number) {
    this._endY = value;
    this.setDirty();
  }

  public get dockStart(): Room {
    return this._dockStart;
  }
  
  public set dockStart(value: Room) {
    this._dockStart = value;
    this.setDirty();
  }

  public get dockEnd(): Room {
    return this._dockEnd;
  }

  public set dockEnd(value: Room) {
    this._dockEnd = value;
    this.setDirty();
  }
  
  public get startDir(): Direction {
    return this._startDir;
  }

  public set startDir(value: Direction) {
    this._startDir = value;
    this.setDirty();
  }

  public get endDir(): Direction {
    return this._endDir;
  }

  public set endDir(value: Direction) {
    this._endDir = value;
    this.setDirty();
  }

  /**
   * Is this a one-way connector?
   */
  public get oneWay(): boolean {
    return this._oneWay;
  }

  /**
   * Set connector as one-way (true) or two-way (false).
   */
  public set oneWay(value: boolean) {
    this._oneWay = value;
    this.setDirty();
  }

  public get startType(): ConnectorType {
    return this._startType;
  }

  public set startType(value: ConnectorType) {
    this._startType = value;
    this.setDirty();
  }

  public get endType(): ConnectorType {
    return this._endType;
  }

  public set endType(value: ConnectorType) {
    this._endType = value;
    this.setDirty();
  }

  public get startLabel(): string {
    return this._startLabel;
  }

  public set startLabel(value: string) {
    this._startLabel = value;
  }

  public get endLabel(): string {
    return this._endLabel;
  }

  public set endLabel(value: string) {
    this._endLabel = value;
    this.setDirty();
  }
  
  get color(): string {
    return this._color ?? this.map.settings.connector.color;
  }

  set color(c: string) {
    this._color = c;
    this.setDirty();
  }

  get lineStyle(): LineStyle {
    return this._lineStyle ?? this.map.settings.connector.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.setDirty();
  }

  get lineWidth(): number {
    return this._lineWidth ?? this.map.settings.connector.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this.setDirty();
  }

  get isCurve(): boolean {
    return this._isCurve ?? this.map.settings.connector.isCurve;
  }

  set isCurve(curve: boolean) {
    this._isCurve = curve;
    this.setDirty();
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