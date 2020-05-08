import { App } from '../../app'
import { Subscriber, Dispatcher } from '../../dispatcher'
import { AppEvent, MouseMode, Values } from '../../enums/enums'
import { Model } from '../../models/model'
import { Block } from '../../models/block'
import { BlockView } from '../../views/blockView'
import { Popup } from '../popups'
import { IdPopup, IdRange, IdLineStyle, IdQuickColor } from '../../controls/controls'

export class BlockPopup extends Popup implements Subscriber {
  private block: Block;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;
  private ctrlColor: IdQuickColor;

  constructor() {
    super('blockpopup', Handlebars.templates.blockPopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('.js-fill', this.elem);
    new IdPopup('.js-line', this.elem);
    new IdPopup('.js-position', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.delete(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); });    

    this.ctrlColor = new IdQuickColor('.js-color', this.elem).addEventListener('change', () => { this.block.fillColor = this.ctrlColor.value; }) as IdQuickColor;
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.block.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
    this.ctrlLinewidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.block.lineWidth = this.ctrlLinewidth.value; });

    this.elem.querySelector('.js-front').addEventListener('click', () => { 
      this.block.bringToFront();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-forward').addEventListener('click', () => { 
      this.block.bringForward();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-backward').addEventListener('click', () => { 
      this.block.sendBackward();
      Dispatcher.notify(AppEvent.Refresh, null);
    });

    this.elem.querySelector('.js-back').addEventListener('click', () => { 
      this.block.sendToBack();
      Dispatcher.notify(AppEvent.Refresh, null);
    });    
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  delete() {
    App.pushUndo();
    this.block.delete();
    this.toggle();
  }

  showMore() {
    Dispatcher.notify(AppEvent.More, this.block);
  }

  toggle() {
    if(App.selection.isSingle() && App.selection.first() instanceof BlockView && App.mouseMode == MouseMode.None) {
      this.block = (App.selection.first().getModel() as Block);
      this.showAt(this.block.x, this.block.y);
      this.ctrlLineStyle.value = this.block.lineStyle;
      this.ctrlLinewidth.value = this.block.lineWidth;
    } else {
      this.hide();
    }
  }  
}
