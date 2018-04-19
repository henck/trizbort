import { IScreen, CapStyle, JoinStyle, TextAlign, TextBaseline } from './IScreen.js'
import { LineStyle } from '../enums/enums.js'

export class Canvas implements IScreen {
  private ctx: CanvasRenderingContext2D;
  
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  save(): IScreen {
    this.ctx.save();
    return this;
  }

  restore(): IScreen {
    this.ctx.restore();
    return this;
  }

  translate(x: number, y: number): IScreen {
    this.ctx.translate(x, y);
    return this;
  }

  rotate(angle: number): IScreen {
    this.ctx.rotate(angle);
    return this;
  }

  scale(x: number, y?: number): IScreen {
    if(y === undefined) y = x;
    this.ctx.scale(x, y);
    return this;
  }

  moveTo(x: number, y: number): IScreen { 
    this.ctx.moveTo(x, y);
    return this;
  }

  beginPath(): IScreen {
    this.ctx.beginPath();
    return this;
  }

  closePath(): IScreen {
    this.ctx.closePath();
    return this;
  }

  stroke(): IScreen { 
    this.ctx.stroke();
    return this;
  }

  fill(): IScreen {
    this.ctx.fill();
    return this;
  }

  fillStyle(color: string): IScreen {
    this.ctx.fillStyle = color;
    return this;
  }

  strokeStyle(color: string): IScreen {
    this.ctx.strokeStyle = color;
    return this;
  }

  fillRect(x: number, y:number, width: number, height:number): IScreen {
    this.ctx.fillRect(x, y, width, height);
    return this;
  }

  strokeRect(x: number, y:number, width: number, height:number): IScreen {
    this.ctx.strokeRect(x, y, width, height);
    return this;
  }

  clearRect(x: number, y:number, width: number, height:number): IScreen {
    this.ctx.clearRect(x, y, width, height);
    return this;
  }

  lineWidth(width: number): IScreen {
    this.ctx.lineWidth = width;
    return this;
  }

  lineCap(style: CapStyle): IScreen {
    switch(style) {
      case CapStyle.Butt:
        this.ctx.lineCap = 'butt';
        break;
      case CapStyle.Round:
        this.ctx.lineCap = 'round';
        break;
      case CapStyle.Square:
        this.ctx.lineCap = 'square';
        break;
    }
    return this;
  }

  lineJoin(style: JoinStyle): IScreen {
    switch(style) {
      case JoinStyle.Miter:
        this.ctx.lineJoin = 'miter';
        break;
      case JoinStyle.Round:
        this.ctx.lineJoin = 'round';
        break;
      case JoinStyle.Bevel:
        this.ctx.lineJoin = 'bevel';
        break;
    }
    return this;
  }

  lineDash(style: LineStyle): IScreen {
    switch(style) {
      case LineStyle.Solid: this.ctx.setLineDash([]); break;
      case LineStyle.Dash: this.ctx.setLineDash([8,4]); break;
      case LineStyle.DashDot: this.ctx.setLineDash([4,4]); break;
      case LineStyle.DashDotDot: this.ctx.setLineDash([2,3]); break;
      case LineStyle.Dot: this.ctx.setLineDash([3,2,2,2,4,2,2,2,3,2]); break;
    }
    return this;
  }

  lineTo(x: number, y: number): IScreen {
    this.ctx.lineTo(x, y);
    return this;
  }

