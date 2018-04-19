import { App } from '../../app.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js'
import { AppEvent, LineStyle, MouseMode, Values } from '../../enums/enums.js'
import { Model } from '../../models/model.js'
import { Note } from '../../models/note.js'
import { NoteView } from '../../views/noteView.js'
import { Popup } from '../popups.js'
import { IdPopup, IdInput, IdTextarea, IdRange, IdLineStyle } from '../../controls/controls.js'

export class NotePopup extends Popup implements Subscriber {
  private note: Note;
  private ctrlText: IdInput;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;

  constructor() {
    super('notepopup', Handlebars.templates.notePopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('.js-basic', this.elem);
    new IdPopup('.js-color', this.elem);
    new IdPopup('.js-line', this.elem);
    new IdPopup('.js-position', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.deleteNote(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); });    

    this.ctrlText = new IdInput('.js-text', this.elem).addEventListener('input', () =>  { this.note.text = this.ctrlText.value; });

    let btns = this.elem.querySelectorAll('.js-color id-popup');
    for(var i = 0; i < btns.length; i++) {
      let popup = new IdPopup(btns[i] as HTMLElement);
      let color = Values.COLORS_STANDARD[i];
      popup.backgroundColor = color;
      popup.addEventListener('click', () => { this.setColor(color); });
    }

    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.note.lineStyle = this.ctrlLineStyle.value; });
    this.ctrlLinewidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.note.lineWidth = this.ctrlLinewidth.value; });

    this.elem.querySelector('.js-front').addEventListener('click', () => { 
      this.note.bringToFront();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-forward').addEventListener('click', () => { 
      this.note.bringForward();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-backward').addEventListener('click', () => { 
      this.note.sendBackward();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-back').addEventListener('click', () => { 
      this.note.sendToBack();
      Dispatcher.notify(AppEvent.Load, null);
    });    
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  setColor(color: string) {
    this.note.fillColor = color;
  }

  deleteNote() {
    App.pushUndo();
    this.note.delete();
    this.toggle();
  }

  showMore() {
    Dispatcher.notify(AppEvent.More, this.note);
  }

  toggle() {
    if(App.selection.isSingle() && App.selection.first() instanceof NoteView && App.mouseMode == MouseMode.None) {
      this.note = (App.selection.first().getModel() as Note);
      this.elem.style.left = App.canvas.offsetWidth / 2 + App.centerX + this.note.x * App.zoom + "px";
      this.elem.style.top = App.canvas.offsetHeight / 2 + App.centerY + this.note.y - 64 + "px";
      this.elem.style.display = 'flex';
      // Close any open overlays inside popup.
      let overlays = this.elem.querySelectorAll(".popup-overlay");
      for(let i = 0; i < overlays.length; i++) {
        (overlays[i] as HTMLElement).style.display = 'none';
      }
      this.ctrlText.value = this.note.text;
      this.ctrlLinewidth.value = this.note.lineWidth;
    } else {
      this.elem.style.display = 'none';
    }
  }  
}
