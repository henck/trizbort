import { App } from '../App'
import { View } from './View'
import { Rect } from '../util'
import { Room, Connector } from '../models'
import { ConnectorHandle, Direction, LineStyle, Values, ConnectorType } from '../enums'
import { CapStyle, JoinStyle, IScreen, TextAlign, TextBaseline } from '../drawing/IScreen'
import { Point } from '../util/Point'

export class ConnectorView extends View {
  static LABEL_FONT_FACTOR = 0.7;
  connector: Connector;
  clearRegion: Rect;

  constructor(connection: Connector) {
    super();
    this.connector = connection;
  }

  getModel() {
    return this.connector;
  }

  get movingSelectable(): boolean {
    return true;
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

  private drawDoor(canvas: IScreen, x: number, y: number, angle: number) {
    let arrowSize = App.map.settings.connector.arrowSize;
    canvas.save();
    canvas.translate(x, y);
    canvas.rotate(angle);
    canvas.translate(-x, -y);
    canvas.beginPath();
    canvas.moveTo(x, y - arrowSize);
    canvas.lineTo(x + 4, y - arrowSize);
    canvas.lineTo(x + 4, y + arrowSize);
    canvas.lineTo(x, y + arrowSize);
    canvas.closePath();
    canvas.fill();
    canvas.restore();        
  }

  draw(canvas: IScreen, hover: boolean) {
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
    var centera: number;

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
    arrow1a = arrow2a = centera = Math.atan2(endY - startY, endX - startX);
    centerx = startX + (endX - startX) * 0.5;
    centery = startY + (endY - startY) * 0.5;    

    // Undocked -> Undocked
    if(!this.connector.dockStart && !this.connector.dockEnd) {
      canvas.line(startX, startY, endX, endY);
      this.clearRegion = new Rect(startX, startY, endX, endY);

      //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
    }

    // Docked -> Docked:
    else if(this.connector.dockStart && this.connector.dockEnd) {
      canvas.line(dockStartX, dockStartY, startX, startY);

      this.clearRegion = new Rect(dockStartX, dockStartY, startX, startY);
      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = startX + Direction.toCardinalVector(this.connector.startDir).x * dist;
        let cp1y = startY + Direction.toCardinalVector(this.connector.startDir).y * dist;
        let cp2x = endX + Direction.toCardinalVector(this.connector.endDir).x * dist;
        let cp2y = endY + Direction.toCardinalVector(this.connector.endDir).y * dist;
        canvas.bezier3(startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        let r = this.getRectBezier3(startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        this.clearRegion.maximize(r);

        var {x:arrow1x, y:arrow1y} = canvas.getBezierXY(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var arrow1a = canvas.getBezierAngle(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var {x:arrow2x, y:arrow2y} = canvas.getBezierXY(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var arrow2a = canvas.getBezierAngle(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var {x:centerx, y:centery} = canvas.getBezierXY(0.5, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
        var centera = canvas.getBezierAngle(0.5, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
      } else {
        canvas.line(startX, startY, endX, endY);
        this.clearRegion.maximize(new Rect(startX, startY, endX, endY));
      }

      canvas.line(endX, endY, dockEndX, dockEndY);    
      this.clearRegion.maximize(new Rect(endX, endY, dockEndX, dockEndY));

      //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
    }
    
    // Docked -> Undocked:
    else if(this.connector.dockStart && !this.connector.dockEnd) {
      canvas.line(dockStartX, dockStartY, startX, startY);
      this.clearRegion = new Rect(dockStartX, dockStartY, startX, startY);

      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = startX + Direction.toCardinalVector(this.connector.startDir).x * dist;
        let cp1y = startY + Direction.toCardinalVector(this.connector.startDir).y * dist;      
        canvas.bezier2(startX, startY, cp1x, cp1y, endX, endY);
        let r = this.getRectBezier2(startX, startY, cp1x, cp1y, endX, endY);
        this.clearRegion.maximize(r);

        var {x:arrow1x, y:arrow1y} = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var {x:arrow2x, y:arrow2y} = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY);
        var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);
        var {x:centerx, y:centery} = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY);
        var centera = canvas.getQuadraticAngle(0.5, startX, startY, cp1x, cp1y, endX, endY);
      } else {
        canvas.line(startX, startY, endX, endY);
        this.clearRegion.maximize(new Rect(startX, startY, endX, endY));
      }

      //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
    }

    // Undocked -> Docked:
    else {
      //canvas.moveTo(startX, startY);

      if(this.connector.isCurve) {
        let dist = Math.sqrt((endX-startX)*(endX-startX) + (endY-startY)*(endY-startY)) * App.map.settings.connector.curveStrength;
        let cp1x = endX + Direction.toCardinalVector(this.connector.endDir).x * dist;
        let cp1y = endY + Direction.toCardinalVector(this.connector.endDir).y * dist;      
        canvas.bezier2(startX, startY, cp1x, cp1y, endX, endY);
        this.clearRegion = this.getRectBezier2(startX, startY, cp1x, cp1y, endX, endY);

        var {x:arrow1x, y:arrow1y} = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
        var {x:arrow2x, y:arrow2y} = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY);
        var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);        
        var {x:centerx, y:centery} = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY);
        var centera = canvas.getQuadraticAngle(0.5, startX, startY, cp1x, cp1y, endX, endY);        
      } else {
        canvas.line(startX, startY, endX, endY);
        this.clearRegion = new Rect(startX, startY, endX, endY);
      }

      canvas.line(endX, endY, dockEndX, dockEndY);
      this.clearRegion.maximize(new Rect(endX, endY, dockEndX, dockEndY));

      //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
    }

    // Stroke path with wide, nearly transparent background (for selection purposes):
    canvas
      .lineWidth(Values.DIMEN_CONNECTOR_WIDE)
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
      let textWidth = canvas.textWidth(this.connector.name, App.map.settings.basic.fontSize, App.map.settings.basic.fontFamily);
      canvas
        .lineWidth(1)
        .lineDash(LineStyle.Solid)
        .strokeStyle('#000')
        .fillStyle('#fff')
        .roundedRect(centerx - textWidth / 2 - 5, centery - 11, textWidth + 10, 20, 3)
        .fill()
        .stroke()
        .fillStyle('#333')
        .fillText(this.connector.name, centerx, centery, 
          App.map.settings.basic.fontSize,
          App.map.settings.basic.fontFamily, 
          TextAlign.Center, TextBaseline.Middle);
    }

    // Draw start and end types
    canvas 
      .beginPath()
      .fillStyle(this.connector.color)
      .fillText(this.connector.startLabel ? this.connector.startLabel : ConnectorType.toString(this.connector.startType), 
        arrow1x + Math.cos(arrow1a - Math.PI / 2) * App.map.settings.connector.labelDistance, 
        arrow1y + Math.sin(arrow1a - Math.PI / 2) * App.map.settings.connector.labelDistance,
        App.map.settings.basic.fontSize * ConnectorView.LABEL_FONT_FACTOR,
        App.map.settings.basic.fontFamily, 
        TextAlign.Center, TextBaseline.Middle)
      .fillText(this.connector.endLabel ? this.connector.endLabel : ConnectorType.toString(this.connector.endType), 
        arrow2x + Math.cos(arrow2a + Math.PI / 2) * App.map.settings.connector.labelDistance, 
        arrow2y + Math.sin(arrow2a + Math.PI / 2) * App.map.settings.connector.labelDistance,
        App.map.settings.basic.fontSize * ConnectorView.LABEL_FONT_FACTOR,
        App.map.settings.basic.fontFamily, 
        TextAlign.Center, TextBaseline.Middle);

    canvas.restore();
  }

