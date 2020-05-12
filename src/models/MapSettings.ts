import { RoomShape, LineStyle } from "../enums";

class MapSettingsBasic {
  fontFamily = 'Roboto';
  fontSize = 13;
  handdrawn = false;
}

class MapSettingsGrid {
  visible = true;
  origin = true;
  snap = true;
  size = 32;
  color = '#f0f0f0';
  lineWidth = 1;
  originWidth = 5;
  background = '#ffffff';
}

class MapSettingsRoom {
  width = 96;
  height = 64;
  margin = 6; // todo
  lineWidth = 2;
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
  /* fontSize = 14.4;
  fontFamily = 'Roboto';
  
  fontCfg     = (hand: boolean, mode: 'obj' |'string') => { 
      let res: fontSettings = (hand? {size: 13.0, family: 'danielbd'}:{size: 14.4, family: 'Roboto'}); 
      return (mode == 'obj'? res : `${res.size}px ${res.family}`)  
    };
  font2Cfg    = (hand: boolean, mode: 'obj' |'string') => { 
      let res: fontSettings = (hand? {size: 11.0, family: 'danielbd'}:{size: 11.8, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  }; */
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
  /* fontCfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 11.8, family: 'danielbd'}:{size: 12.8, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };
  font2Cfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 9.8, family: 'danielbd'}:{size: 10.8, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  }; */
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
  // fontCfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 13.0, family: 'danielbd'}:{size: 14.4, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };
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
  public basic: MapSettingsBasic = new MapSettingsBasic();
  public grid: MapSettingsGrid = new MapSettingsGrid();
  public room: MapSettingsRoom = new MapSettingsRoom();
  public connector: MapSettingsConnector = new MapSettingsConnector();
  public note: MapSettingsNote = new MapSettingsNote();
  public block: MapSettingsBlock = new MapSettingsBlock();

  private cloneToTarget(src: object, target: object) {
    for(let key in src) {
      if(src.hasOwnProperty(key)) {
        (<any>target)[key] = (<any>src)[key];
      }
    }
  }

  //
  // Given a settings-like object, clone it into a real
  // MapSettings instance and return it.
  // 
  public cloneFrom(src: object) {
    let settings: MapSettings = src as MapSettings;
    this.cloneToTarget(settings.basic, this.basic);
    this.cloneToTarget(settings.grid, this.grid);
    this.cloneToTarget(settings.room, this.room);
    this.cloneToTarget(settings.connector, this.connector);
    this.cloneToTarget(settings.note, this.note);
    this.cloneToTarget(settings.block, this.block);
    return this;
  }  
}