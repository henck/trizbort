import { RoomShape, LineStyle } from "../enums";
import { MapSettings } from "../models";

export class HandDrawnTheme extends MapSettings {
  constructor() {
    super();

    this.basic.fontFamily = 'danielbd';
    this.basic.fontSize = 13;
    this.basic.handdrawn = true;

    this.grid.background = '#ffffff';
    this.grid.color = '#f0f0f0';

    this.room.fillColor = '#ffffff';
    this.room.borderColor = '#000000';
    this.room.nameColor = '#333333';
    this.room.subtitleColor = '#666666';
    this.room.rounding = 0;
    this.room.shape = RoomShape.Rectangle;
    this.room.lineWidth = 2;

    this.connector.color = '#000000';
    
    this.note.fillColor = '#ffffff';
    this.note.borderColor = '#000000';
    this.note.textColor = '#333333';
    this.note.rounding = 0;
    this.note.shape = RoomShape.Rectangle;
    this.note.lineWidth = 1;

    this.block.fillColor = '#D5E5D6';
    this.block.borderColor = '#000000';
    this.block.shape = RoomShape.Rectangle;
    this.block.rounding = 0;
    this.block.lineStyle = LineStyle.Dash;
    this.block.lineWidth = 1;
  }
}