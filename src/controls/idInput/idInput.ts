import { Control } from "../Control";
import { Dispatcher } from "../../Dispatcher";
import { AppEvent } from "../../enums";

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
  // Move focus to input element
  // Returns this for easy chaining.
  // 
  focus() {
    this.input.focus();
    return this;
  }

  //
  // Select all text in input element
  // Returns this for easy chaining.
  // 
  select() {
    this.input.select();
    return this;
  }

  //
  // Add an event listener to the inner <input>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any, refresh = true): IdInput {
    let ff: any = (refresh? (e: any) => { f(e); Dispatcher.notify(AppEvent.Redraw, null)}: f );

    this.input.addEventListener(type, ff);
    return this;
  }
}