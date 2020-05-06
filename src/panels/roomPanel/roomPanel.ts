import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Room } from '../../models/room.js';
import { App } from '../../app.js';
import { RoomShape } from '../../enums/enums.js';
import { Panel } from '../panels.js';
import { IdColorPicker, IdInput, IdRange, IdCheck, IdTextarea, IdPopup, IdShape, IdLineStyle, IdToast } from '../../controls/controls.js';
import { Obj } from '../../models/obj.js';
import { IdObjectEditor } from '../../controls/idObjectEditor/idObjectEditor.js';

export class RoomPanel extends Panel implements Subscriber {
  private room: Room;

  private ctrlName: IdInput;
  private ctrlSubtitle: IdInput;
  private ctrlDark: IdCheck;
  private ctrlStartroom: IdCheck;
  private ctrlEndroom: IdCheck;
  private ctrlDescription: IdTextarea;
  private ctrlRounding: IdRange;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLineWidth: IdRange;
  private colorPicker: IdColorPicker;
  private colorType: string;
  private colorButtons: Array<IdPopup>;
  private ctrlShape: IdShape;
  private objList: HTMLElement;
  private editors: Array<IdObjectEditor>;
  private objectsCreated: number = 0;

  constructor() {
    super('roompanel', Handlebars.templates.roomPanel, {});
    Dispatcher.subscribe(this);

    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () => { this.room.name = this.ctrlName.value; });
    this.ctrlSubtitle = new IdInput('.js-subtitle', this.elem).addEventListener('input', () => { this.room.subtitle = this.ctrlSubtitle.value; });
    this.ctrlDark = new IdCheck('.js-dark', this.elem).addEventListener('input', () => { this.room.dark = this.ctrlDark.checked; })
    this.ctrlStartroom = new IdCheck('.js-startroom', this.elem).addEventListener('input', () => { this.room.setStartRoom(this.ctrlStartroom.checked); })
    this.ctrlEndroom = new IdCheck('.js-endroom', this.elem).addEventListener('input', () => { this.room.endroom = this.ctrlEndroom.checked; })
    this.ctrlDescription = new IdTextarea('.js-description', this.elem).addEventListener('input', () => { this.room.description = this.ctrlDescription.value; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.room.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
    this.ctrlLineWidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.room.lineWidth = this.ctrlLineWidth.value; });
    this.colorPicker = new IdColorPicker('.js-color', this.elem).addEventListener('change', () => { this.setRoomColor(this.colorPicker.color); }) as IdColorPicker;

    this.ctrlShape = new IdShape('.js-shape', this.elem).addEventListener('change', () => { this.room.shape = this.ctrlShape.value; }) as IdShape;
    this.ctrlRounding = new IdRange('.js-rounding', this.elem).addEventListener('input', () => { this.room.rounding = this.ctrlRounding.value; });

