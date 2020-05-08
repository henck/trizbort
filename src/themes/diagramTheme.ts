import { RoomShape, LineStyle } from "../enums/enums";
import { MapSettings, fontSettings } from "../models/mapSettings";

export class DiagramTheme extends MapSettings {
  constructor() {
    super();

    this.grid.background = '#ffffff';
    this.grid.color = '#f0f0f0';
    this.grid.visible = true;
    this.grid.origin = true;
    this.grid.snap = true;
    this.grid.size = 32;
    this.grid.lineWidth = 1;
    this.grid.originWidth = 5;

    this.room.width = 96;
    this.room.height = 64;
    this.room.margin = 6; // todo
    this.room.lineWidth = 2;
    this.room.lineStyle = LineStyle.Solid;
    this.room.shape = RoomShape.Rectangle;
    this.room.rounding = 0;
    this.room.darknessSize = 50;
    this.room.fillColor = '#ffffff';
    this.room.borderColor = '#000000';
    this.room.nameColor = '#333333';
    this.room.subtitleColor = '#666666';
    this.room.darkColor = 'rgba(33, 35, 97, 0.8)';
    this.room.startRoomColor = 'green';
    this.room.endRoomColor = 'red';
    this.room.fontCfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 13.0, family: 'danielbd'}:{size: 14.4, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };
    this.room.font2Cfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 11.0, family: 'danielbd'}:{size: 11.8, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };

    this.connector.lineWidth = 1;
    this.connector.lineStyle = LineStyle.Solid;
    this.connector.isCurve = false;
    this.connector.color = '#000000';
    this.connector.stalk = 16;
    this.connector.arrowSize = 5;
    this.connector.curveStrength = 0.4;
    this.connector.labelDistance = 12;
    this.connector.fontCfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 11.8, family: 'danielbd'}:{size: 12.8, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };
    this.connector.font2Cfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 9.8, family: 'danielbd'}:{size: 10.8, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };
    
    this.note.minWidth = 64;
    this.note.minHeight = 32;
    this.note.width = 96
    this.note.height = 64;
    this.note.margin = 6; // todo
    this.note.lineWidth = 1;
    this.note.lineStyle = LineStyle.Solid;
    this.note.shape = RoomShape.Rectangle;
    this.note.rounding = 0;
    this.note.fillColor = '#ffffff'
    this.note.borderColor = '#000000';
    this.note.textColor = '#333333';
    this.note.fontCfg    = (hand: boolean, mode: 'obj' |'string') => { let res: fontSettings = (hand? {size: 13.0, family: 'danielbd'}:{size: 14.4, family: 'Roboto'}); return (mode == 'obj'? res : `${res.size}px ${res.family}`)  };

    this.block.minWidth = 64;
    this.block.minHeight = 32;
    this.block.width = 96
    this.block.height = 64;
    this.block.margin = 6; // todo
    this.block.lineWidth = 1;
    this.block.lineStyle = LineStyle.None;
    this.block.shape = RoomShape.Rectangle;
    this.block.rounding = 0;
    this.block.fillColor = '#D5E5D6';
    this.block.borderColor = '#000000';

    this.draw.hand = false;
  }
}
