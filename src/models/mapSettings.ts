import { RoomShape, LineStyle } from "../enums/enums";

class MapSettingsGrid {
  visible = true;
  origin = true;
  snap = true;
  size = 32;
  color = '#f0f0f0';
  lineWidth = 1;
  originWidth = 5;
}

class MapSettingsRoom {
  width = 96;
  height = 64;
  margin = 6; // todo
  lineWidth = 1;
  lineStyle = LineStyle.Solid;
  shape = RoomShape.Rectangle;
  rounding = 0;
  darknessSize = 50;
  fillColor = '#ffffff';
  borderColor = '#000000';
  nameColor = '#333333';
  subtitleColor = '#666666';
  darkColor = 'rgba(33, 35, 97, 0.8)';
  startRoomColor = 'green';
  endRoomColor = 'red';
}

class MapSettingsConnector {
  lineWidth = 1;
  lineStyle = LineStyle.Solid;
  isCurve = false;
  color = '#000000';
  stalk = 16;
  arrowSize = 5;
  curveStrength = 0.4;
  labelDistance = 12;
}

class MapSettingsNote {
  minWidth = 64;
  minHeight = 32;
  width = 96
  height = 64;
  margin = 6; // todo
  lineWidth = 1;
  lineStyle = LineStyle.Solid;
  shape = RoomShape.Rectangle;
  rounding = 0;
  fillColor = '#ffffff'
  borderColor = '#000000';
  textColor = '#333333';
}

class MapSettingsBlock {
  minWidth = 64;
  minHeight = 32;
  width = 96
  height = 64;
  margin = 6; // todo
  lineWidth = 1;
  lineStyle = LineStyle.None;
  shape = RoomShape.Rectangle;
  rounding = 0;
  fillColor = '#D5E5D6';
  borderColor = '#000000';
}

export class MapSettings {
  public grid: MapSettingsGrid = new MapSettingsGrid();
  public room: MapSettingsRoom = new MapSettingsRoom();
  public connector: MapSettingsConnector = new MapSettingsConnector();
  public note: MapSettingsNote = new MapSettingsNote();
  public block: MapSettingsBlock = new MapSettingsBlock();
  public background: string = 'wood';
}