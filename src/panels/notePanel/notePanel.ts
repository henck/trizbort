import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Note } from '../../models/note.js';
import { App } from '../../app.js';
import { RoomShape } from '../../enums/enums.js';
import { Panel }  from '../panels.js'
import { IdColorPicker, IdRange, IdTextarea, IdPopup } from '../../controls/controls.js';

export class NotePanel extends Panel implements Subscriber {
  private note: Note;

  private ctrlText: IdTextarea;
  private ctrlRounding: IdRange;
  private colorPicker: IdColorPicker;
  private ctrlShapeRectangle: IdPopup;
  private ctrlShapeEllipse: IdPopup;
  private ctrlShapeOctagon: IdPopup;

  private colorType: string;
  private colorButtons: Array<IdPopup>;

  constructor() {
    super('notepanel', Handlebars.templates.notePanel, {});
    Dispatcher.subscribe(this);

    this.ctrlText = new IdTextarea('#notepanel .js-note-text').addEventListener('input', () => { this.note.text = this.ctrlText.value; });    
    this.colorPicker = new IdColorPicker('#notepanel .js-note-color').addEventListener('change', () => { this.setNoteColor(this.colorPicker.color); });

    this.ctrlShapeRectangle = new IdPopup('#notepanel .js-note-shape-rectangle').addEventListener('click', () => { this.note.shape = RoomShape.Rectangle; });
    this.ctrlShapeEllipse = new IdPopup('#notepanel .js-note-shape-ellipse').addEventListener('click', () => { this.note.shape = RoomShape.Ellipse; });
    this.ctrlShapeOctagon = new IdPopup('#notepanel .js-note-shape-octagon').addEventListener('click', () => { this.note.shape = RoomShape.Octagon; });    
    this.ctrlRounding = new IdRange('#notepanel .js-note-rounding').addEventListener('input', () => { this.note.rounding = this.ctrlRounding.value; });

    // Find color buttons:
    let buttons = document.querySelectorAll(`#notepanel .colortype`);
    this.colorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.elem.classList.contains('selected')) this.colorType = popup.elem.dataset.type;
      this.colorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onColorButton(popup); });
    }
  }

  notify(event: AppEvent, obj: any) {

    if(event == AppEvent.Select) {
      this.close();
    }

    if(event == AppEvent.More) {
      if(obj instanceof Note) {
        let note = obj as Note;
        this.note = note;
        this.open();
    
        // Show room data.
        this.ctrlText.value = note.text; 
        this.ctrlRounding.value = note.rounding;
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
      button.elem.classList.remove('selected');
    });

    // Select this button.
    button.elem.classList.add('selected');

    // Make the buttons' data-type the current color type.
    this.colorType = button.elem.dataset.type;

    // Set colorPicker to color.
    this.setColor();
  }

  setColor() {
    if(this.colorType == 'fill') this.colorPicker.color = this.note.fillColor;
    if(this.colorType == 'border') this.colorPicker.color = this.note.borderColor;
    if(this.colorType == 'text') this.colorPicker.color = this.note.textColor;
  }

  setNoteColor(color:string) {
    if(this.colorType == 'fill') this.note.fillColor = color;
    if(this.colorType == 'border') this.note.borderColor = color;
    if(this.colorType == 'text') this.note.textColor = color;
  }

}