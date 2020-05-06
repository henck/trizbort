import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Connector } from '../../models/connector.js';
import { App } from '../../app.js'; 
import { Panel }  from '../panels.js'
import { IdCheck, IdInput, IdColorPicker, IdLineStyle, IdRange } from '../../controls/controls.js';
import { IdConnectorType } from '../../controls/idConnectorType/idConnectorType.js';

export class ConnectorPanel extends Panel implements Subscriber {
  private connector: Connector;

  private ctrlName: IdInput;
  private ctrlCurve: IdCheck;
  private ctrlOneWay: IdCheck;
  private ctrlColor: IdColorPicker;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLineWidth: IdRange;
  private btnReverse: HTMLLinkElement;
  
  private ctrlStartType: IdConnectorType;
  private ctrlEndType: IdConnectorType;
  private ctrlStartName: IdInput;
  private ctrlEndName: IdInput;
  private ctrlStartLabel: IdInput;
  private ctrlEndLabel: IdInput;

  constructor() {
    super('connectorpanel', Handlebars.templates.connectorPanel, {});
    Dispatcher.subscribe(this);
    
    this.ctrlName = new IdInput('.js-name', this.elem).addEventListener('input', () => { this.connector.name = this.ctrlName.value; });
    this.ctrlCurve = new IdCheck('.js-curve', this.elem).addEventListener('input', () => { this.connector.isCurve = this.ctrlCurve.checked; });
    this.ctrlOneWay = new IdCheck('.js-oneway', this.elem).addEventListener('input', () => { this.connector.oneWay = this.ctrlOneWay.checked; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.connector.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
    this.ctrlLineWidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.connector.lineWidth = this.ctrlLineWidth.value; });
    this.ctrlColor = new IdColorPicker('.js-color', this.elem).addEventListener('change', () => { this.connector.color = this.ctrlColor.color; }) as IdColorPicker;
    this.btnReverse = this.elem.querySelector('.js-reverse');
    this.btnReverse.addEventListener('click', () => { App.pushUndo(); this.connector.reverse(); Dispatcher.notify(AppEvent.Refresh, null)});

    this.ctrlStartType = new IdConnectorType('.js-starttype', this.elem).addEventListener('input', () => { this.connector.startType = this.ctrlStartType.value; });
    this.ctrlEndType = new IdConnectorType('.js-endtype', this.elem).addEventListener('input', () => { this.connector.endType = this.ctrlEndType.value; });
    this.ctrlStartLabel = new IdInput('.js-startlabel', this.elem).addEventListener('input', () => { this.connector.startLabel = this.ctrlStartLabel.value; });
    this.ctrlEndLabel = new IdInput('.js-endlabel', this.elem).addEventListener('input', () => { this.connector.endLabel = this.ctrlEndLabel.value; });
  }

  notify(event: AppEvent, obj: any) {
    if(event == AppEvent.Select) {
      this.close();
    }

    if(event == AppEvent.More) {
      if(obj instanceof Connector) {
        let connector = obj as Connector;
        this.connector = connector;
        this.open();

        //  Update connector data.
        this.ctrlName.value = connector.name; 
        this.ctrlCurve.checked = connector.isCurve;
        this.ctrlOneWay.checked = connector.oneWay;
        this.ctrlLineStyle.value = connector.lineStyle;
        this.ctrlLineWidth.value = connector.lineWidth;
        this.ctrlColor.color = connector.color;
        this.btnReverse.style.display = connector.isDoubleDocked() ? 'block' : 'none';
        this.ctrlStartType.value = connector.startType;
        this.ctrlEndType.value = connector.endType;
        this.ctrlStartLabel.value = connector.startLabel;
        this.ctrlEndLabel.value = connector.endLabel;

        setTimeout(() => {
          this.ctrlName.focus().select(); 
        }, 100);           
      }
      else {
        this.close();
      }
    }
  }
}