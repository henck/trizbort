import { Dispatcher } from "../Dispatcher";
import { AppEvent } from "../enums";

/**
 * This is a base class for custom HTML elements. To instantiate,
 * you pass in either an HTML element, or a selector string. 
 * With a selector string, you can also provide a base element
 * that querySelector will run on.
 */
export class Control {
  protected elem: HTMLElement;


  /**
   * Creates a new Control, using an HtmlElement as a base. Throws an error
   * if `elem` cannot be found in the DOM.
   * 
   * @param elem HtmlElement to use as a base for the Control. If this is a string, 
   * `querySelector` will be used, searching through the entire document. If a `base`
   * element is also provided, `querySelector` will run only on elements in base's 
   * subtree.
   * @param base Base element that `querySelector` will run on to locate the control's 
   * element.
   */
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    if(elem instanceof HTMLElement) {
      this.elem = elem;
    } else {
      if(!base){
        this.elem = document.querySelector(elem)
      } else {
        this.elem = base.querySelector(elem);
      }      
    }
    if(!this.elem) {
      throw(`Failed to instantiate control: element or selector ${elem} not found in DOM.`);
    }  
  }

  /**
   * Make the control visible.
   */
  public show = (): void => {
    this.elem.style.display = 'block';
  }

  /**
   * Make the control invisible.
   */
  public hide = (): void => {
    this.elem.style.display = 'none';
  }

  /**
   * Set the control's visibility.
   * @param visible If `true`, Control is made visible. If `false` it's hidden.
   */
  public setVisible = (visible:boolean): void => {
    if(visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Add an event listener to the control's element.
   * @param type Listener type, e.g. 'click'
   * @param f method to call when event fires
   * @param refresh If `true` (default), an `AppEvent.Redraw` event is issued to the dispatcher after the event fires.
   * @returns Reference to self for easy chaining.
   */ 
  public addEventListener(type: string, f: any, refresh = true): Control {
    let ff: any = (refresh? (e: any) => { f(e); Dispatcher.notify(AppEvent.Redraw, null)}: f );

    this.elem.addEventListener(type, ff);
    return this;
  }

}