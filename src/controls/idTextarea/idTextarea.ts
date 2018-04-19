export class IdTextarea {
  private elem: HTMLElement;
  private textarea: HTMLTextAreaElement;

  // 
  // Create a new instance of IdTextarea by providing a query selector that
  // yields an id-textarea element.
  //
  constructor(selector: string) {
    // Find element by selector:
    this.elem = document.querySelector(selector);
    if(!this.elem) {
      throw(`Failed to instantiate idTextarea: selector ${selector} not found in DOM.`);
    }

    // Get label attribute:
    let label = this.elem.dataset.label;

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idTextarea({ label: label });
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
  // Add an event listener to the inner <textarea>
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdTextarea {
    this.textarea.addEventListener(type, f);
    return this;
  }
}