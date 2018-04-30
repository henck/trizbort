import { App } from '../app.js'
import { View } from './view.js'
import { Rect } from '../util/util.js'
import { Room } from '../models/room.js'
import { Connector } from '../models/connector.js'
import { ConnectorHandle, Direction, LineStyle, RoomShape, Values, ConnectorType } from '../enums/enums.js'
import { CapStyle, JoinStyle, IScreen, TextAlign, TextBaseline } from '../drawing/IScreen.js';

export class ConnectorView extends View {
  connector: Connector;

  constructor(connection: Connector) {
    super();
    this.connector = connection;
  }

  getModel() {
    return this.connector;
  }

  private drawConnectorHandle(canvas: IScreen, x: number, y: number, mouseX: number, mouseY: number) {
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
      .stroke();
  }

  dockToPoints(dock: Room, dir: Direction) {
    let { x, y } = dock.directionToPos(dir, false);
    // Treat room temporarily as a rectangle (true) to get the right endpoint for the stalk.
    let { x: rx, y: ry } = dock.directionToPos(dir, true);
    let dx = rx + Direction.toCardinalVector(dir).x * App.map.settings.connector.stalk;
    let dy = ry + Direction.toCardinalVector(dir).y * App.map.settings.connector.stalk;
    return { x, y, dx, dy };
  }

  private drawArrow(canvas: IScreen, x: number, y: number, angle: number) {
    let arrowSize = App.map.settings.connector.arrowSize;
    canvas.save();
    canvas.translate(x, y);
    canvas.rotate(angle);
    canvas.translate(-x, -y);
    canvas.beginPath();
    canvas.moveTo(x - arrowSize, y - arrowSize);
    canvas.lineTo(x - arrowSize, y + arrowSize);
    canvas.lineTo(x + arrowSize, y);
    canvas.closePath();
    canvas.fill();
    canvas.restore();    
  }

