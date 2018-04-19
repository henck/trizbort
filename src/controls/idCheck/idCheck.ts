export class IdCheck {
  private elem: HTMLElement;
  private input: HTMLInputElement;

  // 
  // Create a new instance of IdCheck by providing a query selector that
  // yields an id-check element.
  //
  constructor(selector: string) {
    // Find element by selector:
    this.elem = document.querySelector(selector);
    if(!this.elem) {
      throw(`Failed to instantiate idCheck: selector ${selector} not found in DOM.`);
    }

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idCheck({ label: label });
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
  public addEventListener(type: string, f: any): IdCheck {
    this.input.addEventListener(type, f);
    return this;
  }
}