import { App } from './app'
import { Canvas } from './drawing/canvas'

export class Grid {
  constructor() {
  }

  private drawGridLineV(htmlCanvas: HTMLCanvasElement, canvas: Canvas, x: number) {
    let y1 = Math.floor(-htmlCanvas.offsetHeight) + 0.5;
    let y2 = Math.floor(htmlCanvas.offsetHeight) + 0.5;
    x = Math.floor(x) + 0.5;
    canvas
      .beginPath()
      .moveTo(x, y1)
      .lineTo(x, y2)
      .stroke();
  }

  private drawGridLineH(htmlCanvas: HTMLCanvasElement, canvas: Canvas, y: number) {
    let x1 = Math.floor(-htmlCanvas.offsetWidth) + 0.5;
    let x2 = Math.floor(htmlCanvas.offsetWidth) + 0.5;
    y = Math.floor(y) + 0.5;    
    canvas
      .beginPath()
      .moveTo(x1, y)
      .lineTo(x2, y)
      .stroke();
  }  

  draw(htmlCanvas: HTMLCanvasElement, canvas: Canvas) {
    // Do not draw grid if grid not visible.
    let settings = App.map.settings.grid;
    if(!settings.visible) return;

    canvas
      .save()
      .strokeStyle(settings.color)
      .lineWidth(settings.lineWidth);
    var x = htmlCanvas.offsetWidth / 2 + App.centerX;
    while(x > 0) { this.drawGridLineV(htmlCanvas, canvas, x); x -= settings.size * App.zoom; }
    var x = htmlCanvas.offsetWidth / 2 + App.centerX + settings.size * App.zoom;
    while(x < htmlCanvas.offsetWidth) { this.drawGridLineV(htmlCanvas, canvas, x); x += settings.size * App.zoom; }
    var y = htmlCanvas.offsetHeight / 2 + App.centerY;
    while(y > 0) { this.drawGridLineH(htmlCanvas,canvas, y); y -=  settings.size * App.zoom; }
    var y = htmlCanvas.offsetHeight / 2 + App.centerY + settings.size * App.zoom;
    while(y < htmlCanvas.offsetHeight) { this.drawGridLineH(htmlCanvas, canvas, y); y += settings.size * App.zoom; }

    // Draw origin if necessary
    if(settings.origin) {
      x = Math.floor(htmlCanvas.offsetWidth / 2) + App.centerX;
      y = Math.floor(htmlCanvas.offsetHeight / 2) + App.centerY;
      canvas
        .beginPath()
        .lineWidth(settings.originWidth)
        .moveTo(x, y - settings.size * App.zoom)
        .lineTo(x, y + settings.size * App.zoom)
        .moveTo(x - settings.size * App.zoom, y)
        .lineTo(x + settings.size * App.zoom, y)
        .stroke();
    }

    canvas.restore();    
  }

  static snap(a: number) {
    let settings = App.map.settings.grid;
    if(!settings.snap) return a;
    return Math.floor(a / settings.size) * settings.size;
  }
}