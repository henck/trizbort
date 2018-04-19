import { Control } from "../control";

export class IdInput extends Control {
  private input: HTMLInputElement;

  // 
  // Create a new instance of IdInput by providing a query selector that
  // yields an id-input element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idInput({ label: label });

    // Save inner <input> element so we can attach
    // an event listener to it.
    this.input = this.elem.querySelector('input');
  }

  // 
  // Set the input's value.
  // 
  set value(value: string) {
    this.input.value = value;
  }

  //
  // Return the input's value.
  // 
  get value(): string {
    return this.input.value;
  }

  //
  // Add an event listener to the inner <input>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdInput {
    this.input.addEventListener(type, f);
    return this;
  }
}