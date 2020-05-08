import { IdPopup } from "../controls";
import { Values } from "../../enums/enums";
import { Control } from "../control";

export class IdColorPicker extends Control {
  private canvasHSL: HTMLCanvasElement;
  private canvasHue: HTMLCanvasElement;
  private ctxHSL: CanvasRenderingContext2D;
  private ctxHue: CanvasRenderingContext2D;
  private currentColorElem:  HTMLElement;
  private hoverColorElem: HTMLElement;
  private recentButtons: Array<IdPopup>;
  private standardButtons: Array<IdPopup>;  

  private currentHue: number = 180;
  private currentHSLX: number = 150;
  private currentHSLY: number = 75;  

  private static recentColors = [ '#ffffff', '#ffffff', '#ffffff' ];

  // 
  // Create a new instance of IdColorPicker by providing a query selector that
  // yields an id-colorpicker element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);
    
    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idColorPicker({
      'recentcolors': IdColorPicker.recentColors,
      'standardcolors': Values.COLORS_STANDARD
    });

    // Get references to various sub-elements:
    let canvases = this.elem.querySelectorAll('canvas');
    this.canvasHue = canvases[1] as HTMLCanvasElement;
    this.canvasHSL = canvases[0] as HTMLCanvasElement;
    this.ctxHue = this.canvasHue.getContext('2d');
    this.ctxHSL = this.canvasHSL.getContext('2d');
    this.currentColorElem = this.elem.querySelector('.current-color');
    this.hoverColorElem = this.elem.querySelector('.hover-color');

    // Add recent colors:
    let btns = this.elem.querySelectorAll('.recent id-popup');
    this.recentButtons = new Array<IdPopup>();
    for(let i = 0; i < btns.length; i++) {
      let button: IdPopup = new IdPopup(btns[i] as HTMLElement);
      button.backgroundColor = IdColorPicker.recentColors[i];
      button.addEventListener('click', () => { this.pickColor(IdColorPicker.recentColors[i]); })
      this.recentButtons.push(button);
    }

    // Add standard colors:
    btns = this.elem.querySelectorAll('.standard id-popup');
    for(let i = 0; i < btns.length; i++) {
      let button: IdPopup = new IdPopup(btns[i] as HTMLElement);
      button.backgroundColor = Values.COLORS_STANDARD[i];
      button.addEventListener('click', () => { 
        this.addToRecent(Values.COLORS_STANDARD[i]);
        this.pickColor(Values.COLORS_STANDARD[i]); 
      })
    }    

    // Draw colors into canvases:
    this.drawHue();
    this.drawHSL();

    // When the hue canvas is clicked:
    // hue canvas is redrawn (to show hue selection)
    // hsl canvas is redrawn (to show new gradient)
    this.canvasHue.addEventListener('click', (e:MouseEvent) => {
      this.currentHue = 360 - (e.clientY - this.findObjCoordinates(this.canvasHue).y) * 360 / this.canvasHue.clientHeight;
      this.currentHSLX = -100;
      this.currentHSLY = -100;      
      this.drawHue();
      this.drawHSL();
    });

    // When the hsl canvas is hovered, the hovercolor is updated.
    this.canvasHSL.addEventListener('mousemove', (e:MouseEvent) => {
      this.hoverColorElem.style.backgroundColor = this.getColorAtMouse(e.clientX, e.clientY, false);
    });

    // When the hsl canvas is clicked, the currentcolor is updated.
    this.canvasHSL.addEventListener('click', (e: MouseEvent) => {
      let color = this.getColorAtMouse(e.clientX, e.clientY, true);
      this.drawHSL();
      this.addToRecent(color);
      this.pickColor(color);
    });    

