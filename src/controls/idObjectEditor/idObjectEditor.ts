import { Control } from "../control";
import { IdPopup, IdInput } from "../controls";
import { ObjectKind, AppEvent } from "../../enums/enums";
import { Obj } from "../../models/obj";
import { Dispatcher } from "../../dispatcher";

export class IdObjectEditor extends Control {
  private ctrlName: IdInput;
  private ctrlDescription: IdInput;
  private obj: Obj;
  private btnDelete: HTMLElement;
  private btnActor: IdPopup;
  private btnItem: IdPopup;
  private btnScenery: IdPopup;
  private static dragParent: HTMLElement;
  private static dragObj: Obj;
  private dropDiv: HTMLElement;
  private dropAsChildDiv: HTMLElement;

  // 
  // Create a new instance of IdObjectEditor by providing a query selector that
  // yields an id-object-editor element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idObjectEditor({ });

    // The drag handle is used to initiate dragging. When
    // the mouse is pressed on it, set the 'draggable' attribute
    // on the object editor.
    let handle:HTMLDivElement = this.elem.querySelector('.handle');
    handle.addEventListener('mousedown', (e) => {
      this.elem.setAttribute('draggable', 'true');
    });
    handle.addEventListener('mouseup', (e) => {
      this.elem.setAttribute('draggable', 'false');
    });

    // Object editor dragstart and dragend:
    this.elem.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text', 'foo');
      IdObjectEditor.dragObj = this.obj;
      IdObjectEditor.dragParent = this.elem.parentElement;
      this.elem.classList.add('dragged');
      IdObjectEditor.dragParent.classList.add('dragging');
    });
    this.elem.addEventListener('dragend', (e) => {
      this.elem.setAttribute('draggable', 'false'); // Editor must not remain draggable
      this.elem.classList.remove('dragged');
      IdObjectEditor.dragParent.classList.remove('dragging');
    });

    this.dropDiv = this.elem.querySelector('.drop');
    this.dropAsChildDiv = this.elem.querySelector('.drop-child');
    let me = this;

    this.dropDiv.addEventListener('dragover', (e) => { return this.handleDragOver(e); }, false);
    this.dropAsChildDiv.addEventListener('dragover', (e) => { return this.handleDragOver(e); }, false);

    this.dropDiv.addEventListener('dragenter', function(e) { return me.handleDragEnter(this); });
    this.dropAsChildDiv.addEventListener('dragenter', function(e) { return me.handleDragEnter(this); });

    this.dropDiv.addEventListener('dragleave', function(e) { return me.handleDragLeave(this); });
    this.dropAsChildDiv.addEventListener('dragleave', function(e) { return me.handleDragLeave(this); });

    this.dropDiv.addEventListener('drop', function(e) { return me.handleDrop(e, this); });
    this.dropAsChildDiv.addEventListener('drop', function(e) { return me.handleDropAsChild(e, this); });

    // Text inputs:
    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () => { this.obj.name = this.ctrlName.value; });
    this.ctrlDescription = new IdInput('.js-description', this.elem).addEventListener('input', () => { this.obj.description = this.ctrlDescription.value; });

    // Delete button:
    this.btnDelete = this.elem.querySelector('a');
    this.btnDelete.addEventListener('click', () => { this.delete(); });

    // Object type buttons:
    this.btnItem = new IdPopup('.js-item', this.elem).addEventListener('click', () => { this.setKind(ObjectKind.Item); }) as IdPopup;
    this.btnScenery = new IdPopup('.js-scenery', this.elem).addEventListener('click', () => { this.setKind(ObjectKind.Scenery); }) as IdPopup;
    this.btnActor = new IdPopup('.js-actor', this.elem).addEventListener('click', () => { this.setKind(ObjectKind.Actor); }) as IdPopup;
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  private handleDragEnter(elem: HTMLElement) {
    elem.classList.add('over');
  }

  private handleDragLeave(elem: HTMLElement) {
    elem.classList.remove('over');
  }

  private handleDrop(e: Event, elem: HTMLElement) {
    e.preventDefault();
    e.stopPropagation();
    let evt = new CustomEvent('drop', { detail: IdObjectEditor.dragObj });
    this.elem.dispatchEvent(evt);
    return false;
  }

  private handleDropAsChild(e: Event, elem: HTMLElement) {
    e.preventDefault();
    e.stopPropagation();
    let evt = new CustomEvent('dropAsChild', { detail: IdObjectEditor.dragObj });
    this.elem.dispatchEvent(evt);
    return false;
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
    this.ctrlDescription.value = obj.description;
    this.setKind(obj.kind);
  }    

  get value(): Obj {
    return this.obj;
  }

  private delete() {
    let evt = new CustomEvent('delete');
    this.elem.dispatchEvent(evt);    
  }
}