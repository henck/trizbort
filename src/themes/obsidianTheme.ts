import { RoomShape, LineStyle } from "../enums/enums";
import { MapSettings } from "../models/mapSettings";

export class ObsidianTheme extends MapSettings {
  constructor() {
    super();

    this.grid.background = '#000';
    this.grid.color = '#333';

    this.room.fillColor = '#333';
    this.room.borderColor = '#fff';
    this.room.nameColor = '#fff';
    this.room.subtitleColor = '#fff';
    this.room.rounding = 4;
    this.room.shape = RoomShape.Rectangle;
    this.room.lineWidth = 2;

    this.connector.color = '#fff';
    
    this.note.fillColor = '#333';
    this.note.borderColor = '#fff';
    this.note.textColor = '#fff';
    this.note.rounding = 4;
    this.note.shape = RoomShape.Rectangle;
    this.note.lineWidth = 2;

    this.block.fillColor = '#333';
    this.block.borderColor = '#fff';
    this.block.shape = RoomShape.Rectangle;
    this.block.rounding = 4;
    this.block.lineStyle = LineStyle.Dash;
    this.block.lineWidth = 2;
  }
}