import { LineStyle } from "../enums";

export enum CapStyle {
  Butt,
  Round,
  Square
}

export enum JoinStyle {
  Miter,
  Round,
  Bevel
}

export enum TextAlign {
  Start,
  End,
  Left, 
  Right,
  Center
}

export enum TextBaseline {
  Alphabetic,
  Top,
  Hanging,
  Middle,
  Ideographic,
  Bottom
}

export interface IScreen {
  // State
  save(): IScreen;
  restore(): IScreen;
  translate(x: number, y: number): IScreen;
  rotate(angle: number): IScreen;
  scale(x: number, y?: number): IScreen;
  // Seed the PRNG for consistent hand-drawn rendering
  seed(value: number): IScreen;

  moveTo(x: number, y: number): IScreen;  

  // Drawing rectangles  
  fillRect(x: number, y:number, width: number, height:number): IScreen;
  strokeRect(x: number, y:number, width: number, height:number): IScreen;
  clearRect(x: number, y:number, width: number, height:number): IScreen;

  // Paths
  beginPath(): IScreen;
  closePath(): IScreen;
  stroke(): IScreen;
  fill(): IScreen;
  fillStyle(color: string): IScreen;
  strokeStyle(color: string): IScreen;

  // Line style
  lineWidth(width: number): IScreen;
  lineCap(style: CapStyle): IScreen; // [butt], round, square
  lineJoin(style: JoinStyle): IScreen; // [miter], round, bevel
  lineDash(style: LineStyle): IScreen; // array


  // Lines
  lineTo(x: number, y: number): IScreen;
  line(x0: number, y0: number, x1: number, y1: number): IScreen;

  // Arcs
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): IScreen;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): IScreen;
  // Ellipse fits inside box:
  ellipse(x: number, y: number, width: number, height: number): IScreen;
  roundedRect(x: number, y: number, width: number, height: number, radius: number): IScreen;
  octagon(x: number, y: number, width: number, height: number): IScreen;

  // Curves
  quadraticCurveTo(cp1x: number, cp1y: number, x: number, y: number): IScreen;
  bezier2(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number): IScreen;
  getQuadraticXY(t: number, sx: number, sy: number, cp1x: number, cp1y: number, ex: number, ey: number): { x: number, y: number };
  getQuadraticAngle(t: number, sx: number, sy: number, cp1x: number, cp1y: number, ex: number, ey: number): number;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): IScreen;
  bezier3(x0: number, y0: number, cx0: number, cy0: number, cx1: number, cy1: number, x1: number, y1: number): IScreen;
  getBezierXY(t: number, sx: number, sy: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, ex: number, ey: number): { x: number, y: number }
  getBezierAngle(t: number, sx: number, sy: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, ex: number, ey: number): number;

  // Rectangles
  rect(x: number, y: number, width: number, height: number): IScreen;

  // Text
  fillText(text: string, x: number, y: number, fontSize: number, font: string, align: TextAlign, baseline: TextBaseline, maxwidth?: number): IScreen;
  fillTextMarkdown(text: string, x: number, y: number, fontSize: number, font: string): IScreen;
  strokeText(text: string, x: number, y: number, fontSize: number, font: string, align: TextAlign, baseline: TextBaseline, maxwidth?: number): IScreen;
  drawText(x: number, y: number, width: number, height: number, fontSize: number, font: string, text: string): IScreen;
  drawTextBottom(x: number, y: number, width: number, height: number, fontSize: number, font: string, text: string): IScreen;
  textWidth(text: string, fontSize: number, font: string): number;

  // Images
  // drawImage(image: HTMLImageElement, x: number, y: number, width?: number, height?: number): IScreen;
  clip(): IScreen;

  getImageData(x: number, y: number, width: number, height: number): ImageData;
}