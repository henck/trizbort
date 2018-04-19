import { App } from '../../app.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js'
import { AppEvent, LineStyle, MouseMode, Values } from '../../enums/enums.js'
import { Model } from '../../models/model.js'
import { Note } from '../../models/note.js'
import { NoteView } from '../../views/noteView.js'
import { Popup } from '../popups.js'
import { IdPopup, IdInput, IdTextarea, IdRange } from '../../controls/controls.js'

export class NotePopup extends Popup implements Subscriber {
  private note: Note;
  private ctrlText: IdInput;
  private ctrlLinewidth: IdRange;

  constructor() {
    super('notepopup', Handlebars.templates.notePopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('#notepopup .js-basic');
    new IdPopup('#notepopup .js-color');
    new IdPopup('#notepopup .js-line');
    new IdPopup('#notepopup .js-position');
    new IdPopup('#notepopup .js-delete').addEventListener('click', () => { this.deleteNote(); });
    new IdPopup('#notepopup .js-more').addEventListener('click', () => { this.showMore(); });    

    this.ctrlText = new IdInput('.js-text').addEventListener('input', () =>  { this.note.text = this.ctrlText.value; });

    let btns = this.elem.querySelectorAll('.js-color id-popup');
    for(var i = 0; i < btns.length; i++) {
      let popup = new IdPopup(btns[i] as HTMLElement);
      let color = Values.COLORS_STANDARD[i];
      popup.backgroundColor = color;
      popup.addEventListener('click', () => { this.setColor(color); });
    }

    new IdPopup('#notepopup .js-linestyle-solid').addEventListener('click', () => { this.note.lineStyle = LineStyle.Solid; });
    new IdPopup('#notepopup .js-linestyle-dash').addEventListener('click', () => { this.note.lineStyle = LineStyle.Dash; });
    new IdPopup('#notepopup .js-linestyle-dashdot').addEventListener('click', () => { this.note.lineStyle = LineStyle.DashDot; });
    new IdPopup('#notepopup .js-linestyle-dashdotdot').addEventListener('click', () => { this.note.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#notepopup .js-linestyle-dot').addEventListener('click', () => { this.note.lineStyle = LineStyle.Dot; });
    new IdPopup('#notepopup .js-linestyle-none').addEventListener('click', () => { this.note.lineStyle = LineStyle.None; }); 

    this.ctrlLinewidth = new IdRange('#notepopup .js-linewidth').addEventListener('input', () => { this.note.lineWidth = this.ctrlLinewidth.value; });

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
