import { Control, IdPopup } from "../";
import { Values } from "../../enums";

export class IdQuickColor extends Control {
  private input: HTMLInputElement;
  private color: string;

  // 
  // Create a new instance of IdQuickColor by providing a query selector that
  // yields an id-quick-color element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idQuickColor({ colors: Values.COLORS_STANDARD });

    let btns = this.elem.querySelectorAll('id-popup');
    for(var i = 0; i < btns.length; i++) {
      let popup = new IdPopup(btns[i] as HTMLElement);
      let color = Values.COLORS_STANDARD[i];
      popup.backgroundColor = color;
      popup.addEventListener('click', () => { this.value = color; });
    }
  }

  set value(color: string) {
    this.color = color;
    let evt = new CustomEvent('change');
    this.elem.dispatchEvent(evt);
  }    

  get value(): string {
    return this.color;
  }

}