    window.addEventListener('id-recent-colors-changed', () => { this.updateRecentColors(); });
  }

  private pickColor(color: string) {
    this.color = color;
    let evt = new CustomEvent('change');
    this.elem.dispatchEvent(evt);
  }  

  set color(color: string) {
    this.currentColorElem.style.backgroundColor = color;
  }

  get color(): string {
    return this.currentColorElem.style.backgroundColor;
  }

  private addToRecent(color: string) {
    // Shift the new color into the front of the list
    // of recent colors.
    IdColorPicker.recentColors.unshift(color);
    IdColorPicker.recentColors.pop();

    // Fire a global event to tell all IdColorpicker instances that
    // the recent colors have changed.
    let evt = new CustomEvent('id-recent-colors-changed');
    window.dispatchEvent(evt);
  }  

  // 
  // Update the colors of the recent color buttons.
  // This happens when a colorpicker anywhere on the page changed
  // the array of recent colors.
  // 
  private updateRecentColors() {
    for(let i = 0; i < this.recentButtons.length; i++) {
      this.recentButtons[i].backgroundColor = IdColorPicker.recentColors[i];
    }
  }
  
  // Return the rgb color on the HSL canvas at the given mouse position
  private getColorAtMouse(mouseX: number, mouseY: number, updateHSLpos: boolean) {
    let {x , y} = this.findObjCoordinates(this.canvasHSL);
    // Determine where the mouse is, in canvas coordinates:
    x = Math.floor((mouseX - x) * this.canvasHSL.width / this.canvasHSL.clientWidth);
    y = Math.floor((mouseY - y) * this.canvasHSL.height / this.canvasHSL.clientHeight);
    if(updateHSLpos) {
      this.currentHSLX = x;
      this.currentHSLY = y;
    }
    // Get the canvas image data, containing just one pixel at the point (x,y)
    let pixelData = this.ctxHSL.getImageData(x, y, 1, 1);
    let color = `rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`;
    return color;
  }

  private findObjCoordinates(obj: any) {
    let curleft = 0;
    let curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return {
      x : curleft,
      y : curtop
    };    
  }  

  // Draw the hue rainbox into the hue canvas.
  // This happens only once.
  private drawHue() {
    this.ctxHue.save();

    // Make canvas same size as its display area,
    // but only if currently visible.
    if(this.canvasHue.offsetWidth > 0 && this.canvasHue.offsetHeight > 0) {
      this.canvasHue.width = this.canvasHue.offsetWidth;
      this.canvasHue.height = this.canvasHue.offsetHeight;
    }

    // Draw hue rainbox:
    for(let i = 0; i < this.canvasHue.height; i++) {
      let perc = 360 - i / this.canvasHue.height * 360;
      this.ctxHue.strokeStyle = `hsl(${perc},100%,50%)`;
      this.ctxHue.beginPath();
      this.ctxHue.moveTo(0, i);
      this.ctxHue.lineTo(this.canvasHue.width, i);
      this.ctxHue.stroke();
    }

    // Draw hue selection circle:
    // (if the canvas is currently invisible/not interacted with, don't draw
    // or the scale will be off.)
    if(this.canvasHue.offsetWidth != 0) {
      this.ctxHue.strokeStyle = '#000';
      this.ctxHue.lineWidth = 1;
      this.ctxHue.beginPath();
      let x = this.canvasHue.width / 2;
      let y = (360 - this.currentHue) / 360 * this.canvasHue.height;
      this.ctxHue.moveTo(x + 5, y);
      this.ctxHue.arc(x, y, 5, 0, Math.PI * 2, false);
      this.ctxHue.stroke();
    }

    this.ctxHue.restore();
  }

  // Draw the HSL gradient into the HSL canvas.
  // This happens each time the hue changes.
  private drawHSL() {
    this.ctxHSL.save();

    // Make canvas same size as its display area,
    // but only if currently visible.
    if(this.canvasHSL.offsetWidth > 0 && this.canvasHSL.offsetHeight > 0) {
      this.canvasHSL.width = this.canvasHSL.offsetWidth;
      this.canvasHSL.height = this.canvasHSL.offsetHeight;
    }    

    for(let i = 0; i < this.canvasHSL.height; i++) {
      let grad = this.ctxHSL.createLinearGradient(0, 0, this.canvasHSL.width, 0);
      let perc = (this.canvasHSL.height-i)*100/this.canvasHSL.height;
      grad.addColorStop(0, `hsl(${this.currentHue}, 100%, ${perc}%)`);
      grad.addColorStop(1, `hsl(${this.currentHue}, 0%, ${perc}%)`);
      this.ctxHSL.fillStyle = grad;
      this.ctxHSL.fillRect(0, i, this.canvasHSL.width, 1);
    }

    // Draw HSL selection circle:
    // (if the canvas is currently invisible/not interacted with, don't draw
    // or the scale will be off.)
    if(this.canvasHSL.offsetWidth != 0) {
      this.ctxHSL.strokeStyle = '#000';
      this.ctxHSL.lineWidth = 1;
      this.ctxHSL.beginPath();
      let x = this.currentHSLX;
      let y = this.currentHSLY;
      this.ctxHSL.moveTo(x + 5, y);
      this.ctxHSL.arc(x, y, 5, 0, Math.PI * 2, false);
      this.ctxHSL.stroke();
    }    

    this.ctxHSL.restore();
  }  
}