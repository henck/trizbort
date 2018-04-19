export class IdRadio {
  private elem: HTMLElement;
  private input: HTMLInputElement;

  // 
  // Create a new instance of IdRadio by providing a query selector that
  // yields an id-radio element.
  //
  constructor(selector: string, base: HTMLElement) {
    // Find element by selector:
    if(!base){
      this.elem = document.querySelector(selector)
    } else {
      this.elem = base.querySelector(selector);
    }
    if(!this.elem) {
      throw(`Failed to instantiate idRadio: selector ${selector} not found in DOM.`);
    }

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Get name attribute:
    let name = this.elem.dataset.name;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idRadio({ label: label, name: name });

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
  public addEventListener(type: string, f: any): IdRadio {
    this.input.addEventListener(type, f);
    return this;
  }
}