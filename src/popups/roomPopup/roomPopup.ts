import { App } from '../../app.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js'
import { AppEvent, LineStyle, MouseMode, Values } from '../../enums/enums.js'
import { Model } from '../../models/model.js'
import { Room } from '../../models/room.js'
import { RoomView } from '../../views/roomView.js'
import { Popup } from '../popups.js'
import { IdPopup, IdRange, IdInput, IdLineStyle, IdQuickColor } from '../../controls/controls.js';

export class RoomPopup extends Popup implements Subscriber {
  private room: Room;
  private ctrlName: IdInput;
  private ctrlSubtitle: IdInput;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;
  private ctrlColor: IdQuickColor;

  constructor() {
    super('roompopup', Handlebars.templates.roomPopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('.js-basic', this.elem);
    new IdPopup('.js-fill', this.elem);
    new IdPopup('.js-border', this.elem);
    new IdPopup('.js-position', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.delete(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); });

    this.elem.querySelector('.js-front').addEventListener('click', () => { 
      this.room.bringToFront();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-forward').addEventListener('click', () => { 
      this.room.bringForward();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-backward').addEventListener('click', () => { 
      this.room.sendBackward();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-back').addEventListener('click', () => { 
      this.room.sendToBack();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () =>  { this.room.name = this.ctrlName.value; });
    this.ctrlSubtitle = new IdInput('.js-subtitle', this.elem).addEventListener('input', () =>  { this.room.subtitle = this.ctrlSubtitle.value; });
    this.ctrlColor = new IdQuickColor('.js-color', this.elem).addEventListener('change', () => { this.room.fillColor = this.ctrlColor.value; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.room.lineStyle = this.ctrlLineStyle.value; });
    this.ctrlLinewidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.room.lineWidth = this.ctrlLinewidth.value; });
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  delete() {
    App.pushUndo();
    this.room.delete();
    this.toggle();
  }

  showMore() {
    Dispatcher.notify(AppEvent.More, this.room);
  }

  toggle() {
    if(App.selection.isSingle() && App.selection.first() instanceof RoomView && App.mouseMode == MouseMode.None) {
      this.room = (App.selection.first().getModel() as Room);
      this.elem.style.left = App.canvas.offsetWidth / 2 + App.centerX + this.room.x * App.zoom + "px"; 
      this.elem.style.top = App.canvas.offsetHeight / 2 + App.centerY + this.room.y - 64 + "px";
      this.elem.style.display = 'flex';
      // Close any open overlays inside popup.
      let overlays = this.elem.querySelectorAll(".popup-overlay");
      for(let i = 0; i < overlays.length; i++) {
        (overlays[i] as HTMLElement).style.display = 'none';
      }
      this.ctrlLinewidth.value = this.room.lineWidth;
      this.ctrlName.value = this.room.name;
      this.ctrlSubtitle.value = this.room.subtitle;
    } else {
      this.elem.style.display = 'none';
    }
  }  
}