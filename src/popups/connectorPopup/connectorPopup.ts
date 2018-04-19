import { App } from '../../app.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js'
import { AppEvent, LineStyle, MouseMode, Values } from '../../enums/enums.js'
import { Model } from '../../models/model.js'
import { Connector } from '../../models/connector.js'
import { ConnectorView } from '../../views/connectorView.js'
import { Popup } from '../popups.js'
import { IdInput, IdRange, IdPopup,IdLineStyle, IdQuickColor } from '../../controls/controls.js'

export class ConnectorPopup extends Popup implements Subscriber {
  private connector: Connector;
  private ctrlName: IdInput;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;
  private ctrlColor: IdQuickColor;
  
  constructor() {
    super('connectorpopup', Handlebars.templates.connectorPopup, { colors: Values.COLORS_STANDARD });
    Dispatcher.subscribe(this);

    new IdPopup('.js-fill', this.elem);
    new IdPopup('.js-line', this.elem);
    new IdPopup('.js-basic', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.delete(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); });

    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () =>  { this.connector.name = this.ctrlName.value; });
    this.ctrlColor = new IdQuickColor('.js-color', this.elem).addEventListener('change', () => { this.connector.color = this.ctrlColor.value; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.connector.lineStyle = this.ctrlLineStyle.value; });
    this.ctrlLinewidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.connector.lineWidth = this.ctrlLinewidth.value; });    
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  delete() {
    App.pushUndo();
    this.connector.delete();
    this.toggle();
  }

  showMore() {
    Dispatcher.notify(AppEvent.More, this.connector);
  }  

  toggle() {
    if(App.selection.isSingle() && App.selection.first() instanceof ConnectorView && App.mouseMode == MouseMode.None) {
      this.connector = (App.selection.first().getModel() as Connector);
      let x = this.connector.dockStart ? this.connector.dockStart.x : this.connector.startX;
      let y = this.connector.dockStart ? this.connector.dockStart.y : this.connector.startY;
      this.elem.style.left = App.canvas.offsetWidth / 2 + App.centerX + x * App.zoom + "px";
      this.elem.style.top = App.canvas.offsetHeight / 2 + App.centerY + y - 64 + "px";
      this.elem.style.display = 'flex';
      // Close any open overlays inside popup.
      let overlays = this.elem.querySelectorAll(".popup-overlay");
      for(let i = 0; i < overlays.length; i++) {
        (overlays[i] as HTMLElement).style.display = 'none';
      }
      this.ctrlName.value = this.connector.name;
      this.ctrlLinewidth.value = this.connector.lineWidth;
    } else {
      this.elem.style.display = 'none';
    }
  }  
}