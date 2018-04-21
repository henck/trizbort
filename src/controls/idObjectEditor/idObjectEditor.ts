import { Control } from "../control";
import { IdPopup, IdInput } from "../controls";
import { LineStyle, ObjectKind } from "../../enums/enums";
import { Obj } from "../../models/obj";

export class IdObjectEditor extends Control {
  private ctrlName: IdInput;
  private ctrlDescription: IdInput;
  private obj: Obj;
  private btnDelete: HTMLElement;
  private btnActor: IdPopup;
  private btnItem: IdPopup;
  private btnScenery: IdPopup;

  // 
  // Create a new instance of IdObjectEditor by providing a query selector that
  // yields an id-object-editor element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idObjectEditor({ });

    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () => { this.obj.name = this.ctrlName.value; });
    this.ctrlDescription = new IdInput('.js-description', this.elem).addEventListener('input', () => { this.obj.description = this.ctrlDescription.value; });
    this.btnDelete = this.elem.querySelector('a');
    this.btnDelete.addEventListener('click', () => { this.delete(); });

    this.btnItem = new IdPopup('.js-item', this.elem).addEventListener('click', () => { this.setKind(ObjectKind.Item); });
    this.btnScenery = new IdPopup('.js-scenery', this.elem).addEventListener('click', () => { this.setKind(ObjectKind.Scenery); });
    this.btnActor = new IdPopup('.js-actor', this.elem).addEventListener('click', () => { this.setKind(ObjectKind.Actor); });
  }

  private setKind(kind: ObjectKind) {
    this.btnActor.selected = kind == ObjectKind.Actor;
    this.btnItem.selected = kind == ObjectKind.Item;
    this.btnScenery.selected = kind == ObjectKind.Scenery;
    this.obj.kind = kind;
  }

  set value(obj: Obj) {
    this.obj = obj;
    this.ctrlName.value = obj.name;
    this.setKind(obj.kind);
  }    

  get value(): Obj {
    return this.obj;
  }

  private delete() {
    let evt = new CustomEvent('delete');
    this.elem.dispatchEvent(evt);    
  }

  //
  // Returns reference to self for easy chaining.
  // 
  public addEventListener(type: string, f: any): IdObjectEditor {
    this.elem.addEventListener(type, f);
    return this;
  }
}