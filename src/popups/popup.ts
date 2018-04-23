import { App } from "../app";

export class Popup {
  private id: string;
  protected elem: HTMLElement;

  constructor(id: string, template: any, args: Object) {
    this.id = id;
    this.elem = document.getElementById(id);
    this.elem.innerHTML = template(args);
  }

  protected showAt(x: number, y: number) {
    this.elem.style.left = App.canvas.offsetWidth / 2 + App.centerX + x * App.zoom + "px"; 
    this.elem.style.top = App.canvas.offsetHeight / 2 + App.centerY + y * App.zoom - 32 + "px";
    this.elem.style.display = 'flex';
    // Close any open overlays inside popup.
    let overlays = this.elem.querySelectorAll(".popup-overlay");
    for(let i = 0; i < overlays.length; i++) {
      (overlays[i] as HTMLElement).style.display = 'none';
    }    
  }

  protected hide() {
    this.elem.style.display = 'none';
  }
}