  drawSimple(canvas: IScreen, hover: boolean) {
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

  clear(canvas: IScreen): Rect {

    let margin = Values.DIMEN_CONNECTOR_WIDE;
    
    if(!this.clearRegion) return;

    this.clearRegion.expand(margin);

    canvas.clearRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);

    return this.clearRegion;
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
    let r = new Rect(x, y, x + width, y + height);
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

  protected getRectBezier2(px0: number, py0: number, cx: number, cy: number, px1: number, py1: number): Rect {

    function pointOnCurve(t: number, px0: number, py0: number, cx: number, cy: number, px1: number, py1: number): Point {
      if(t<=0 || 1<=t || isNaN(t)) return;

      var c1 =  new Point(px0+(cx-px0)*t,py0+(cy-py0)*t);
      var c2 =  new Point(cx+(px1-cx)*t,cy+(py1-cy)*t);
      return new Point(c1.x+(c2.x-c1.x)*t,c1.y+(c2.y-c1.y)*t);  
    }

    var tx =  (px0 - cx) / (px0 - 2*cx + px1);
    var ty =  (py0 - cy) / (py0 - 2*cy + py1);

    var ex = pointOnCurve(tx, px0, py0, cx, cy, px1, py1);
    var xMin = ex?Math.min(px0, px1, ex.x):Math.min(px0, px1);
    var xMax = ex?Math.max(px0, px1, ex.x):Math.max(px0, px1);

    var ey = pointOnCurve(ty, px0, py0, cx, cy, px1, py1);
    var yMin = ey?Math.min(py0, py1, ey.y):Math.min(py0, py1);
    var yMax = ey?Math.max(py0, py1, ey.y):Math.max(py0, py1);

    return new Rect(xMin, yMin, xMax, yMax);
  }

  protected getRectBezier3(px0: number, py0: number, cx0: number, cy0: number, cx1: number, cy1: number, px1: number, py1: number): Rect {
    let tvalues = [], xvalues = [], yvalues = [],
        a, b, c, t, t1, t2, b2ac, sqrtb2ac;
    for (let i = 0; i < 2; ++i) {
        if (i == 0) {
            b =  6 * px0 - 12 * cx0 + 6 * cx1;
            a = -3 * px0 +  9 * cx0 - 9 * cx1 + 3 * px1;
            c =  3 * cx0 -  3 * px0;
        } else {
            b =  6 * py0 - 12 * cy0 + 6 * cy1;
            a = -3 * py0 +  9 * cy0 - 9 * cy1 + 3 * py1;
            c =  3 * cy0 -  3 * py0;
        }
        if (Math.abs(a) < 1e-12) {
            if (Math.abs(b) < 1e-12) {
                continue;
            }
            t = -c / b;
            if (0 < t && t < 1) {
                tvalues.push(t);
            }
            continue;
        }
        b2ac = b * b - 4 * c * a;
        if (b2ac < 0) {
            if (Math.abs(b2ac) < 1e-12) {
                t = -b / (2 * a);
                if (0 < t && t < 1) {
                    tvalues.push(t);
                }
            }
            continue;
        }
        sqrtb2ac = Math.sqrt(b2ac);
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
            tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
            tvalues.push(t2);
        }
    }

    var j = tvalues.length, mt;
    while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        xvalues[j] = (mt * mt * mt * px0) + (3 * mt * mt * t * cx0) + (3 * mt * t * t * cx1) + (t * t * t * px1);
        yvalues[j] = (mt * mt * mt * py0) + (3 * mt * mt * t * cy0) + (3 * mt * t * t * cy1) + (t * t * t * py1);
    }

    xvalues.push(px0,px1);
    yvalues.push(py0,py1);

    return new Rect(Math.min(...xvalues), Math.min(...yvalues), Math.max(...xvalues), Math.max(...yvalues));
  }
}