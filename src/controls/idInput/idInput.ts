export class IdInput {
  private elem: HTMLElement;
  private input: HTMLInputElement;

  // 
  // Create a new instance of IdInput by providing a query selector that
  // yields an id-input element.
  //
  constructor(selector: string) {
    // Find element by selector:
    this.elem = document.querySelector(selector);
    if(!this.elem) {
      throw(`Failed to instantiate idInput: selector ${selector} not found in DOM.`);
    }

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idInput({ label: label });
    this.input = this.elem.querySelector('input');
  }

  // 
  // Set the input's value.
  // 
  set value(value: string) {
    this.input.value = value;
  }

  //
  // Return the input's value.
  // 
  get value(): string {
    return this.input.value;
  }

  //
  // Add an event listener to the inner <input>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdInput {
    this.input.addEventListener(type, f);
    return this;
  }
}