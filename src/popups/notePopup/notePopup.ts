import { App } from '../../App'
import { Subscriber, Dispatcher } from '../../Dispatcher'
import { AppEvent, MouseMode, Values } from '../../enums'
import { Model, Note } from '../../models'
import { NoteView } from '../../views'
import { Popup } from '../'
import { IdPopup, IdInput, IdRange, IdLineStyle, IdQuickColor } from '../../controls'

export class NotePopup extends Popup implements Subscriber {
  private note: Note;
  private ctrlText: IdInput;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;
  private ctrlColor: IdQuickColor;

  constructor() {
    super('notepopup', Handlebars.templates.NotePopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('.js-basic', this.elem);
    new IdPopup('.js-fill', this.elem);
    new IdPopup('.js-line', this.elem);
    new IdPopup('.js-position', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.delete(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); });    

    this.ctrlText = new IdInput('.js-text', this.elem).addEventListener('input', () =>  { this.note.text = this.ctrlText.value; });
    this.ctrlColor = new IdQuickColor('.js-color', this.elem).addEventListener('change', () => { this.note.fillColor = this.ctrlColor.value; }) as IdQuickColor;
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.note.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
    this.ctrlLinewidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.note.lineWidth = this.ctrlLinewidth.value; });

    this.elem.querySelector('.js-front').addEventListener('click', () => { 
      this.note.bringToFront();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-forward').addEventListener('click', () => { 
      this.note.bringForward();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-backward').addEventListener('click', () => { 
      this.note.sendBackward();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-back').addEventListener('click', () => { 
      this.note.sendToBack();
      Dispatcher.notify(AppEvent.Refresh, null);
    });    
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  delete() {
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
      this.showAt(this.note.x, this.note.y);
      this.ctrlText.value = this.note.text;
      this.ctrlLineStyle.value = this.note.lineStyle;
      this.ctrlLinewidth.value = this.note.lineWidth;
    } else {
      this.hide();
    }
  }  
}