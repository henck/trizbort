import { App } from '../app.js'
import { BoxView } from './boxView.js'
import { Room } from '../models/room.js'
import { LineStyle, Values } from '../enums/enums.js'
import { IScreen, TextBaseline, TextAlign } from '../drawing/IScreen.js';
import { Obj } from '../models/obj.js';
import { fontSettings } from '../models/mapSettings.js';

export class RoomView extends BoxView {
  room: Room;

  constructor(room: Room) {
    super(room);
    this.room = room;
  }

  getModel() {
    return this.room;
  }

  get movingSelectable(): boolean {
    return true;
  }

  draw(canvas: IScreen, hover: boolean) {

    // Translate to room's coordinates, so we can offset everything from (0,0).
    canvas
      .save()
      .translate(this.room.x, this.room.y)

    this.makeShape(canvas, true);
    
    // Nearly transparent background (for selection purposes):
    canvas
      .fillStyle(Values.COLOR_TRANSPARENT)
      .fill();

    // Selection glow
    if(this.selected) {
      canvas
        .fillStyle(Values.COLOR_SELECTED_GLOW)
        .fill();
    }

    // Start room glow
    if(this.room.isStartRoom()) {
      canvas 
        .fillStyle(Values.COLOR_STARTROOM)
        .fill();
    }

    // End room glow
    if(this.room.endroom) {
      canvas
        .fillStyle(Values.COLOR_ENDROOM)
        .fill();
    }

    // Room fill
    this.makeShape(canvas, false);
    canvas
      .fillStyle(this.room.fillColor)
      .fill();

    // Darkness stripe
    canvas.save(); // before clip
    canvas.clip();
    this.makeShape(canvas, false);
    if(this.room.dark) {
      let darknessSize = this.room.map.settings.room.darknessSize;
      canvas
        .fillStyle(this.room.map.settings.room.darkColor)
        .beginPath()
        .moveTo(this.room.width, 0)
        .lineTo(this.room.width - this.room.height * darknessSize / 100, 0)
        .lineTo(this.room.width, this.room.height * darknessSize / 100)
        .fill();
    }

    canvas.restore(); // remove clip

    // Room border
    if(this.room.lineStyle != LineStyle.None) { 
      this.makeShape(canvas, false);
      canvas 
        .strokeStyle(this.room.borderColor)
        .lineWidth(this.room.lineWidth)
        .lineDash(this.room.lineStyle)
        .stroke();
    }
    
    // Room name
    let f = <fontSettings>App.map.settings.room.fontCfg(App.map.settings.draw.hand, 'obj');
    let f2 = <fontSettings>App.map.settings.room.font2Cfg(App.map.settings.draw.hand, 'obj');
    canvas
      .fillStyle(this.room.nameColor)
      .drawText(0, 0, this.room.width, this.room.height, f.size, f.family, this.room.name);
    
    // Room subtitle
    if(this.room.subtitle) {
      canvas
        .fillStyle(this.room.subtitle)
        .drawTextBottom(0, 0, this.room.width, this.room.height - 5, f2.size, f2.family, this.room.subtitle);
    }

    // Objects in room
    let x = this.room.width * 0.8;
    let y = this.room.height + 20;
    canvas.fillStyle(this.room.nameColor)
    this.drawObjects(canvas, x, y, this.room.objects);

    canvas.restore();
  }

  drawObjects(canvas: IScreen, x: number, y: number, objList: Array<Obj>): number {
    objList.forEach((obj) => { 
      canvas.fillText(obj.name, x, y, <string>App.map.settings.room.font2Cfg(App.map.settings.draw.hand, 'string'), TextAlign.Left, TextBaseline.Middle);
      y += 14;
      y = this.drawObjects(canvas, x + 10, y, obj.content);
    });

    return y;
  }

  drawSimple(canvas: IScreen, hover: boolean) {

    // Translate to room's coordinates, so we can offset everything from (0,0).
    canvas
      .save()
      .translate(this.room.x, this.room.y);

    this.makeShape(canvas, true);
    
    // Nearly transparent background (for selection purposes):
    canvas
      .fillStyle(Values.COLOR_TRANSPARENT)
      .fill();  

    canvas.restore();
  }

  drawHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {  
    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
    this.drawConnectorHandles(canvas, mouseX, mouseY, selectionSize, hover);
  }
}