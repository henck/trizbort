import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Note } from '../../models/note.js';
import { App } from '../../app.js';
import { RoomShape } from '../../enums/enums.js';
import { Panel }  from '../panels.js'
import { IdColorPicker, IdRange, IdTextarea, IdPopup, IdShape, IdLineStyle } from '../../controls/controls.js';

export class NotePanel extends Panel implements Subscriber {
  private note: Note;

  private ctrlText: IdTextarea;
  private ctrlRounding: IdRange;
  private colorPicker: IdColorPicker;
  private ctrlShape: IdShape;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLineWidth: IdRange;  
  private colorType: string;
  private colorButtons: Array<IdPopup>;

  constructor() {
    super('notepanel', Handlebars.templates.notePanel, {});
    Dispatcher.subscribe(this);

    this.ctrlText = new IdTextarea('.js-text', this.elem).addEventListener('input', () => { this.note.text = this.ctrlText.value; });    
    this.colorPicker = new IdColorPicker('.js-color', this.elem).addEventListener('change', () => { this.setNoteColor(this.colorPicker.color); }) as IdColorPicker;
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.note.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
    this.ctrlLineWidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.note.lineWidth = this.ctrlLineWidth.value; });
    this.ctrlShape = new IdShape('.js-shape', this.elem).addEventListener('change', () => { this.note.shape = this.ctrlShape.value; }) as IdShape;
    this.ctrlRounding = new IdRange('.js-rounding', this.elem).addEventListener('input', () => { this.note.rounding = this.ctrlRounding.value; });

    // Find color buttons:
    let buttons = this.elem.querySelectorAll(`.colortype`);
    this.colorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.colorType = popup.type;
      this.colorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onColorButton(popup); });
    }
  }

  notify(event: AppEvent, obj: any) {

    /* if(event == AppEvent.Select) {
      this.close();
    } */

    if(event == AppEvent.More) {
      if(obj instanceof Note) {
        let note = obj as Note;
        this.note = note;
        this.open();
    
        // Show note data.
        this.ctrlText.value = note.text; 
        this.ctrlShape.value = note.shape;
        this.ctrlLineStyle.value = note.lineStyle;
        this.ctrlLineWidth.value = note.lineWidth;
        this.ctrlRounding.value = note.rounding;
        // Set color from currently selected color button:
        this.setColor();

        setTimeout(() => {
          this.ctrlText.focus().select(); 
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
    if(this.colorType == 'fill') this.colorPicker.color = this.note.fillColor;
    if(this.colorType == 'border') this.colorPicker.color = this.note.borderColor;
    if(this.colorType == 'text') this.colorPicker.color = this.note.textColor;
    Dispatcher.notify(AppEvent.Refresh, null);
  }

  setNoteColor(color:string) {
    if(this.colorType == 'fill') this.note.fillColor = color;
    if(this.colorType == 'border') this.note.borderColor = color;
    if(this.colorType == 'text') this.note.textColor = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  }

}