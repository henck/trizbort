import { App } from '../App'
import { IScreen, CapStyle, JoinStyle, TextAlign, TextBaseline } from './IScreen'
import { LineStyle } from '../enums'
import { DrawContext } from './drawContext'
import { MarkdownParser, TextSegment } from '../util/MarkdownParser'

export class Canvas implements IScreen {

  private drawer: DrawContext;
  private ctx: CanvasRenderingContext2D;
  
  constructor(
    private canvas: HTMLCanvasElement
  ) {
    this.ctx = canvas.getContext('2d');
    if (App.devicePixelRatio !== 1) {
      canvas.style.transform = `scale(calc(1/${App.devicePixelRatio}))`;
      canvas.style.transformOrigin = "left top";
      canvas.style.width = (100*App.devicePixelRatio) + '%';
      canvas.style.height = (100*App.devicePixelRatio) + '%';
    }
    this.drawer = new DrawContext(this.ctx);
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
    this.ctx.scale(x * App.devicePixelRatio, y * App.devicePixelRatio);
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
    if(App.map.settings.basic.handdrawn) this.drawer.hdLine(x0, y0, x1, y1);
    else {
      this.ctx.moveTo(x0, y0)
      this.ctx.lineTo(x1, y1);
    }
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

    this.beginPath();

    if(App.map.settings.basic.handdrawn) {
      this.drawer.hdEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    }
    else {      
      let kappa = .5522848,
        ox = (width / 2) * kappa,  // control point offset horizontal
        oy = (height / 2) * kappa, // control point offset vertical
        xe = x + width,            // x-end
        ye = y + height,           // y-end
        xm = x + width / 2,        // x-middle
        ym = y + height / 2;       // y-middle
        this.moveTo(x, ym)
        .bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
        .bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
        .bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
        .bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    }    

    this.closePath();
    
    return this;
  }    

  roundedRect(x: number, y: number, width: number, height: number, radius: number): IScreen {
    if (width < 4 * radius) radius = width / 4;
    if (height < 4 * radius) radius = height / 4;

    this.beginPath();
    
    if(App.map.settings.basic.handdrawn) { 
      this.drawer.hdRoundedRect(x, y, width, height, radius);
    }
    else {
      this.moveTo(x+radius, y)
      .arcTo(x+width, y, x+width, y+height, radius)
      .arcTo(x+width, y+height, x, y+height, radius)
      .arcTo(x, y+height, x, y, radius)
      .arcTo(x, y, x+width, y, radius);
    }

    this.closePath();

    return this;
  }  

  octagon(x: number, y: number, width: number, height: number): IScreen {
    
    this.beginPath();
    
    if(App.map.settings.basic.handdrawn) { 
      this.drawer.hdOctagon(x, y, width, height);
    }
    else {
      this.moveTo(x, y + height * 0.25)
      .lineTo(x + width * 0.25, y)
      .lineTo(x + width * 0.75, y)
      .lineTo(x + width, y + height * 0.25)
      .lineTo(x + width, y + height * 0.75)
      .lineTo(x + width * 0.75, y + height)
      .lineTo(x + width * 0.25, y + height)
      .lineTo(x, y + height * 0.75)
    }

    this.closePath();

    return this;
  }

  quadraticCurveTo(cp1x: number, cp1y: number, x: number, y: number): IScreen {
    this.ctx.quadraticCurveTo(cp1x, cp1y, x, y);
    return this;
  }