  line(x0: number, y0: number, x1: number, y1: number): IScreen {
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    return this;
  }  

  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): IScreen {
    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise ? anticlockwise : false);
    return this;
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): IScreen {
    this.ctx.arcTo(x1, y1, x2, y2, radius);
    return this;
  }

  ellipse(x: number, y: number, width: number, height: number): IScreen {
    let kappa = .5522848,
        ox = (width / 2) * kappa,  // control point offset horizontal
        oy = (height / 2) * kappa, // control point offset vertical
        xe = x + width,            // x-end
        ye = y + height,           // y-end
        xm = x + width / 2,        // x-middle
        ym = y + height / 2;       // y-middle
    this
      .beginPath()
      .moveTo(x, ym)
      .bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
      .bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
      .bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
      .bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    return this;
  }    

  roundedRect(x: number, y: number, width: number, height: number, radius: number): IScreen {
    if (width < 4 * radius) radius = width / 4;
    if (height < 4 * radius) radius = height / 4;
    this
      .beginPath()
      .moveTo(x+radius, y)
      .arcTo(x+width, y, x+width, y+height, radius)
      .arcTo(x+width, y+height, x, y+height, radius)
      .arcTo(x, y+height, x, y, radius)
      .arcTo(x, y, x+width, y, radius)
      .closePath();
    return this;
  }  

  octagon(x: number, y: number, width: number, height: number): IScreen {
    this
      .beginPath()
      .moveTo(x, y + height * 0.25)
      .lineTo(x + width * 0.25, y)
      .lineTo(x + width * 0.75, y)
      .lineTo(x + width, y + height * 0.25)
      .lineTo(x + width, y + height * 0.75)
      .lineTo(x + width * 0.75, y + height)
      .lineTo(x + width * 0.25, y + height)
      .lineTo(x, y + height * 0.75)
      .closePath();    
    return this;
  }

  quadraticCurveTo(cp1x: number, cp1y: number, x: number, y: number): IScreen {
    this.ctx.quadraticCurveTo(cp1x, cp1y, x, y);
    return this;
  }

  getQuadraticXY(t: number, sx: number, sy: number, cp1x: number, cp1y: number, ex: number, ey: number): { x: number, y: number } {
    return {
      x: (1-t) * (1-t) * sx + 2 * (1-t) * t * cp1x + t * t * ex,
      y: (1-t) * (1-t) * sy + 2 * (1-t) * t * cp1y + t * t * ey
    };
  }

  getQuadraticAngle(t: number, sx: number, sy: number, cp1x: number, cp1y: number, ex: number, ey: number): number {
    let dx = 2*(1-t)*(cp1x-sx) + 2*t*(ex-cp1x);
    let dy = 2*(1-t)*(cp1y-sy) + 2*t*(ey-cp1y);
    return -Math.atan2(dx, dy) + 0.5*Math.PI;
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): IScreen {
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    return this;
  }

  getBezierXY(t: number, sx: number, sy: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, ex: number, ey: number): { x: number, y: number } {
    return {
      x: Math.pow(1-t,3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
      y: Math.pow(1-t,3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
    };
  }

  getBezierAngle(t: number, sx: number, sy: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, ex: number, ey: number): number {
    let dx = Math.pow(1-t, 2)*(cp1x-sx) + 2*t*(1-t)*(cp2x-cp1x) + t * t * (ex - cp2x);
    let dy = Math.pow(1-t, 2)*(cp1y-sy) + 2*t*(1-t)*(cp2y-cp1y) + t * t * (ey - cp2y);
    return -Math.atan2(dx, dy) + 0.5*Math.PI;
  }  

  rect(x: number, y: number, width: number, height: number): IScreen {
    this.ctx.rect(x, y, width, height);
    return this;
  }

  private textAlign(align: TextAlign): IScreen {
    switch(align) {
      case TextAlign.End:
        this.ctx.textAlign = 'end';
        break;
      case TextAlign.Left:
        this.ctx.textAlign = 'left'
        break;
      case TextAlign.Right:
        this.ctx.textAlign = 'right';
        break;
      case TextAlign.Center:
        this.ctx.textAlign = 'center';
        break;
      default:
        this.ctx.textAlign = 'start';
        break;
    }
    return this;
  }

  private textBaseline(baseline: TextBaseline): IScreen {
    switch(baseline) {
      case TextBaseline.Bottom:
        this.ctx.textBaseline = 'bottom';
        break;
      case TextBaseline.Hanging:
        this.ctx.textBaseline = 'hanging';
        break;
      case TextBaseline.Ideographic:
        this.ctx.textBaseline = 'ideographic';
        break;
      case TextBaseline.Middle:
        this.ctx.textBaseline = 'middle';
        break;
      case TextBaseline.Top:
        this.ctx.textBaseline = 'top';
        break;
      default:
        this.ctx.textBaseline = 'alphabetic';
    }
    return this;
  }

  fillText(text: string, x: number, y: number, font: string, align: TextAlign, baseline: TextBaseline, maxwidth?: number): IScreen {
    this.ctx.font = font;
    this.textAlign(align);
    this.textBaseline(baseline);
    this.ctx.fillText(text, x, y, maxwidth);
    return this;
  }

  strokeText(text: string, x: number, y: number, font: string, align: TextAlign, baseline: TextBaseline, maxwidth?: number): IScreen {
    this.ctx.font = font;
    this.textAlign(align);
    this.textBaseline(baseline);    
    this.ctx.strokeText(text, x, y, maxwidth);
    return this;
  }

  // Take a string of text and split it into a number of lines,
  // working with a maximum width (minimum 50).
  private splitText(maxWidth: number, text: string) {
    if(maxWidth < 50) maxWidth = 50;
    var words = text.trim().split(' ');
    var line: string = '';
    let lines: Array<string> = new Array<string>();

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      }
      else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  }

  // Draw text centered at (x, y), inside an area no wider than <maxWidth>
  drawText(x: number, y: number, width: number, height: number, fontSize: number, font: string, text: string): IScreen {
    let fontStr = `${fontSize}px Roboto`;
    this.ctx.font = fontStr;
    let lineHeight = Math.ceil(fontSize)+1;
    let lines = this.splitText(width, text);
    let xPos = x + width / 2;
    let yPos = y - (lines.length - 1) * lineHeight / 2 + height / 2;
    for(let i = 0; i < lines.length; i++) {
      this.fillText(lines[i], xPos, yPos, fontStr, TextAlign.Center, TextBaseline.Middle);
      yPos += lineHeight;
    }
    return this;
  }

  drawTextBottom(x: number, y: number, width: number, height: number, fontSize: number, font: string, text: string): IScreen {
    let fontStr = `${fontSize}px Roboto`;
    this.ctx.font = fontStr;
    let lineHeight = Math.ceil(fontSize)+1;
    let lines = this.splitText(width, text);
    let xPos = x + width / 2;
    let yPos = y + height - (lines.length - 1) * lineHeight;
    for(let i = 0; i < lines.length; i++) {
      this.fillText(lines[i], xPos, yPos, fontStr, TextAlign.Center, TextBaseline.Bottom);
      yPos += lineHeight;
    }
    return this;
  }

  textWidth(text: string, font: string): number {
    this.ctx.font = font;
    return this.ctx.measureText(text).width;
  }
  
  clip(): IScreen {
    this.ctx.clip();
    return this;
  }

  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.ctx.getImageData(x, y, width, height);
  }
  

}