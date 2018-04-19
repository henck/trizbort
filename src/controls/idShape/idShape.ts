import { Control } from "../control";
import { IdPopup, IdRange } from "../controls";
import { RoomShape } from "../../enums/enums";

export class IdShape extends Control {
  private input: HTMLInputElement;
  private shape: RoomShape;

  // 
  // Create a new instance of IdShape by providing a query selector that
  // yields an id-shape element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idShape({ label: label });

    new IdPopup('.js-rectangle', this.elem).addEventListener('click', () => { this.value = RoomShape.Rectangle; });
    new IdPopup('.js-ellipse', this.elem).addEventListener('click', () => { this.value = RoomShape.Ellipse; });
    new IdPopup('.js-octagon', this.elem).addEventListener('click', () => { this.value = RoomShape.Octagon; });
  }

  set value(shape: RoomShape) {
    this.shape = shape;
    let evt = new CustomEvent('change');
    this.elem.dispatchEvent(evt);
  }    

  get value(): RoomShape {
    return this.shape;
  }

  //
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdShape {
    this.elem.addEventListener(type, f);
    return this;
  }
}