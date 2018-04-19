import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Room } from '../../models/room.js';
import { App } from '../../app.js';
import { RoomShape } from '../../enums/enums.js';
import { Panel } from '../panels.js';
import { IdColorPicker, IdInput, IdRange, IdCheck, IdTextarea, IdPopup } from '../../controls/controls.js';

export class RoomPanel extends Panel implements Subscriber {
  private room: Room;

  private ctrlName: IdInput;
  private ctrlSubtitle: IdInput;
  private ctrlDark: IdCheck
  private ctrlStartroom: IdCheck;
  private ctrlEndroom: IdCheck;
  private ctrlDescription: IdTextarea;
  private inputShapeRectangle: HTMLInputElement;
  private ctrlRounding: IdRange;
  private divRoomRounding: HTMLElement;
  private inputRoomRounding: HTMLInputElement;
  private labelRoomRounding: HTMLElement;
  private inputShapeEllipse: HTMLInputElement;
  private inputShapeOctagon: HTMLInputElement;
  private colorPicker: IdColorPicker;
  private ctrlShapeRectangle: IdPopup;
  private ctrlShapeEllipse: IdPopup;
  private ctrlShapeOctagon: IdPopup;

  private colorType: string;
  private colorButtons: Array<IdPopup>;

  constructor() {
    super('roompanel', Handlebars.templates.roomPanel, {});
    Dispatcher.subscribe(this);

    this.ctrlName = new IdInput('#roompanel .js-room-name').addEventListener('input', () => { this.room.name = this.ctrlName.value; });
    this.ctrlSubtitle = new IdInput('#roompanel .js-room-subtitle').addEventListener('input', () => { this.room.subtitle = this.ctrlSubtitle.value; });
    this.ctrlDark = new IdCheck('#roompanel .js-room-dark').addEventListener('input', () => { this.room.dark = this.ctrlDark.checked; })
    this.ctrlStartroom = new IdCheck('#roompanel .js-room-startroom').addEventListener('input', () => { this.room.setStartRoom(this.ctrlStartroom.checked); })
    this.ctrlEndroom = new IdCheck('#roompanel .js-room-endroom').addEventListener('input', () => { this.room.endroom = this.ctrlEndroom.checked; })
    this.ctrlDescription = new IdTextarea('#roompanel .js-room-description').addEventListener('input', () => { this.room.description = this.ctrlDescription.value; });
    this.colorPicker = new IdColorPicker('#roompanel .js-room-color').addEventListener('change', () => { this.setRoomColor(this.colorPicker.color); });

    this.ctrlShapeRectangle = new IdPopup('#roompanel .js-room-shape-rectangle').addEventListener('click', () => { this.room.shape = RoomShape.Rectangle; });
    this.ctrlShapeEllipse = new IdPopup('#roompanel .js-room-shape-ellipse').addEventListener('click', () => { this.room.shape = RoomShape.Ellipse; });
    this.ctrlShapeOctagon = new IdPopup('#roompanel .js-room-shape-octagon').addEventListener('click', () => { this.room.shape = RoomShape.Octagon; });
    this.ctrlRounding = new IdRange('#roompanel .js-room-rounding').addEventListener('input', () => { this.room.rounding = this.ctrlRounding.value; });

    // Find color buttons:
    let buttons = document.querySelectorAll(`#roompanel .colortype`);
    this.colorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.colorType = popup.type;
      this.colorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onColorButton(popup); });
    }
  }

  notify(event: AppEvent, obj: any) {

    if(event == AppEvent.Select) {
      this.close();
    }

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
        this.ctrlRounding.value = room.rounding;
        this.ctrlDescription.value = room.description;
        // Set color from currently selected color button:
        this.setColor();   
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
  }

}