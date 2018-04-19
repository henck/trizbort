export class IdPopup {
  public elem: HTMLElement;
  private div: HTMLElement;

  // 
  // Create a new instance of IdPopup by providing a query selector that
  // yields an id-popup element.
  //
  constructor(selector: string|HTMLElement) {
    // Find element by selector:
    if(selector instanceof HTMLElement) {
      this.elem = selector;
    } else {
      this.elem = document.querySelector(selector);
      if(!this.elem) {
        throw(`Failed to instantiate idPopup: selector ${selector} not found in DOM.`);
      }
    }

    // Find element's children and remove them.
    let children = new Array<Element>();
    for(var i = 0; i < this.elem.children.length; i++) {
      children.push(this.elem.children[i]);
    }
    children.forEach((child) => { child.remove(); });

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idPopup({ });

    // Get a reference to the button's div:
    this.div = this.elem.querySelector('div');

    // Add the children back:
    children.forEach((child) => { this.div.appendChild(child); });

    this.setupOverlay();
  }

  private findObjCoordinates(obj: any) {
    let curleft = 0;
    let curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return {
      x : curleft,
      y : curtop
    };    
  }    

  private setupOverlay() {
    // See if button has a .popup-overlay child.
    let child = this.elem.querySelector('.popup-overlay') as HTMLElement;
    // Abort if child not present.
    if(!child) return;
    // Add a click event that shows/hides the child overlay.
    child.style.display = 'none';
    this.elem.addEventListener('click', (e:Event) => {
      window.getSelection().removeAllRanges(); // strangely, contents of overlay sometimes get selected.
      if(child.style.display == 'none') {   
        // Hide all popup overlays in the Document except this one.
        let overlayNodes = document.querySelectorAll('.popup-overlay');
        for(let j = 0; j < overlayNodes.length; j++) {
          (overlayNodes[j] as HTMLElement).style.display = 'none';
        }
        child.style.display = 'block';
        let {x, y} = this.findObjCoordinates(this.elem);
        if(x + child.offsetWidth > window.innerWidth) {
          child.style.left = (window.innerWidth - (x + child.offsetWidth)) + "px";
        }
      } else {
        child.style.display = 'none';
      }
    });
    // Clicking on the overlay itself does not cause it to close,
    // because the click event is never propagated up the DOM tree:
    child.addEventListener('click', (e:Event) => {
      e.stopPropagation();
    });
  }

  set backgroundColor(color: string) {
    this.div.style.backgroundColor = color;
  }

  get backgroundColor() {
    return this.div.style.backgroundColor;
  }

  //
  // Add an event listener to the element.
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdPopup {
    this.elem.addEventListener(type, f);
    return this;
  }
}