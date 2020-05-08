import { App } from '../../App'
import { Subscriber, Dispatcher } from '../../Dispatcher'
import { AppEvent, MouseMode, Values } from '../../enums'
import { Model, Connector } from '../../models'
import { ConnectorView } from '../../views'
import { Popup } from '../'
import { IdInput, IdRange, IdPopup,IdLineStyle, IdQuickColor } from '../../controls'

export class ConnectorPopup extends Popup implements Subscriber {
  private connector: Connector;
  private ctrlName: IdInput;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLinewidth: IdRange;
  private ctrlColor: IdQuickColor;
  
  constructor() {
    super('connectorpopup', Handlebars.templates.ConnectorPopup, { colors: Values.COLORS_STANDARD });
    Dispatcher.subscribe(this);

    new IdPopup('.js-fill', this.elem);
    new IdPopup('.js-line', this.elem);
    new IdPopup('.js-basic', this.elem);
    new IdPopup('.js-delete', this.elem).addEventListener('click', () => { this.delete(); });
    new IdPopup('.js-more', this.elem).addEventListener('click', () => { this.showMore(); });

    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () =>  { this.connector.name = this.ctrlName.value; });
    this.ctrlColor = new IdQuickColor('.js-color', this.elem).addEventListener('change', () => { this.connector.color = this.ctrlColor.value; }) as IdQuickColor;
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.connector.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
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
      this.showAt(x, y);
      this.ctrlName.value = this.connector.name;
      this.ctrlLineStyle.value = this.connector.lineStyle;
      this.ctrlLinewidth.value = this.connector.lineWidth;
    } else {
      this.hide();
    }
  }  
}