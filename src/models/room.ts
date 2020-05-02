import { Model } from './model.js'
import { Box } from './box.js'
import { Map } from './map.js'
import { Direction, LineStyle, RoomShape, Values, ConnectorType } from '../enums/enums.js'
import { Xml } from '../io/xmlMap';
import { MapSettings } from './mapSettings.js';
import { Connector } from './connector.js';
import { Obj } from './obj.js';

export class Room extends Box {

  protected _name: string;
  protected _subtitle: string;
  protected _description: string;
  protected _dark: boolean;
  protected _endroom: boolean;
  protected _nameColor: string;
  protected _subtitleColor: string;

  objects: Array<Obj>;

  constructor(settings: MapSettings) {
    super(settings);
    this._type = "Room";
    this._name = 'Room';
    this._subtitle = '';
    this._description = '';
    this._dark = false;
    this._endroom = false;
    this._w = settings.room.width;
    this._h = settings.room.height;
    this.objects = new Array<Obj>();
  }

  get name(): string {
    return this._name;
  };

  get subtitle(): string {
    return this._subtitle;
  };

  get description(): string {
    return this._description;
  };

  get dark(): boolean {
    return this._dark;
  };

  get endroom(): boolean {
    return this._endroom;
  };

  set name(val:string) {
    this._name = val;
    this._changed = true;
  };

  set subtitle(val:string) {
    this._subtitle = val;
    this._changed = true;
  };

  set description(val:string) {
    this._description = val;
    this._changed = true;
  };

  set dark(val: boolean) {
    this._dark = val;
    this._changed = true;
  };

  set endroom(val: boolean) {
    this._endroom = val;
    this._changed = true;
  };

  get nameColor() {
    if(!this._nameColor) return this.map.settings.room.nameColor;
    return this._nameColor;
  }

  set nameColor(color: string) {
    this._nameColor = color;
    this._changed = true;
  }

  get subtitleColor() {
    if(!this._subtitleColor) return this.map.settings.room.subtitleColor;
    return this._subtitleColor;
  }

  set subtitleColor(color: string) {
    this._subtitleColor = color;
    this._changed = true;
  }  

  get fillColor() {
    return this._fillColor ? this._fillColor : this.map.settings.room.fillColor;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this._changed = true;
  }

  get borderColor() {
    return this._borderColor ? this._borderColor : this.map.settings.room.borderColor;
  }

  set borderColor(color: string) {
    this._borderColor = color;
    this._changed = true;
  }  

  get rounding() {
    return this._rounding != null ? this._rounding : this.map.settings.room.rounding;
  }

  set rounding(r: number) {
    this._rounding = r;
    this._changed = true;
  }

  get shape() {
    return this._shape != undefined ? this._shape : this.map.settings.room.shape;
  }

  set shape(s: RoomShape) {
    this._shape = s;
    this._changed = true;
  }

  get lineStyle() {
    return this._lineStyle != null ? this._lineStyle : this.map.settings.room.lineStyle;
  }

  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this._changed = true;
  }

  get lineWidth() {
    return this._lineWidth != null ? this._lineWidth : this.map.settings.room.lineWidth;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
    this._changed = true;
  }    

  isStartRoom(): boolean {
    return this.map.startRoom == this;
  }

  setStartRoom(isStartRoom: boolean) {
    if(isStartRoom) {
      this.map.setStartRoom(this);
    } else {
      if(this.isStartRoom) this.map.setStartRoom(null);
    }
    this._changed = true;
  }

  // Returns true if this room has a connector in the specified direction.
  hasConnection(dir: Direction) {
    let found = false;
    this.map.elements.forEach((model) => { 
      if(model instanceof Connector) {
        if(model.dockStart == this && model.startDir == dir) found = true;
        if(model.dockEnd == this && model.endDir == dir) found = true;
      }
    });
    return found;
  }

  protected cloneToTargetField(target: Model, key: string) {
    switch (key) {
      case 'objects':
        (<any>target)[key] = this.objects.slice(0);
        break;
      default:
        super.cloneToTargetField(target, key);
        break;
    }
  }

  clone(): Model {
    return this.cloneToTarget(new Room(new MapSettings()));
  }
  
  // 
  // List of connectors that connect this room to 
  // another room.
  // 
  get connectors(): Array<Connector> {
    return this.map.elements.filter((conn) => { 
      return conn instanceof Connector 
          && conn.dockStart 
          && conn.dockEnd 
          && (conn.dockStart == this || conn.dockEnd == this); }) as Array<Connector>;
  }

  // 
  // List of StartDirection, StartType, EndDirection, EndType, Room tuples representing connections
  // from this room.
  //
  // This is of use for code generators who are interested in all connections starting OR
  // ending at this room.
  // 
  get connections(): Array<{ startDir: Direction, startType: ConnectorType, endDir: Direction, endType: ConnectorType, room: Room }> {
    let connectors = this.connectors;
    return connectors.map((conn) => { 
      if(conn.dockStart == this) {
        return {startDir: conn.startDir, startType: conn.startType, endDir: conn.endDir, endType: conn.endType, room: conn.dockEnd};
      } else { 
        return {startDir: conn.endDir, startType: conn.endType, endDir: conn.startDir, endType: conn.startType, room: conn.dockStart};
      }
    });
  }
}