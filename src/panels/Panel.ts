import { App } from "../App";

//
// Panel is a base class for closable panels.
// 
export class Panel {
  protected elem: HTMLElement;

  // Panels are instantiated by providing their DOM id
  // and a reference to a Handlebars template
  constructor(id: string, template: any, args: Object) {
    this.elem = document.getElementById(id);

    Handlebars.registerPartial('closePanel', Handlebars.templates.closePanel);
    this.elem.innerHTML = template(args);

    // Find the close button and make it clickable.
    // (Some panels may not include a close button.)
    let closeButton = document.querySelector(`#${id} .panel-close`);
    if(closeButton) closeButton.addEventListener('click', () => { this.close(); });  

    this.elem.addEventListener('keyup', (e: KeyboardEvent) => {
      // Close panel when Esc is pressed.
      if (e.key === 'Escape') {
        this.close();
        e.stopImmediatePropagation();
        App.mainHTMLCanvas.focus();
      }
    });

    // Close self when mouse is down on editor canvas:
    App.mainHTMLCanvas.addEventListener('mousedown', () => {
      this.close();
    });    
  }

  open() {
    this.elem.classList.add('show');
  }

  close() {
    this.elem.classList.remove('show');
  }

  toggle() {
    if(this.elem.classList.contains('show')) {
      this.close();
    } else {
      this.open();
    }    
  }
}