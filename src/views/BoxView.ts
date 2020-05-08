import { View } from './View'
import { Rect } from '../util'
import { Box } from '../models'
import { Direction, RoomShape, Values } from '../enums'
import { IScreen } from '../drawing/IScreen'

export class BoxView extends View {
  box: Box;
  oldX: number;
  oldY: number;
  oldWidth: number;
  oldHeight: number;

  constructor(box: Box) {
    super();
    this.box = box;
    this.oldX = this.oldY = 0;
    this.oldWidth = this.oldHeight = 0;
  }

  getModel(): Box {
    return this.box;
  }  
  
  clear(canvas: IScreen): Rect {

    let margin = Values.DIMEN_ROOM_MARGIN;
    let rect = new Rect(this.box.x - margin, this.box.y - margin, this.box.x - margin + this.box.width + margin * 2, this.box.y - margin + this.box.height + margin * 2)
    canvas.clearRect(rect.x, rect.y, rect.width, rect.height);

    return rect;
  }

  makeShape(canvas: IScreen, addMargin: boolean) {
    let margin = addMargin ? Values.DIMEN_ROOM_MARGIN : 0;

    switch(this.box.shape) {
      case RoomShape.Ellipse:
        canvas.ellipse(-margin, -margin, this.box.width + margin * 2, this.box.height + margin * 2);
        break;
      case RoomShape.Octagon:
        canvas.octagon(-margin, -margin, this.box.width + margin * 2, this.box.height + margin * 2);
        break;
      default:
        canvas.roundedRect(-margin, -margin, this.box.width + margin * 2, this.box.height + margin * 2, this.box.rounding);
        break;
    }
  }  

  drawResizeHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {  
    canvas
      .save()
      .lineWidth(1); 

    // Resize handles
    if(this.selected && selectionSize == 1) {
      canvas.fillStyle(Values.COLOR_RESIZE).strokeStyle(Values.COLOR_LINE);
      for(let i = 0; i < 16; i++) {
        if(!Direction.isCardinal(i)) continue;
        let { x, y } = this.box.directionToPos(i, false);
        // If mouse is over resize handle, then highlight it.
        if  (mouseX >= x - Values.DIMEN_RESIZE_HANDLE && mouseX <= x + Values.DIMEN_RESIZE_HANDLE
          && mouseY >= y - Values.DIMEN_RESIZE_HANDLE && mouseY <= y + Values.DIMEN_RESIZE_HANDLE) {
          canvas.fillStyle(Values.COLOR_RESIZE_HIGHLIGHT);
        } else {
          canvas.fillStyle(Values.COLOR_RESIZE);
        }        
        canvas
          .beginPath()
          .moveTo(x - Values.DIMEN_RESIZE_HANDLE, y - Values.DIMEN_RESIZE_HANDLE)
          .fillRect(x - Values.DIMEN_RESIZE_HANDLE, y - Values.DIMEN_RESIZE_HANDLE, Values.DIMEN_RESIZE_HANDLE * 2, Values.DIMEN_RESIZE_HANDLE * 2)
          .strokeRect(x - Values.DIMEN_RESIZE_HANDLE, y - Values.DIMEN_RESIZE_HANDLE, Values.DIMEN_RESIZE_HANDLE * 2, Values.DIMEN_RESIZE_HANDLE * 2)
      }
    }    

    canvas.restore();     
  }  

  drawConnectorHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {  
    if(!hover || selectionSize != 0) return;

    canvas
      .save()
      .lineWidth(1)
      .strokeStyle(Values.COLOR_LINE);
      
    for (let i = 0; i < 16; i++) {
      let { x, y } = this.box.directionToPos(i, false);
      // If mouse is over connector handle, then highlight it.
      if  (mouseX >= x - Values.DIMEN_CONNECTOR_HANDLE && mouseX <= x + Values.DIMEN_CONNECTOR_HANDLE
        && mouseY >= y - Values.DIMEN_CONNECTOR_HANDLE && mouseY <= y + Values.DIMEN_CONNECTOR_HANDLE) {
        canvas.fillStyle(Values.COLOR_CONNECTOR_HIGHLIGHT);
      } else {
        canvas.fillStyle(Values.COLOR_CONNECTOR);
      }
      canvas
        .beginPath()
        .moveTo(x + Values.DIMEN_CONNECTOR_HANDLE, y) // move must end on right perimeter of arc.
        .arc(x, y, Values.DIMEN_CONNECTOR_HANDLE, 0, Math.PI * 2, true)
        .fill()
        .stroke()
    }    

    canvas.restore();     
  }  

