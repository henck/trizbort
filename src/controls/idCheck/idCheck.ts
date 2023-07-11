import { Control } from "../Control";
import { Dispatcher } from "../../Dispatcher";
import { AppEvent } from "../../enums";

export class IdCheck extends Control {
  private input: HTMLInputElement;

  // 
  // Create a new instance of IdCheck by providing a query selector that
  // yields an id-check element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idCheck({ label: label });

    // Save inner <input> element so we can attach
    // an event listener to it.
    this.input = this.elem.querySelector('input');
  }

  // 
  // Set the check's value.
  // 
  set checked(checked: boolean) {
    this.input.checked = checked;
  }

  //
  // Return the check's value.
  // 
  get checked(): boolean {
    return this.input.checked;
  }

  //
  // Add an event listener to the inner <input>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any, refresh = true): IdCheck {
    let ff: any = (refresh? (e: any) => { f(e); Dispatcher.notify(AppEvent.Redraw, null)}: f );

    this.input.addEventListener(type, ff);
    return this;
  }
}