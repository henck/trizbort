import { App } from '../App'
import { BoxView } from './BoxView'
import { Note } from '../models'
import { LineStyle, Values } from '../enums'
import { IScreen } from '../drawing/IScreen'

export class NoteView extends BoxView {
  note: Note;

  constructor(note: Note) {
    super(note);
    this.note = note;
  }

  getModel() {
    return this.note;
  }

  draw(canvas: IScreen, hover: boolean) {

    // Translate to note's coordinates, so we can offset everything from (0,0).
    canvas
      .save()
      .translate(this.note.x, this.note.y);

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

    // Note fill:
    this.makeShape(canvas, false);
    canvas
      .fillStyle(this.note.fillColor)
      .fill();

    // Note fold (drawn using clipping)
    canvas.clip();
    this.makeShape(canvas, false);
    canvas
      .lineWidth(this.note.lineWidth / 2)
      .strokeStyle(this.note.borderColor)
      .beginPath()
      .moveTo(this.note.width - this.note.height * 0.6, 0)
      .lineTo(this.note.width, this.note.height * 0.6)
      .stroke();

    // Note border:
    if(this.note.lineStyle != LineStyle.None) {
      this.makeShape(canvas, false);
      canvas
        .strokeStyle(this.note.borderColor)
        .lineWidth(this.note.lineWidth)
        .lineDash(this.note.lineStyle)
        .stroke();
    }

    canvas
      .fillStyle(this.note.textColor)
      .drawText(0, 0, this.note.width, this.note.height, 
        App.map.settings.basic.fontSize,
        App.map.settings.basic.fontFamily,
        this.note.text);

    canvas.restore();    
  }

  drawSimple(canvas: IScreen, hover: boolean) {

    // Translate to note's coordinates, so we can offset everything from (0,0).
    canvas
      .save()
      .translate(this.note.x, this.note.y);

    this.makeShape(canvas, true);

    // Nearly transparent background (for selection purposes):
    canvas
      .fillStyle(Values.COLOR_TRANSPARENT)
      .fill();
    
    canvas.restore();
  }

  drawHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {  
    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
  }
}