  isResizeHandle(x: number, y: number): Direction {
    for (let i = 0; i < 16; i++) {
      if(!Direction.isCardinal(i)) continue;
      let { x: px, y: py } = this.box.directionToPos(i, false);
      if  (x >= px - Values.DIMEN_RESIZE_HANDLE 
        && x <= px + Values.DIMEN_RESIZE_HANDLE 
        && y >= py - Values.DIMEN_RESIZE_HANDLE 
        && y <= py + Values.DIMEN_RESIZE_HANDLE) return i;
    }
    return undefined;
  }  

  isConnectorHandle(x: number, y: number): Direction {
    for (let i = 0; i < 16; i++) {
      let { x: px, y: py } = this.box.directionToPos(i, false);
      if  (x >= px - Values.DIMEN_CONNECTOR_HANDLE 
        && x <= px + Values.DIMEN_CONNECTOR_HANDLE 
        && y >= py - Values.DIMEN_CONNECTOR_HANDLE 
        && y <= py + Values.DIMEN_CONNECTOR_HANDLE) return i;
    }
    return undefined;
  }  

  // Used to determine if a Room is inside a selection area. For simplicity,
  // a rectangular approximation of the Room is used.
  isIn(x: number, y: number, width: number, height: number) {
    let r = new Rect(x, y, x + width, y + height);
    if(r.contains(this.box.x, this.box.y)) return true;
    if(r.contains(this.box.x + this.box.width, this.box.y)) return true;
    if(r.contains(this.box.x, this.box.y + this.box.height)) return true;
    if(r.contains(this.box.x + this.box.width, this.box.y + this.box.height)) return true;
    return false;
  }

  isPointIn(x: number, y: number) {
    return (x >= this.box.x && x <= this.box.x + this.box.width
         && y >= this.box.y && y <= this.box.y + this.box.height);
  }

  // Resize box in given direction toward (x, y).
  // Clamps on minimum box width and height.
  resize(direction: Direction, x: number, y: number) {
    let width = 0;
    let height = 0;
    if(direction == Direction.N || direction == Direction.NE || direction == Direction.NW) {
      height = this.oldY + this.oldHeight - y;
      if(height < Values.DIMEN_ROOM_MIN_HEIGHT) {
        y = y - (Values.DIMEN_ROOM_MIN_HEIGHT - height);
        height = Values.DIMEN_ROOM_MIN_HEIGHT;
      }
      this.box.y = y;
      this.box.height = height;
    }
    if(direction == Direction.W || direction == Direction.NW || direction == Direction.SW) {
      width = this.oldX + this.oldWidth - x;
      if(width < Values.DIMEN_ROOM_MIN_WIDTH) {
        x = x - (Values.DIMEN_ROOM_MIN_WIDTH - width);
        width = Values.DIMEN_ROOM_MIN_WIDTH;
      }
      this.box.x = x;
      this.box.width = width;
    }
    if(direction == Direction.E || direction == Direction.NE || direction == Direction.SE) {
      width = x - this.oldX;
      if(width < Values.DIMEN_ROOM_MIN_WIDTH) {
        x = x - (Values.DIMEN_ROOM_MIN_WIDTH - width);
        width = Values.DIMEN_ROOM_MIN_WIDTH;
      }
      this.box.width = width;        
    }
    if(direction == Direction.S || direction == Direction.SE || direction == Direction.SW) {
      height = y - this.oldY;
      if(height < Values.DIMEN_ROOM_MIN_HEIGHT) {
        y = y - (Values.DIMEN_ROOM_MIN_HEIGHT - height);
        height = Values.DIMEN_ROOM_MIN_HEIGHT;
      }
      this.box.height = height;
    }
  }

  save() {
    this.oldX = this.box.x;
    this.oldY = this.box.y;
    this.oldWidth = this.box.width;
    this.oldHeight = this.box.height;
  }

}