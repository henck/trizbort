import { Direction, LineStyle, RoomShape, ConnectorType } from '../enums'
import { Model } from './Model'
import { Box } from './Box'
import { MapSettings } from './MapSettings';
import { Connector } from './Connector';
import { Obj } from './Obj';

export class Room extends Box {

  protected _name: string;              // Name of the room, e.g. "Twisty passage"
  protected _subtitle: string;          // Subtitle of the room
  protected _description: string;       // Room description, e.g. "You are in..."
  protected _dark: boolean;             // Is the room dark?
  protected _endroom: boolean;          // Is this an end room?
  protected _nameColor: string;         // Color to draw room's name in
  protected _subtitleColor: string;     // Color to draw room's subtitle in

  objects: Obj[];

  /**
   * Create a new `Room` instance.
   * @param settings Map settings to use for this room
   */
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
    this.objects = [];
  }

  ///
  /// Acessor methods
  ///

  /**
   * Returns room name, e.g. "twisty passage"
   */
  get name(): string {
    return this._name;
  };

  /**
   * Sets room name, e.g. "twisty passage"
   */
  set name(val:string) {
    this._name = val;
    this.dirty();
  };

  /**
   * Returns room subtitle
   */
  get subtitle(): string {
    return this._subtitle;
  };

  /**
   * Sets room subtitle
   */
  set subtitle(val:string) {
    this._subtitle = val;
    this.dirty();
  };

  /**
   * Returns room description
   */
  get description(): string {
    return this._description;
  };

  /**
   * Sets room description
   */
  set description(val:string) {
    this._description = val;
    this.dirty();
  };

  /**
   * Returns room dark status
   * 
   * @returns `true` if room is dark, `false` if not.
   */
  get dark(): boolean {
    return this._dark;
  };

  /**
   * Sets room dark status
   */
  set dark(val: boolean) {
    this._dark = val;
    this.dirty();
  };

  /**
   * Gets endroom status (a room where the game ends)
   * 
   * @returns `true` if this is an endroom, `false` if not.
   */
  get endroom(): boolean {
    return this._endroom;
  };

  /**
   * Sets endroom status (is this a room where the game ends?)
   */ 
  set endroom(val: boolean) {
    this._endroom = val;
    this.dirty();
  };

  /**
   * Returns the color to draw the room's name with.
   * If not set, the default room name color from the map settings
   * is returned.
   * @returns HTML Color
   */
  get nameColor(): string {
    return this._nameColor ?? this.map.settings.room.nameColor;
  }

  /**
   * Sets the color to draw the room's name with.
   * @param color HTML color
   */
  set nameColor(color: string) {
    this._nameColor = color;
    this.dirty();
  }

  /**
   * Returns the color to draw the room's subtitle with.
   * If not set, the default room subtitle color from the map settings
   * is returned.
   * @returns HTML color
   */  
  get subtitleColor(): string {
    return this._subtitleColor ?? this.map.settings.room.subtitleColor;
  }

  /**
   * Sets the color to draw the room's subtitle with.
   * @param color HTML color
   */
  set subtitleColor(color: string) {
    this._subtitleColor = color;
    this.dirty();
  }  

  /**
   * Returns the color to fill the room backgroun with.
   * If not set, the default room fill color from the map settings
   * is returned.
   * @returns HTML color
   */  
  get fillColor() {
    return this._fillColor ?? this.map.settings.room.fillColor;
  }

  /**
   * Sets the color to fill the room background with.
   * @param color HTML color
   */
  set fillColor(color: string) {
    this._fillColor = color;
    this.dirty();
  }

  /**
   * Returns the color to draw the room's border with.
   * If not set, the default room border color from the map settings
   * is returned.
   * @returns HTML color
   */    
  get borderColor() {
    return this._borderColor ?? this.map.settings.room.borderColor;
  }

  /**
   * Sets the color to draw the room's border with.
   * @param color HTML color
   */
  set borderColor(color: string) {
    this._borderColor = color;
    this.dirty();
  }  

  /**
   * Returns the rounding to apply to the room's border.
   * If not set, the default room rounding from the map settings 
   * is returned.
   * @returns Border rounding in px
   */
  get rounding() {
    return this._rounding ?? this.map.settings.room.rounding;
  }

  /**
   * Sets the rounding to apply to the room's border.
   * @param r Border rounding in px
   */
  set rounding(r: number) {
    this._rounding = r;
    this.dirty();
  }

  /**
   * Returns the room's shape. If not set, the default room shape
   * from the map settings is returned.
   * @returns RoomShape
   */
  get shape(): RoomShape {
    return this._shape ?? this.map.settings.room.shape;
  }

  /**
   * Sets the room's shape.
   * @param s: RoomShape
   */
  set shape(s: RoomShape) {
    this._shape = s;
    this.dirty();
  }

  /**
   * Returns the room's line style. If not set, the default room
   * line style from the map settings is returned.
   * @returns LineStyle
   */
  get lineStyle(): LineStyle {
    return this._lineStyle ?? this.map.settings.room.lineStyle;
  }

  /**
   * Sets the room's line style.
   * @param style LineStyle
   */
  set lineStyle(style: LineStyle) {
    this._lineStyle = style;
    this.dirty();
  }

  /**
   * Returns the room's line width. If not set, the default room
   * line width from the map settings is returned.
   * @returns Line width in px
   */
  get lineWidth(): number {
    return this._lineWidth ?? this.map.settings.room.lineWidth;
  }

  /**
   * Set the room's line width.
   * @param width Line width in px
   */
  set lineWidth(width: number) {
    this._lineWidth = width;
    this.dirty();
  }    

  ///
  /// Methods
  ///

  /**
   * Is this room the map's starting room?
   */
  isStartRoom(): boolean {
    return this.map.startRoom == this;
  }

  /**
   * Set or unset this room as the map's starting room
   * @param isStartRoom If `true`, make this room the map's starting room. If `false`, 
   * unset it as the starting room (if it was).
   */
  setStartRoom(isStartRoom: boolean): void {
    if(isStartRoom) {
      this.map.setStartRoom(this);
    } else {
      if(this.isStartRoom) this.map.setStartRoom(null);
    }
    this.dirty();
  }

  /**
   * Returns the room in the specified direction.
   * @param dir Direction
   * @returns Room in specified direction, or `null` if no Room found.
   */
  findConnectingRoom(dir: Direction): Room {
    let found = null;
    this.map.elements.forEach((model) => { 
      if(model instanceof Connector) {
        if(model.dockStart == this && model.startDir == dir) found = model.dockEnd;
        if(model.dockEnd == this && model.endDir == dir) found = model.dockStart;
      }
    });
    return found;
  }

  protected cloneToTargetField(target: Model, key: string) {
    switch (key) {
      case 'objects':
        (<any>target)[key] = this.objects.slice();
        break;
      default:
        super.cloneToTargetField(target, key);
        break;
    }
  }

  clone(): Model {
    return this.cloneToTarget(new Room(new MapSettings()));
  }
  
  /** 
   * Return a list of connectors that connect this room to 
   * another room.
   * @returns Array of `Connector` instances
   */ 
  get connectors(): Connector[] {
    return this.map.elements.filter((conn) => { 
      return conn instanceof Connector 
          && conn.dockStart 
          && conn.dockEnd 
          && (conn.dockStart == this || conn.dockEnd == this); }) as Connector[];
  }

  /** 
   * List of StartDirection, StartType, EndDirection, EndType, Room tuples representing connections
   * from this room.
   *
   * This is of use for code generators who are interested in all connections starting OR
   * ending at this room.
   */ 
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
