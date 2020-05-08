import { App } from '../../app'
import { Subscriber, Dispatcher } from '../../dispatcher'
import { AppEvent, MouseMode, Values } from '../../enums'
import { Model, Room } from '../../models'
import { RoomView } from '../../views'
import { Popup } from '../'
import { IdPopup, IdRange, IdInput, IdLineStyle, IdQuickColor } from '../../controls';

export class RoomPopup extends Popup implements Subscriber {
  private room: Room;
  private ctrlName: IdInput;
  private ctrlSubtitle: IdInput;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;
  private ctrlColor: IdQuickColor;

  constructor() {
    super('roompopup', Handlebars.templates.RoomPopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('.js-basic', this.elem);
    new IdPopup('.js-fill', this.elem);
    new IdPopup('.js-border', this.elem);
    new IdPopup('.js-position', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.delete(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); }, false);

    this.elem.querySelector('.js-front').addEventListener('click', () => { 
      this.room.bringToFront();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-forward').addEventListener('click', () => { 
      this.room.bringForward();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-backward').addEventListener('click', () => { 
      this.room.sendBackward();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-back').addEventListener('click', () => { 
      this.room.sendToBack();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () =>  { this.room.name = this.ctrlName.value; });
    this.ctrlSubtitle = new IdInput('.js-subtitle', this.elem).addEventListener('input', () =>  { this.room.subtitle = this.ctrlSubtitle.value; });
    this.ctrlColor = new IdQuickColor('.js-color', this.elem).addEventListener('change', () => { this.room.fillColor = this.ctrlColor.value; }) as IdQuickColor;
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.room.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
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
      this.showAt(this.room.x, this.room.y);
      this.ctrlLineStyle.value = this.room.lineStyle;
      this.ctrlLinewidth.value = this.room.lineWidth;
      this.ctrlName.value = this.room.name;
      this.ctrlSubtitle.value = this.room.subtitle;
    } else {
      this.hide();
    }
  }  
}