    // Find color buttons:
    let buttons = this.elem.querySelectorAll(`.colortype`);
    this.colorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.colorType = popup.type;
      this.colorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onColorButton(popup); });
    }

    this.objList = this.elem.querySelector('.js-object-list');
    this.elem.querySelector('.js-add-object').addEventListener('click', () => { this.newObject(); });
  }

  newObject() {
    let obj = new Obj();
    this.room.objects.push(obj);
    this.refreshObjList();

    // Show help for first object created.
    if(this.objectsCreated == 0) {
      IdToast.toast("Container objects", "You've just created your first object. When creating multiple objects in a room, you can <b>drag</b> one object into another one to establish a containment relationship.");
    }
    this.objectsCreated++;
  }

  // 
  // Find the array in which the specified Obj lives.
  //
  findObjList(obj: Obj, src?: Array<Obj>): Array<Obj> {
    // For recursion:
    if(!src) src = this.room.objects;
    // Is obj in the current list? Then return the list.
    let idx = src.indexOf(obj);
    if(idx != -1) return src;
    // Check the sublists:
    for(let i = 0; i < src.length; i++) {
      let lst = this.findObjList(obj, src[i].content);
      if(lst != null) return lst;
    }
    // Object not found.
    return null;
  }

  isChildOf(parent: Obj, child: Obj) {
    let idx = parent.content.indexOf(child);
    if(idx != -1) return true;
    for(let i = 0; i < parent.content.length; i++) {
      if(this.isChildOf(parent.content[i], child)) return true;
    }
    return false;
  }

  removeObject(obj: Obj) {
    let lst = this.findObjList(obj);
    let idx = lst.indexOf(obj);
    lst.splice(idx, 1);
    
  }

  addObjectAfter(obj: Obj, afterObj: Obj) {
    // Is the dragged object a child of the "after" object? Then abort.
    if(this.isChildOf(obj, afterObj)) return;

    this.removeObject(obj);

    // Find list and position of "after" object.
    let lst = this.findObjList(afterObj);
    let idx = lst.indexOf(afterObj);

    // Add object after "after" object.
    lst.splice(idx + 1, 0, obj);
  }

  addObjectIn(obj: Obj, inObj: Obj) {
    // Is the dragged object a child of the "in" object? Then abort.
    if(this.isChildOf(obj, inObj)) return;

    this.removeObject(obj);
    inObj.content.push(obj);
  }

  refreshObjList() {
    this.objList.innerHTML = "";
    if(this.room.objects.length == 0) {
      this.objList.innerHTML = "<p>There are no objects in this location.</p>";
    } 
    else {
      this.addEditors(this.room.objects, 0);
    }

    Dispatcher.notify(AppEvent.Refresh, null);
  }

  addEditors(objs: Array<Obj>, indent: number) {
    objs.forEach((obj) => {
      this.createObjEditor(obj, indent);
      this.addEditors(obj.content, indent + 1);
    });
  }

  createObjEditor(obj: Obj, indent: number) {
    let div:HTMLElement = document.createElement('div');
    div.style.marginLeft = `${indent*40}px`;
    this.objList.appendChild(div);
    let editor = new IdObjectEditor(div);
    editor.value = obj;
    editor.addEventListener('delete', () => { this.removeObject(obj); this.refreshObjList(); });
    editor.addEventListener('drop', (e:CustomEvent) => { this.addObjectAfter(e.detail, obj); this.refreshObjList(); });
    editor.addEventListener('dropAsChild', (e:CustomEvent) => { this.addObjectIn(e.detail, obj); this.refreshObjList(); });
  }

  notify(event: AppEvent, obj: any) {

    /* if(event == AppEvent.Select) {
      this.close();
    } */

    if(event == AppEvent.More) {
      if(obj instanceof Room) {
        let room = obj as Room;
        this.room = obj;
        this.open();
    
        // Show room data.
        this.ctrlName.value = room.name; 
        this.ctrlSubtitle.value = room.subtitle;
        this.ctrlDark.checked = room.dark;
        this.ctrlStartroom.checked = room.isStartRoom();
        this.ctrlEndroom.checked = room.endroom;
        this.ctrlShape.value = this.room.shape;
        this.ctrlRounding.value = room.rounding;
        this.ctrlDescription.value = room.description;
        this.ctrlLineStyle.value = room.lineStyle;
        this.ctrlLineWidth.value = room.lineWidth;
        // Set color from currently selected color button:
        this.setColor();   
        // Place objects in object list
        this.refreshObjList();

        setTimeout(() => {
          this.ctrlName.focus().select(); 
        }, 100);
      }
      else {
        this.close();
      }
    }
  }

  onColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.colorButtons.forEach((button) => {
      button.selected = false;
    });

    // Select this button.
    button.selected = true;

    // Make the buttons' data-type the current color type.
    this.colorType = button.type;

    // Set colorPicker to color.
    this.setColor();
  }

  setColor() {
    if(this.colorType == 'fill') this.colorPicker.color = this.room.fillColor;
    if(this.colorType == 'border') this.colorPicker.color = this.room.borderColor;
    if(this.colorType == 'name') this.colorPicker.color = this.room.nameColor;
    if(this.colorType == 'subtitle') this.colorPicker.color = this.room.subtitleColor;       
  }

  setRoomColor(color:string) {
    if(this.colorType == 'fill') this.room.fillColor = color;
    if(this.colorType == 'border') this.room.borderColor = color;
    if(this.colorType == 'name') this.room.nameColor = color;
    if(this.colorType == 'subtitle') this.room.subtitleColor = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  }

}