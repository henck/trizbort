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

    // Listen on document so Esc still works when focus left the panel
    // (e.g. after clicking a non-focusable Objects tab).
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      // Close panel when Esc is pressed while this panel is open.
      if (e.key === 'Escape' && this.elem.classList.contains('show')) {
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
    // Always start on the first tab when a panel opens.
    const firstTab = this.elem.querySelector('.tabs .tab') as HTMLElement;
    if (firstTab) firstTab.click();
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
