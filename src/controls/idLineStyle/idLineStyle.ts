import { Control } from "../control";
import { IdPopup } from "../controls";
import { LineStyle } from "../../enums/enums";

export class IdLineStyle extends Control {
  private input: HTMLInputElement;
  private lineStyle: LineStyle;

  // 
  // Create a new instance of IdLineStyle by providing a query selector that
  // yields an id-check element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Get 'none' attribute:
    let hasNone = this.elem.dataset.none || false;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idLineStyle({ noneDisplay: hasNone ? 'block' : 'none' });

    new IdPopup('.js-linestyle-solid', this.elem).addEventListener('click', () => { this.value = LineStyle.Solid; });
    new IdPopup('.js-linestyle-dash', this.elem).addEventListener('click', () => { this.value = LineStyle.Dash; });
    new IdPopup('.js-linestyle-dashdot', this.elem).addEventListener('click', () => { this.value = LineStyle.DashDot; });
    new IdPopup('.js-linestyle-dashdotdot', this.elem).addEventListener('click', () => { this.value = LineStyle.DashDotDot; });
    new IdPopup('.js-linestyle-dot', this.elem).addEventListener('click', () => { this.value = LineStyle.Dot; });
    new IdPopup('.js-linestyle-none', this.elem).addEventListener('click', () => { this.value = LineStyle.None; });
  }

  set value(lineStyle: LineStyle) {
    this.lineStyle = lineStyle;
    let evt = new CustomEvent('change');
    this.elem.dispatchEvent(evt);
  }    

  get value(): LineStyle {
    return this.lineStyle;
  }

  //
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdLineStyle {
    this.elem.addEventListener(type, f);
    return this;
  }
}