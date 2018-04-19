import { App } from '../../app.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js'
import { AppEvent, LineStyle, MouseMode, Values } from '../../enums/enums.js'
import { Model } from '../../models/model.js'
import { Connector } from '../../models/connector.js'
import { ConnectorView } from '../../views/connectorView.js'
import { Popup } from '../popups.js'
import { IdInput, IdRange, IdPopup } from '../../controls/controls.js'

export class ConnectorPopup extends Popup implements Subscriber {
  private connector: Connector;
  private ctrlName: IdInput;
  private ctrlLinewidth: IdRange;
  
  constructor() {
    super('connectorpopup', Handlebars.templates.connectorPopup, { colors: Values.COLORS_STANDARD });
    Dispatcher.subscribe(this);

    new IdPopup('#connectorpopup .js-color');
    new IdPopup('#connectorpopup .js-line');
    new IdPopup('#connectorpopup .js-basic');
    new IdPopup('#connectorpopup .js-delete').addEventListener('click', () => { this.deleteConnector(); });
    new IdPopup('#connectorpopup .js-more').addEventListener('click', () => { this.showMore(); });

    this.ctrlName = new IdInput('.js-name').addEventListener('input', () =>  { this.connector.name = this.ctrlName.value; });

    let btns = this.elem.querySelectorAll('.js-color id-popup');
    for(var i = 0; i < btns.length; i++) {
      let popup = new IdPopup(btns[i] as HTMLElement);
      let color = Values.COLORS_STANDARD[i];
      popup.backgroundColor = color;
      popup.addEventListener('click', () => { this.setColor(color); });
    }

    new IdPopup('#connectorpopup .js-linestyle-solid').addEventListener('click', () => { this.connector.lineStyle = LineStyle.Solid; });
    new IdPopup('#connectorpopup .js-linestyle-dash').addEventListener('click', () => { this.connector.lineStyle = LineStyle.Dash; });
    new IdPopup('#connectorpopup .js-linestyle-dashdot').addEventListener('click', () => { this.connector.lineStyle = LineStyle.DashDot; });
    new IdPopup('#connectorpopup .js-linestyle-dashdotdot').addEventListener('click', () => { this.connector.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#connectorpopup .js-linestyle-dot').addEventListener('click', () => { this.connector.lineStyle = LineStyle.Dot; });
    
    this.ctrlLinewidth = new IdRange('#connectorpopup .js-linewidth').addEventListener('input', () => { this.connector.lineWidth = this.ctrlLinewidth.value; });    
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.MouseMove || event == AppEvent.Select) this.toggle();
  }  

  setColor(color: string) {
    this.connector.color = color;
  }

  deleteConnector() {
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