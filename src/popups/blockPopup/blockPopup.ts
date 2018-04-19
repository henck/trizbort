import { App } from '../../app.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js'
import { AppEvent, LineStyle, MouseMode, Values } from '../../enums/enums.js'
import { Model } from '../../models/model.js'
import { Block } from '../../models/block.js'
import { BlockView } from '../../views/blockView.js'
import { Popup } from '../popups.js'
import { IdPopup, IdInput, IdTextarea, IdRange } from '../../controls/controls.js'

export class BlockPopup extends Popup implements Subscriber {
  private block: Block;
  private ctrlLinewidth: IdRange;

  constructor() {
    super('blockpopup', Handlebars.templates.blockPopup, { colors: Values.COLORS_STANDARD });

    Dispatcher.subscribe(this);

    new IdPopup('#blockpopup .js-color');
    new IdPopup('#blockpopup .js-line');
    new IdPopup('#blockpopup .js-position');
    new IdPopup('#blockpopup .js-delete').addEventListener('click', () => { this.deleteBlock(); });
    new IdPopup('#blockpopup .js-more').addEventListener('click', () => { this.showMore(); });    

    let btns = this.elem.querySelectorAll('.js-color id-popup');
    for(var i = 0; i < btns.length; i++) {
      let popup = new IdPopup(btns[i] as HTMLElement);
      let color = Values.COLORS_STANDARD[i];
      popup.backgroundColor = color;
      popup.addEventListener('click', () => { this.setColor(color); });
    }

    new IdPopup('#blockpopup .js-linestyle-solid').addEventListener('click', () => { this.block.lineStyle = LineStyle.Solid; });
    new IdPopup('#blockpopup .js-linestyle-dash').addEventListener('click', () => { this.block.lineStyle = LineStyle.Dash; });
    new IdPopup('#blockpopup .js-linestyle-dashdot').addEventListener('click', () => { this.block.lineStyle = LineStyle.DashDot; });
    new IdPopup('#blockpopup .js-linestyle-dashdotdot').addEventListener('click', () => { this.block.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#blockpopup .js-linestyle-dot').addEventListener('click', () => { this.block.lineStyle = LineStyle.Dot; });
    new IdPopup('#blockpopup .js-linestyle-none').addEventListener('click', () => { this.block.lineStyle = LineStyle.None; }); 

    this.ctrlLinewidth = new IdRange('#blockpopup .js-linewidth').addEventListener('input', () => { this.block.lineWidth = this.ctrlLinewidth.value; });

    this.elem.querySelector('.js-front').addEventListener('click', () => { 
      this.block.bringToFront();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-forward').addEventListener('click', () => { 
      this.block.bringForward();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-backward').addEventListener('click', () => { 
      this.block.sendBackward();
      Dispatcher.notify(AppEvent.Load, null);
    });

    this.elem.querySelector('.js-back').addEventListener('click', () => { 
      this.block.sendToBack();
      Dispatcher.notify(AppEvent.Load, null);
    });    
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  setColor(color: string) {
    this.block.fillColor = color;
  }

  deleteBlock() {
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
      this.elem.style.left = App.canvas.offsetWidth / 2 + App.centerX + this.block.x * App.zoom + "px";
      this.elem.style.top = App.canvas.offsetHeight / 2 + App.centerY + this.block.y - 64 + "px";
      this.elem.style.display = 'flex';
      // Close any open overlays inside popup.
      let overlays = this.elem.querySelectorAll(".popup-overlay");
      for(let i = 0; i < overlays.length; i++) {
        (overlays[i] as HTMLElement).style.display = 'none';
      }
      this.ctrlLinewidth.value = this.block.lineWidth;
    } else {
      this.elem.style.display = 'none';
    }
  }  
}
