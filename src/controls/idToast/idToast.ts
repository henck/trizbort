import { Control } from "../control";

export class IdToast extends Control {
  private text: HTMLDivElement;

  // 
  // Create a new instance of IdToast by providing a query selector that
  // yields an id-toast element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idToast({});
    // Make sure element is visible (toast may have been closed previously):
    this.elem.style.display = 'block';

    // Keep a reference to toast text to be able to set the text:
    this.text = this.elem.querySelector('div');

    // Close toast when close-icon is clicked:
    this.elem.querySelector('span').addEventListener('click', this.handleClose);
  }

  private handleClose = () => {
    this.elem.style.display = 'none';
  }

  public setText(text: string) {
    this.text.innerHTML = text;    
  }
}