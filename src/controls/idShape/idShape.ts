import { RoomShape } from "../../enums";
import { OptionsGroup } from "../OptionsGroup";

export class IdShape extends OptionsGroup {
  // 
  // Create a new instance of IdShape by providing a query selector that
  // yields an id-shape element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem,  [
      {value: RoomShape.Rectangle, htmlEl: '.js-rectangle'},
      {value: RoomShape.Ellipse, htmlEl: '.js-ellipse'},
      {value: RoomShape.Octagon, htmlEl: '.js-octagon'},
    ], base);
  }

  get dataset(): Object {
    return {
      label: this.elem.dataset.label,
    }
  }

  get template(): string {
    return Handlebars.templates.idShape({ label: (<any>this.dataset)['label'] });
  }

/*   set value(shape: RoomShape) {
    this.value = shape;
     this.shape = shape;
    this.selectValue(this.shape);
    let evt = new CustomEvent('change');
    this.elem.dispatchEvent(evt);
  }    

  get value(): RoomShape {
    return this.value;
  }
 */
}