  draw(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {
    var dockStartX: number = this.connector.startX;
    var dockStartY: number = this.connector.startY;
    var dockEndX: number = this.connector.endX;
    var dockEndY: number = this.connector.endY;

    var startX = this.connector.startX;
    var startY = this.connector.startY;      
    var endX = this.connector.endX;
    var endY = this.connector.endY;
    var arrow1x: number;
    var arrow1y: number;
    var arrow1a: number;
    var arrow2x: number;
    var arrow2y: number;
    var arrow2a: number;
    var centerx: number;
    var centery: number;

    canvas
      .save()
      .beginPath();

    // There are 4 possibilities:
    // - undocked to undocked: can only be a straight line
    // - docked to undocked: can be quadratic or straight
    // - undocked to docked: can be quadratic or straight
    // - docked to docked: can be bezier or straight

    // Calculate (x,y) coordinates of dockStart, start, end and dockEnd

    // Undocked -> Undocked
    if(!this.connector.dockStart && !this.connector.dockEnd) {
    }
    // Docked -> Docked
    else if(this.connector.dockStart && this.connector.dockEnd) {
      var { x: dockStartX, y: dockStartY, dx: startX, dy: startY } = this.dockToPoints(this.connector.dockStart, this.connector.startDir);
      var { x: dockEndX, y: dockEndY, dx: endX, dy: endY } = this.dockToPoints(this.connector.dockEnd, this.connector.endDir);
    }    
    // Docked -> Undocked
    else if(this.connector.dockStart && !this.connector.dockEnd) {
      var { x: dockStartX, y: dockStartY, dx: startX, dy: startY } = this.dockToPoints(this.connector.dockStart, this.connector.startDir);    
    }
    // Undocked -> Docked
    else {
      var { x: dockEndX, y: dockEndY, dx: endX, dy: endY } = this.dockToPoints(this.connector.dockEnd, this.connector.endDir);      
    }

    arrow1x = startX + (endX - startX) * 0.1;
    arrow1y = startY + (endY - startY) * 0.1;
    arrow2x = startX + (endX - startX) * 0.9;
    arrow2y = startY + (endY - startY) * 0.9;
    arrow1a = arrow2a = Math.atan2(endY - startY, endX - startX);
    centerx = startX + (endX - startX) * 0.5;
    centery = startY + (endY - startY) * 0.5;    

    // Docked -> undocked
    if(!this.connector.dockStart && !this.connector.dockEnd) {
      canvas.moveTo(startX, startY);
      canvas.lineTo(endX, endY);
    }

    // Docked to docked:
    else if(this.connector.dockStart && this.connector.dockEnd) {
      canvas.moveTo(dockStartX, dockStartY);
      canvas.lineTo(startX, startY);
      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = startX + Direction.toCardinalVector(this.connector.startDir).x * dist;
        let cp1y = startY + Direction.toCardinalVector(this.connector.startDir).y * dist;
        let cp2x = endX + Direction.toCardinalVector(this.connector.endDir).x * dist;
        let cp2y = endY + Direction.toCardinalVector(this.connector.endDir).y * dist;
        canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        var {x:arrow1x, y:arrow1y} = canvas.getBezierXY(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var arrow1a = canvas.getBezierAngle(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var {x:arrow2x, y:arrow2y} = canvas.getBezierXY(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var arrow2a = canvas.getBezierAngle(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var {x:centerx, y:centery} = canvas.getBezierXY(0.5, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
      } else {
        canvas.lineTo(endX, endY);
      }
      canvas.lineTo(dockEndX, dockEndY);    
    }
    
    // Docked to undocked:
    else if(this.connector.dockStart && !this.connector.dockEnd) {
      canvas.moveTo(dockStartX, dockStartY);
      canvas.lineTo(startX, startY);

      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = startX + Direction.toCardinalVector(this.connector.startDir).x * dist;
        let cp1y = startY + Direction.toCardinalVector(this.connector.startDir).y * dist;      
        canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
        var {x:arrow1x, y:arrow1y} = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var {x:arrow2x, y:arrow2y} = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY);
        var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);
        var {x:centerx, y:centery} = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY);
      } else {
        canvas.lineTo(endX, endY);
      }
    }

    // Undocked to docked:
    else {
      canvas.moveTo(startX, startY);

      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = endX + Direction.toCardinalVector(this.connector.endDir).x * dist;
        let cp1y = endY + Direction.toCardinalVector(this.connector.endDir).y * dist;      
        canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
        var {x:arrow1x, y:arrow1y} = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var {x:arrow2x, y:arrow2y} = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY);
        var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);        
        var {x:centerx, y:centery} = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY);
      } else {
        canvas.lineTo(endX, endY);
      }

      canvas.lineTo(dockEndX, dockEndY);
    }

    // Stroke path with wide, nearly transparent background (for selection purposes):
    canvas
      .lineWidth(20)
      .lineCap(CapStyle.Round)
      .lineJoin(JoinStyle.Round)
      .strokeStyle(Values.COLOR_TRANSPARENT)
      .stroke();

    // Stroke with visible line: 
    canvas
      .lineWidth(this.connector.lineWidth)
      .strokeStyle(this.selected ? Values.COLOR_SELECTED : (hover ? Values.COLOR_HOVER : this.connector.color))
      .lineDash(this.connector.lineStyle)
      .stroke();

    // Draw one-way arrows:
    if(this.connector.oneWay) {
      canvas.fillStyle(this.selected ? Values.COLOR_SELECTED : (hover ? Values.COLOR_HOVER : this.connector.color));
      this.drawArrow(canvas, arrow1x, arrow1y, arrow1a);
      this.drawArrow(canvas, arrow2x, arrow2y, arrow2a);
    }

    // Draw name (if any)
    if(this.connector.name) {
      let textWidth = canvas.textWidth(this.connector.name, '12.8px Roboto');
      canvas
        .lineWidth(1)
        .lineDash(LineStyle.Solid)
        .strokeStyle('#000')
        .fillStyle('#fff')
        .roundedRect(centerx - textWidth / 2 - 5, centery - 11, textWidth + 10, 20, 3)
        .fill()
        .stroke()
        .fillStyle('#333')
        .fillText(this.connector.name, centerx, centery, '12.8px Roboto', TextAlign.Center, TextBaseline.Middle)
    }

    // Draw start and end types
    canvas 
      .beginPath()
      .fillStyle(this.connector.color)
      .fillText(this.connector.startLabel ? this.connector.startLabel : ConnectorType.toString(this.connector.startType), 
        arrow1x + Math.cos(arrow1a - Math.PI / 2) * App.map.settings.connector.labelDistance, 
        arrow1y + Math.sin(arrow1a - Math.PI / 2) * App.map.settings.connector.labelDistance,
        '10.8px Roboto', TextAlign.Center, TextBaseline.Middle)
      .fillText(this.connector.endLabel ? this.connector.endLabel : ConnectorType.toString(this.connector.endType), 
        arrow2x + Math.cos(arrow2a + Math.PI / 2) * App.map.settings.connector.labelDistance, 
        arrow2y + Math.sin(arrow2a + Math.PI / 2) * App.map.settings.connector.labelDistance,
        '10.8px Roboto', TextAlign.Center, TextBaseline.Middle);

    canvas.restore();
  }

  drawSimple(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {
    var dockStartX: number = this.connector.startX;
    var dockStartY: number = this.connector.startY;
    var dockEndX: number = this.connector.endX;
    var dockEndY: number = this.connector.endY;

    var startX = this.connector.startX;
    var startY = this.connector.startY;      
    var endX = this.connector.endX;
    var endY = this.connector.endY;

    canvas
      .save()
      .beginPath();

    // There are 4 possibilities:
    // - undocked to undocked: can only be a straight line
    // - docked to undocked: can be quadratic or straight
    // - undocked to docked: can be quadratic or straight
    // - docked to docked: can be bezier or straight

    // Calculate (x,y) coordinates of dockStart, start, end and dockEnd

    // Undocked -> Undocked
    if(!this.connector.dockStart && !this.connector.dockEnd) {
    }
    // Docked -> Docked
    else if(this.connector.dockStart && this.connector.dockEnd) {
      var { x: dockStartX, y: dockStartY, dx: startX, dy: startY } = this.dockToPoints(this.connector.dockStart, this.connector.startDir);
      var { x: dockEndX, y: dockEndY, dx: endX, dy: endY } = this.dockToPoints(this.connector.dockEnd, this.connector.endDir);
    }    
    // Docked -> Undocked
    else if(this.connector.dockStart && !this.connector.dockEnd) {
      var { x: dockStartX, y: dockStartY, dx: startX, dy: startY } = this.dockToPoints(this.connector.dockStart, this.connector.startDir);    
    }
    // Undocked -> Docked
    else {
      var { x: dockEndX, y: dockEndY, dx: endX, dy: endY } = this.dockToPoints(this.connector.dockEnd, this.connector.endDir);      
    } 

    // Docked -> undocked
    if(!this.connector.dockStart && !this.connector.dockEnd) {
      canvas.moveTo(startX, startY);
      canvas.lineTo(endX, endY);
    }

    // Docked to docked:
    else if(this.connector.dockStart && this.connector.dockEnd) {
      canvas.moveTo(dockStartX, dockStartY);
      canvas.lineTo(startX, startY);
      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = startX + Direction.toCardinalVector(this.connector.startDir).x * dist;
        let cp1y = startY + Direction.toCardinalVector(this.connector.startDir).y * dist;
        let cp2x = endX + Direction.toCardinalVector(this.connector.endDir).x * dist;
        let cp2y = endY + Direction.toCardinalVector(this.connector.endDir).y * dist;
        canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      } else {
        canvas.lineTo(endX, endY);
      }
      canvas.lineTo(dockEndX, dockEndY);    
    }
    
    // Docked to undocked:
    else if(this.connector.dockStart && !this.connector.dockEnd) {
      canvas.moveTo(dockStartX, dockStartY);
      canvas.lineTo(startX, startY);

      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = startX + Direction.toCardinalVector(this.connector.startDir).x * dist;
        let cp1y = startY + Direction.toCardinalVector(this.connector.startDir).y * dist;      
        canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
      } else {
        canvas.lineTo(endX, endY);
      }
    }

    // Undocked to docked:
    else {
      canvas.moveTo(startX, startY);

      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = endX + Direction.toCardinalVector(this.connector.endDir).x * dist;
        let cp1y = endY + Direction.toCardinalVector(this.connector.endDir).y * dist;      
        canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
      } else {
        canvas.lineTo(endX, endY);
      }

      canvas.lineTo(dockEndX, dockEndY);
    }

    // Stroke path with wide, nearly transparent background (for selection purposes):
    canvas
      .lineWidth(20)
      .lineCap(CapStyle.Round)
      .lineJoin(JoinStyle.Round)
      .strokeStyle(Values.COLOR_TRANSPARENT)
      .stroke();

    canvas.restore();
  }  

  drawHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {  
    if(!this.selected || selectionSize != 1) return;
    
    canvas
      .save()
      .lineWidth(1)
      .strokeStyle(Values.COLOR_LINE);
      
    var { x, y } = this.getStartHandleLocation();
    this.drawConnectorHandle(canvas, x, y, mouseX, mouseY);
    var { x, y } = this.getEndHandleLocation();
    this.drawConnectorHandle(canvas, x, y, mouseX, mouseY);
    
    canvas.restore();
  }

  isIn(x: number, y: number, width: number, height: number) {
    let r = new Rect(x, y, width, height);
    var {x, y} = this.getStartHandleLocation();
    if(r.contains(x, y)) return true;
    var {x, y} = this.getEndHandleLocation();
    if(r.contains(x, y)) return true;
    return false;
  }  

  getStartHandleLocation() {
    if(this.connector.dockStart) {
      var { x, y } = this.connector.dockStart.directionToPos(this.connector.startDir, false);
    } else {
      var x = this.connector.startX;
      var y = this.connector.startY;
    }    
    return { x, y };
  }

  getEndHandleLocation() {
    if(this.connector.dockEnd) {
      var { x, y } = this.connector.dockEnd.directionToPos(this.connector.endDir, false);
    } else {
      var x = this.connector.endX;
      var y = this.connector.endY;
    }    
    return { x, y };
  }  

  isConnectorHandle(x: number, y: number): ConnectorHandle {
    var {x: px, y: py} = this.getStartHandleLocation();
    if  (x >= px - Values.DIMEN_CONNECTOR_HANDLE 
      && x <= px + Values.DIMEN_CONNECTOR_HANDLE 
      && y >= py - Values.DIMEN_CONNECTOR_HANDLE 
      && y <= py + Values.DIMEN_CONNECTOR_HANDLE) return ConnectorHandle.Start;
    
    var {x: px, y: py} = this.getEndHandleLocation();
    if  (x >= px - Values.DIMEN_CONNECTOR_HANDLE 
      && x <= px + Values.DIMEN_CONNECTOR_HANDLE 
      && y >= py - Values.DIMEN_CONNECTOR_HANDLE 
      && y <= py + Values.DIMEN_CONNECTOR_HANDLE) return ConnectorHandle.End;
  
    return undefined;
  }  
}