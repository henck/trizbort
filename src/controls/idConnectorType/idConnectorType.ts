import { IdRadio } from "../idRadio/idRadio";
import { ConnectorType } from "../../enums/ConnectorType";
import { Control } from "../Control";
import { Dispatcher } from "../../Dispatcher";
import { AppEvent } from "../../enums";

export class IdConnectorType extends Control {
  private static id = 0;
  private radioDefault: IdRadio;
  private radioIn: IdRadio;
  private radioOut: IdRadio;
  private radioUp: IdRadio;
  private radioDown: IdRadio;

  // 
  // Create a new instance of IdConnectorType by providing a query selector that
  // yields an id-connector-type element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);
    
    // Expand a handlebars template into the top element.
    // Every connectortype has a unique ID.
    this.elem.innerHTML = Handlebars.templates.idConnectorType({ name: `connector${IdConnectorType.id}` });
    IdConnectorType.id++;
    
    this.radioDefault = new IdRadio('.js-default', this.elem);
    this.radioIn = new IdRadio('.js-in', this.elem);
    this.radioOut = new IdRadio('.js-out', this.elem);
    this.radioUp = new IdRadio('.js-up', this.elem);
    this.radioDown = new IdRadio('.js-down', this.elem);
  }

  get value(): ConnectorType {
    if(this.radioIn.checked) return ConnectorType.In;
    if(this.radioOut.checked) return ConnectorType.Out;
    if(this.radioUp.checked) return ConnectorType.Up;
    if(this.radioDown.checked) return ConnectorType.Down;
    return ConnectorType.Default;
  }

  set value(type: ConnectorType) {
    switch(type) {
      case ConnectorType.Default: this.radioDefault.checked = true; break;
      case ConnectorType.In: this.radioIn.checked = true; break;
      case ConnectorType.Out: this.radioOut.checked = true; break;
      case ConnectorType.Up: this.radioUp.checked = true; break;
      case ConnectorType.Down: this.radioDown.checked = true; break;
    }
  }

  //
  // Add an event listener to the inner <radio> elements.
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any, refresh = true): IdConnectorType {
    let ff: any = (refresh? (e: any) => { f(e); Dispatcher.notify(AppEvent.Redraw, null)}: f );

    this.radioDefault.addEventListener(type, ff);
    this.radioIn.addEventListener(type, ff);
    this.radioOut.addEventListener(type, ff);
    this.radioUp.addEventListener(type, ff);
    this.radioDown.addEventListener(type, ff);
    return this;
  }
}