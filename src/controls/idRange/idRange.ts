import { Control } from "../Control";
import { Dispatcher } from "../../Dispatcher";
import { AppEvent } from "../../enums";

//
// IdRange support the following data-attributes:
// - data-min: Min value (default 0)
// - data-max: Max value (default 100)
// - data-label: Input label
// 
export class IdRange extends Control {
  private input: HTMLInputElement;
  private label: HTMLElement;

  // 
  // Create a new instance of IdRange by providing a query selector that
  // yields an id-range element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);
    
    // Get min/max values. If not specified, assume 0..100
    let min = this.elem.dataset.min;
    if(!min) min = "0";
    let max = this.elem.dataset.max;
    if(!max) max = "100";

    // Get label attribute:
    let label = this.elem.dataset.label;    

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idRange({ min: min, max: max, label: label });
    this.input = this.elem.querySelector('input');
    this.label = this.elem.querySelector('.range-label');

    // Default value is min.
    this.input.value = min;
    this.updateLabel();

    // Whenever the input changes, update the label.
    this.input.addEventListener('input', () => {
      this.updateLabel();
    });
  }

  private updateLabel() {
    this.label.innerHTML = this.input.value;
  }

  // 
  // Set the range's value.
  // 
  set value(value: number) {
    this.input.value = value.toString();
    this.updateLabel();
  }

  //
  // Return the range's value.
  // 
  get value(): number {
    return parseFloat(this.input.value);
  }

  //
  // Add an event listener to the inner <input>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any, refresh = true): IdRange {
    let ff: any = (refresh? (e: any) => { f(e); Dispatcher.notify(AppEvent.Redraw, null)}: f );

    this.input.addEventListener(type, ff);
    return this;
  }
}