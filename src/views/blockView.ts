import { View } from './view.js'
import { BoxView } from './boxView.js';
import { Rect } from '../util/util.js'
import { Block } from '../models/block.js'
import { Direction, LineStyle, RoomShape, Values } from '../enums/enums.js'
import { IScreen } from '../drawing/IScreen.js';

export class BlockView extends BoxView {
  block: Block;

  constructor(block: Block) {
    super(block);
    this.block = block;
  }

  getModel() {
    return this.block;
  }

  draw(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {

    // Translate to block's coordinates, so we can offset everything from (0,0).
    canvas
      .save()
      .translate(this.block.x, this.block.y);

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

    // Block fill:
    this.makeShape(canvas, false);
    canvas
      .fillStyle(this.block.fillColor)
      .fill();

    // Block border:
    if(this.block.lineStyle != LineStyle.None) {
      this.makeShape(canvas, false);
      canvas
        .strokeStyle(this.block.borderColor)
        .lineWidth(this.block.lineWidth)
        .lineDash(this.block.lineStyle)
        .stroke();
    }

    canvas.restore();    
  }

  drawSimple(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {
    // Translate to block's coordinates, so we can offset everything from (0,0).
    canvas
      .save()
      .translate(this.block.x, this.block.y);

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