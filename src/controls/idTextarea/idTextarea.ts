import { Control } from "../Control";
import { Dispatcher } from "../../Dispatcher";
import { AppEvent } from "../../enums";

export class IdTextarea extends Control {
  private textarea: HTMLTextAreaElement;

  // 
  // Create a new instance of IdTextarea by providing a query selector that
  // yields an id-textarea element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idTextarea({ label: label });

    // Save inner <textarea> element so we can attach
    // an event listener to it.
    this.textarea = this.elem.querySelector('textarea');
  }

  // 
  // Set the textarea's value.
  // 
  set value(value: string) {
    this.textarea.value = value;
  }

  //
  // Return the textarea's value.
  // 
  get value(): string {
    return this.textarea.value;
  }

  //
  // Move focus to input element
  // Returns this for easy chaining.
  // 
  focus() {
    this.textarea.focus();
    return this;
  }

  //
  // Select all text in input element
  // Returns this for easy chaining.
  // 
  select() {
    this.textarea.select();
    return this;
  }  

  //
  // Add an event listener to the inner <textarea>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any, refresh = false): IdTextarea {
    let ff: any = (refresh? (e: any) => { f(e); Dispatcher.notify(AppEvent.Redraw, null)}: f );

    this.textarea.addEventListener(type, ff);
    return this;
  }
}