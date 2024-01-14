import { Control } from "../Control";

let toast: IdToast = null;

export class IdToast extends Control {
  private title: HTMLHeadingElement;
  private text: HTMLParagraphElement;

  // 
  // Create a new instance of IdToast by providing a query selector that
  // yields an id-toast element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idToast({});

    // Keep a reference to toast text to be able to set the text:
    this.title = this.elem.querySelector('h3');
    this.text = this.elem.querySelector('p');

    // Close toast when close-icon is clicked:
    this.elem.querySelector('span').addEventListener('click', this.handleClose);
  }

  private handleClose = () => {
    this.elem.style.display = 'none';
  }

  public setText(title: string, text: string, autoWidth: boolean) {
    // Make sure element is visible (toast may have been closed previously):
    this.elem.style.display = 'block';    
    this.title.innerHTML = title;
    this.text.innerHTML = text;    
    if(autoWidth) {
      this.elem.style.width = 'auto';
    } else {
      this.elem.style.width = '250px';
    }
  }

  public static toast(title: string, text: string, autoWidth?: boolean) {
    if(toast == null) toast = new IdToast("#toast");
    toast.setText(title, text, !!autoWidth);
  }
}