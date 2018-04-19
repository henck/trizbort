import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Connector } from '../../models/connector.js';
import { App } from '../../app.js';
import { Panel }  from '../panels.js'
import { IdCheck, IdInput, IdColorPicker } from '../../controls/controls.js';
import { IdRadio } from '../../controls/idRadio/idRadio.js';
import { ConnectorType } from '../../enums/connectorType.js';
import { IdConnectorType } from '../../controls/idConnectorType/idConnectorType.js';

export class ConnectorPanel extends Panel implements Subscriber {
  private connector: Connector;

  private ctrlName: IdInput;
  private ctrlCurve: IdCheck;
  private ctrlOneWay: IdCheck;
  private ctrlColor: IdColorPicker;
  private btnReverse: HTMLLinkElement;
  
  private ctrlStartType: IdConnectorType;
  private ctrlEndType: IdConnectorType;
  private ctrlStartLabel: IdInput;
  private ctrlEndLabel: IdInput;

  constructor() {
    super('connectorpanel', Handlebars.templates.connectorPanel, {});
    Dispatcher.subscribe(this);
    
    this.ctrlName = new IdInput('#connectorpanel .js-connector-name').addEventListener('input', () => { this.connector.name = this.ctrlName.value; });
    this.ctrlCurve = new IdCheck('#connectorpanel .js-connector-curve').addEventListener('input', () => { this.connector.isCurve = this.ctrlCurve.checked; });
    this.ctrlOneWay = new IdCheck('#connectorpanel .js-connector-oneway').addEventListener('input', () => { this.connector.oneWay = this.ctrlOneWay.checked; });
    this.ctrlColor = new IdColorPicker('#connectorpanel .js-connector-color').addEventListener('change', () => { this.connector.color = this.ctrlColor.color; });
    this.btnReverse = this.elem.querySelector('.js-reverse');
    this.btnReverse.addEventListener('click', () => { App.pushUndo(); this.connector.reverse(); });

    this.ctrlStartType = new IdConnectorType('#connectorpanel .js-connector-starttype').addEventListener('input', () => { this.connector.startType = this.ctrlStartType.value; });
    this.ctrlEndType = new IdConnectorType('#connectorpanel .js-connector-endtype').addEventListener('input', () => { this.connector.endType = this.ctrlEndType.value; });
    this.ctrlStartLabel = new IdInput('#connectorpanel .js-connector-startlabel').addEventListener('input', () => { this.connector.startLabel = this.ctrlStartLabel.value; });
    this.ctrlEndLabel = new IdInput('#connectorpanel .js-connector-endlabel').addEventListener('input', () => { this.connector.endLabel = this.ctrlEndLabel.value; });
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

        // Show connector data.
        this.ctrlName.value = connector.name; 
        this.ctrlCurve.checked = connector.isCurve;
        this.ctrlOneWay.checked = connector.oneWay;
        this.ctrlColor.color = connector.color;
        this.btnReverse.style.display = connector.isDoubleDocked() ? 'block' : 'none';
        this.ctrlStartType.value = connector.startType;
        this.ctrlEndType.value = connector.endType;
        this.ctrlStartLabel.value = connector.startLabel;
        this.ctrlEndLabel.value = connector.endLabel;
      }
      else {
        this.close();
      }
    }
  }
}