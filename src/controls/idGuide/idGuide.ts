import { Control } from "../Control";

let guide: IdGuide = null;

export class IdGuide extends Control {
  private title: HTMLHeadingElement;
  private text: HTMLParagraphElement;

  //
  // Create a new instance of IdGuide by providing a query selector that
  // yields an id-guide element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idGuide({});

    // Keep a reference to guide text to be able to set the text:
    this.title = this.elem.querySelector('h3');
    this.text = this.elem.querySelector('p');

    // Close guide when close-icon is clicked:
    this.elem.querySelector('span').addEventListener('click', this.handleClose);
  }

  private handleClose = () => {
    this.elem.style.display = 'none';
  }

  public setText(title: string, text: string, autoWidth: boolean) {
    // Make sure element is visible (guide may have been closed previously):
    this.elem.style.display = 'block';
    this.title.innerHTML = title;
    this.text.innerHTML = text;
    if(autoWidth) {
      this.elem.style.width = 'auto';
    } else {
      this.elem.style.width = '250px';
    }
  }

  public static guide(title: string, text: string, autoWidth?: boolean) {
    if(guide == null) guide = new IdGuide("#guide");
    guide.setText(title, text, !!autoWidth);
  }
}