  bezier2(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number): IScreen {
    if(App.map.settings.basic.handdrawn) { 
      this.drawer.hdBezier2(x0, y0, cx, cy, x1, y1);
    }
    else {
      this.moveTo(x0, y0);
      this.quadraticCurveTo(cx, cy, x1, y1);
    }

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

  bezier3(x0: number, y0: number, cx0: number, cy0: number, cx1: number, cy1: number, x1: number, y1: number): IScreen {
    if(App.map.settings.basic.handdrawn) { 
      this.drawer.hdBezier3(x0, y0, cx0, cy0, cx1, cy1, x1, y1);
    }
    else {
      this.moveTo(x0, y0);
      this.bezierCurveTo(cx0, cy0, cx1, cy1, x1, y1);
    }

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
    let x1 = x + width;
    let y1 = y + height;

    this.beginPath();

    if(App.map.settings.basic.handdrawn){
      this.drawer.hdLine(x, y, x1, y);        
      this.drawer.hdLine(x1, y, x1, y1);
      this.drawer.hdLine(x, y1, x1, y1);
      this.drawer.hdLine(x, y1, x, y);
    }
    else this.ctx.rect(x, y, width, height);

    this.closePath();

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

  fillText(text: string, x: number, y: number, fontSize: number, font: string, align: TextAlign, baseline: TextBaseline, maxwidth?: number): IScreen {
    let fontStr = `${fontSize}px ${font}`;
    this.ctx.font = fontStr;
    this.textAlign(align);
    this.textBaseline(baseline);
    this.ctx.fillText(text, x, y, maxwidth);
    return this;
  }

  strokeText(text: string, x: number, y: number, fontSize: number, font: string, align: TextAlign, baseline: TextBaseline, maxwidth?: number): IScreen {
    let fontStr = `${fontSize}px ${font}`;
    this.ctx.font = fontStr;
    this.textAlign(align);
    this.textBaseline(baseline);    
    this.ctx.strokeText(text, x, y, maxwidth);
    return this;
  }

  // Take a string of text and split it into a number of lines,
  // working with a maximum width (minimum 50).
  // Respects explicit line breaks (\n) in the text.
  private splitText(maxWidth: number, text: string) {
    if(maxWidth < 50) maxWidth = 50;
    let lines: Array<string> = new Array<string>();

    // First split by explicit line breaks
    const paragraphs = text.split('\n');

    for (const paragraph of paragraphs) {
      const trimmed = paragraph.trim();
      if (trimmed === '') {
        // Preserve empty lines
        lines.push('');
        continue;
      }

      // Word-wrap each paragraph
      const words = trimmed.split(' ');
      let line: string = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width * App.devicePixelRatio;
        if (testWidth > maxWidth && n > 0) {
          lines.push(line.trim());
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());
    }

    return lines;
  }

  // Draw text centered at (x, y), inside an area no wider than <maxWidth>
  // Supports **bold** and *italic* markdown.
  drawText(x: number, y: number, width: number, height: number, fontSize: number, font: string, text: string): IScreen {
    const lineHeight = Math.ceil(fontSize) + 1;

    // Split by explicit line breaks first
    const paragraphs = text.split('\n');
    const wrappedLines: TextSegment[][] = [];

    // Process each paragraph
    for (const paragraph of paragraphs) {
      if (paragraph.trim() === '') {
        wrappedLines.push([{ text: '', bold: false, italic: false }]);
        continue;
      }

      // Parse markdown for this paragraph
      const segments = MarkdownParser.parse(paragraph);

      // Word wrap the segments
      const wrapped = this.wrapSegments(segments, width, fontSize, font);
      wrappedLines.push(...wrapped);
    }

    // Calculate vertical centering
    const xPos = x + width / 2;
    let yPos = y - (wrappedLines.length - 1) * lineHeight / 2 + height / 2;

    // Render each wrapped line
    for (const lineSegments of wrappedLines) {
      this.renderSegments(lineSegments, xPos, yPos, fontSize, font);
      yPos += lineHeight;
    }

    return this;
  }

  // Word wrap segments to fit within maxWidth
  private wrapSegments(segments: TextSegment[], maxWidth: number, fontSize: number, font: string): TextSegment[][] {
    if (maxWidth < 50) maxWidth = 50;

    const lines: TextSegment[][] = [];
    let currentLine: TextSegment[] = [];
    let currentWidth = 0;

    for (const segment of segments) {
      // Set font for measuring
      const fontStyle = segment.italic ? 'italic ' : '';
      const fontWeight = segment.bold ? 'bold ' : '';
      this.ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${font}`;

      const words = segment.text.split(' ');

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordWithSpace = i < words.length - 1 ? word + ' ' : word;
        const wordWidth = this.ctx.measureText(wordWithSpace).width * App.devicePixelRatio;

        if (currentWidth + wordWidth > maxWidth && currentLine.length > 0) {
          // Start new line
          lines.push(currentLine);
          currentLine = [];
          currentWidth = 0;
        }

        // Add word to current line
        if (currentLine.length > 0) {
          const lastSeg = currentLine[currentLine.length - 1];
          if (lastSeg.bold === segment.bold && lastSeg.italic === segment.italic) {
            // Same formatting, append to last segment
            lastSeg.text += (lastSeg.text.endsWith(' ') || lastSeg.text === '' ? '' : ' ') + wordWithSpace;
          } else {
            // Different formatting, add as new segment
            currentLine.push({ text: wordWithSpace, bold: segment.bold, italic: segment.italic });
          }
        } else {
          currentLine.push({ text: wordWithSpace, bold: segment.bold, italic: segment.italic });
        }

        currentWidth += wordWidth;
      }
    }

    // Add remaining line
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    // Trim trailing spaces from last segment of each line
    for (const line of lines) {
      if (line.length > 0) {
        line[line.length - 1].text = line[line.length - 1].text.trimEnd();
      }
    }

    return lines.length > 0 ? lines : [[{ text: '', bold: false, italic: false }]];
  }

  // Render segments centered at xPos, yPos
  private renderSegments(segments: TextSegment[], xPos: number, yPos: number, fontSize: number, font: string): void {
    // Calculate total width for centering
    let totalWidth = 0;
    const widths: number[] = [];

    for (const segment of segments) {
      const fontStyle = segment.italic ? 'italic ' : '';
      const fontWeight = segment.bold ? 'bold ' : '';
      this.ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${font}`;
      const w = this.ctx.measureText(segment.text).width;
      widths.push(w);
      totalWidth += w;
    }

    // Render centered
    let currentX = xPos - totalWidth / 2;
    this.textBaseline(TextBaseline.Middle);

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const fontStyle = segment.italic ? 'italic ' : '';
      const fontWeight = segment.bold ? 'bold ' : '';
      this.ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${font}`;
      this.ctx.fillText(segment.text, currentX, yPos);
      currentX += widths[i];
    }
  }

  drawTextBottom(x: number, y: number, width: number, height: number, fontSize: number, font: string, text: string): IScreen {
    const lineHeight = Math.ceil(fontSize) + 1;

    // Split by explicit line breaks first
    const paragraphs = text.split('\n');
    const wrappedLines: TextSegment[][] = [];

    // Process each paragraph
    for (const paragraph of paragraphs) {
      if (paragraph.trim() === '') {
        wrappedLines.push([{ text: '', bold: false, italic: false }]);
        continue;
      }

      // Parse markdown for this paragraph
      const segments = MarkdownParser.parse(paragraph);

      // Word wrap the segments
      const wrapped = this.wrapSegments(segments, width, fontSize, font);
      wrappedLines.push(...wrapped);
    }

    // Position at bottom
    const xPos = x + width / 2;
    let yPos = y + height - (wrappedLines.length - 1) * lineHeight;

    // Render each wrapped line
    for (const lineSegments of wrappedLines) {
      this.renderSegmentsBottom(lineSegments, xPos, yPos, fontSize, font);
      yPos += lineHeight;
    }

    return this;
  }

  // Render segments centered at xPos, with bottom baseline
  private renderSegmentsBottom(segments: TextSegment[], xPos: number, yPos: number, fontSize: number, font: string): void {
    // Calculate total width for centering
    let totalWidth = 0;
    const widths: number[] = [];

    for (const segment of segments) {
      const fontStyle = segment.italic ? 'italic ' : '';
      const fontWeight = segment.bold ? 'bold ' : '';
      this.ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${font}`;
      const w = this.ctx.measureText(segment.text).width;
      widths.push(w);
      totalWidth += w;
    }

    // Render centered with bottom baseline
    let currentX = xPos - totalWidth / 2;
    this.textBaseline(TextBaseline.Bottom);

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const fontStyle = segment.italic ? 'italic ' : '';
      const fontWeight = segment.bold ? 'bold ' : '';
      this.ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${font}`;
      this.ctx.fillText(segment.text, currentX, yPos);
      currentX += widths[i];
    }
  }

  // Fill text with markdown support (left-aligned, for objects)
  fillTextMarkdown(text: string, x: number, y: number, fontSize: number, font: string): IScreen {
    const segments = MarkdownParser.parse(text);

    this.textBaseline(TextBaseline.Middle);
    let currentX = x;

    for (const segment of segments) {
      const fontStyle = segment.italic ? 'italic ' : '';
      const fontWeight = segment.bold ? 'bold ' : '';
      this.ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${font}`;
      this.ctx.fillText(segment.text, currentX, y);
      currentX += this.ctx.measureText(segment.text).width;
    }

    return this;
  }

  textWidth(text: string, fontSize: number, font: string): number {
    let fontStr = `${fontSize}px ${font}`;
    this.ctx.font = fontStr;
    return this.ctx.measureText(text).width;
  }
  
  clip(region?: Path2D): IScreen {
    this.ctx.clip(region);
    return this;
  }

  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.ctx.getImageData(x, y, width, height);
  }
  

}