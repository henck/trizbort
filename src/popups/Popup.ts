import { App } from "../App";

export class Popup {
  private id: string;
  protected elem: HTMLElement;

  constructor(id: string, template: any, args: Object) {
    this.id = id;
    this.elem = document.getElementById(id);
    this.elem.innerHTML = template(args);
  }

  protected showAt(x: number, y: number) {
    const dpr = App.devicePixelRatio;
    this.elem.style.left = App.mainHTMLCanvas.offsetWidth / 2 / dpr + App.centerX / dpr + x * App.zoom + "px";
    this.elem.style.top = App.mainHTMLCanvas.offsetHeight / 2 / dpr + App.centerY / dpr + y * App.zoom - 32 + "px";
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