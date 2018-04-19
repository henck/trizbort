export class Control {
  protected elem: HTMLElement;

  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    if(elem instanceof HTMLElement) {
      this.elem = elem;
    } else {
      if(!base){
        this.elem = document.querySelector(elem)
      } else {
        this.elem = base.querySelector(elem);
      }      
    }
    if(!this.elem) {
      throw(`Failed to instantiate control: element or selector ${elem} not found in DOM.`);
    }  
  }
}