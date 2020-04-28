//
// Window class.
//
// Open a window by creating an instance of the Window class:
//
//     new Window('Error', 'An error occurred.', true, false);
//
// If the onOK argument is true, there will be an OK button. If the 
// onCancel argument is true, then there will be a cancel button.
// Any button closes the window when clicked.
//
// onOK and onCancel can also be functions. In this case, the function
// is called when the button is clicked (and the window also closes):
//
//     new Window('Delete room?', 'Are you sure...', () => { ... }, false);
//

export class Header {
  private elem: HTMLElement;
  protected _title: Element;
  protected _content: Element;

  constructor(title?: string, content?: string) {
    this.elem = document.getElementById('app-header');
    this._title = this.elem.querySelector('#title');
    this._content = this.elem.querySelector('#content');

    this.title = title;
    this.content = content;
  }

  set title(val: string) {
    this._title.innerHTML = val || 'Trizbort.io';
  }

  get title(): string {
    return this._title.innerHTML;
  }

  set content(val: string) {
    this._content.innerHTML = val || '';
  }

  get content(): string {
    return this._content.innerHTML;
  }
}