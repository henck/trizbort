/**
 * Window class.
 *
 * Open a window by creating an instance of the Window class:
 *
 *     new Window('Error', 'An error occurred.', true, false);
 *
 * If the onOK argument is true, there will be an OK button. If the 
 * onCancel argument is true, then there will be a cancel button.
 * Any button closes the window when clicked.
 *
 * onOK and onCancel can also be functions. In this case, the function
 * is called when the button is clicked (and the window also closes):
 *
 *    new Window('Delete room?', 'Are you sure...', () => { ... }, false);
 * 
 */
export class Window {
  private elem: HTMLElement;
  private onOK: (() => void) | boolean;
  private onCancel: (() => void) | boolean;

  /**
   * Opens a new Window with optional OK and Cancel buttons.
   * @param title Window title
   * @param content Window content
   * @param onOK If `true`, a OK button is present. If a function, call it when OK button is clicked.
   * @param onCancel If `true`, a Cancel button is present. If a function, call it when Cancel button is clicked.
   */
  constructor(title: string, content: string, onOK: (() => void) | boolean, onCancel: (() => void) | boolean) {
    this.elem = document.getElementById('window');
    this.elem.querySelector('.title').innerHTML = title;
    this.elem.querySelector('.content').innerHTML = content;
    this.onOK = onOK;
    this.onCancel = onCancel;
    this.open();
  }

  /**
   *   When OK is pressed, hide the window, and call OK callback if provided:
   */
  private handleOK = () => {
    this.close();
    if(this.onOK instanceof Function) this.onOK();
  }

  /**
   *   When Cancel is pressed, hide the window, and call Cancel callback if provided:
   */
  private handleCancel = () => {
    this.close();
    if(this.onCancel instanceof Function) this.onCancel();
  }

  private open() {
    // Show OK button if required, and add event listener for it:
    let ok: HTMLElement = this.elem.querySelector('.ok');
    ok.style.display = this.onOK ? 'block' : 'none';
    this.elem.querySelector('.ok').addEventListener('click', this.handleOK);

    // Show Cancel button if required, and add event listener for it:
    let cancel: HTMLElement = this.elem.querySelector('.cancel');
    cancel.style.display = this.onCancel ? 'block' : 'none';
    this.elem.querySelector('.cancel').addEventListener('click', this.handleCancel);

    // Show window:
    this.elem.style.display = 'flex';
  }

  private close() {
    // Remove event listeners for OK and Cancel buttons:
    this.elem.querySelector('.ok').removeEventListener('click', this.handleOK);
    this.elem.querySelector('.cancel').removeEventListener('click', this.handleCancel);

    // Hide window:
    this.elem.style.display = 'none';
  }  
}