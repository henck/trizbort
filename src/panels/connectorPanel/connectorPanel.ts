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
  private ctrlHasDoor: IdCheck;
  private ctrlDoorDesc: IdInput;
  private ctrlDoorAtStart: IdCheck;
  private ctrlLockable: IdCheck;
  private ctrlLocked: IdCheck;
  private ctrlKey: IdInput;
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
    this.ctrlHasDoor = new IdCheck('.js-hasdoor', this.elem).addEventListener('input', () => { this.connector.hasDoor = this.ctrlHasDoor.checked; this.updateDoorControls(); });
    this.ctrlDoorDesc = new IdInput('.js-doordesc', this.elem).addEventListener('input', () => { this.connector.doorDesc = this.ctrlDoorDesc.value; });
    this.ctrlDoorAtStart = new IdCheck('.js-dooratstart', this.elem).addEventListener('input', () => { this.connector.doorAtStart = this.ctrlDoorAtStart.checked; this.updateDoorControls(); });
    this.ctrlLockable = new IdCheck('.js-lockable', this.elem).addEventListener('input', () => { this.connector.lockable = this.ctrlLockable.checked; this.updateDoorControls(); });
    this.ctrlLocked = new IdCheck('.js-locked', this.elem).addEventListener('input', () => { this.connector.locked = this.ctrlLocked.checked; });
    this.ctrlKey = new IdInput('.js-key', this.elem).addEventListener('input', () => { this.connector.key = this.ctrlKey.value; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.connector.lineStyle = this.ctrlLineStyle.value; });
    this.ctrlLineWidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.connector.lineWidth = this.ctrlLineWidth.value; });
    this.ctrlColor = new IdColorPicker('.js-color', this.elem).addEventListener('change', () => { this.connector.color = this.ctrlColor.color; });
    this.btnReverse = this.elem.querySelector('.js-reverse');
    this.btnReverse.addEventListener('click', () => { App.pushUndo(); this.connector.reverse(); });

    this.ctrlStartType = new IdConnectorType('.js-starttype', this.elem).addEventListener('input', () => { this.connector.startType = this.ctrlStartType.value; });
    this.ctrlEndType = new IdConnectorType('.js-endtype', this.elem).addEventListener('input', () => { this.connector.endType = this.ctrlEndType.value; });
    this.ctrlStartName = new IdInput('.js-startname', this.elem).addEventListener('input', () => { this.connector.startName = this.ctrlStartName.value; });
    this.ctrlEndName = new IdInput('.js-endname', this.elem).addEventListener('input', () => { this.connector.endName = this.ctrlEndName.value; });
    this.ctrlStartLabel = new IdInput('.js-startlabel', this.elem).addEventListener('input', () => { this.connector.startLabel = this.ctrlStartLabel.value; });
    this.ctrlEndLabel = new IdInput('.js-endlabel', this.elem).addEventListener('input', () => { this.connector.endLabel = this.ctrlEndLabel.value; });
  }

  private updateDoorControls = () => {
    this.ctrlDoorDesc.setVisible(this.connector.hasDoor);
    this.ctrlDoorAtStart.setVisible(this.connector.hasDoor);
    this.ctrlLockable.setVisible(this.connector.hasDoor);
    this.ctrlLocked.setVisible(this.connector.hasDoor && this.connector.lockable);
    this.ctrlKey.setVisible(this.connector.hasDoor && this.connector.lockable);
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
        this.ctrlHasDoor.checked = connector.hasDoor;
        this.ctrlDoorDesc.setVisible(connector.hasDoor);
        this.ctrlDoorDesc.value = connector.doorDesc;
        this.ctrlDoorAtStart.setVisible(connector.hasDoor);
        this.ctrlDoorAtStart.checked = connector.doorAtStart;
        this.ctrlLockable.setVisible(connector.hasDoor);
        this.ctrlLockable.checked = connector.lockable;
        this.ctrlLocked.setVisible(connector.hasDoor && connector.lockable);
        this.ctrlLocked.checked = connector.locked;
        this.ctrlKey.setVisible(connector.hasDoor && connector.lockable);
        this.ctrlKey.value = connector.key;
        this.ctrlLineWidth.value = connector.lineWidth;
        this.ctrlColor.color = connector.color;
        this.btnReverse.style.display = connector.isDoubleDocked() ? 'block' : 'none';
        this.ctrlStartType.value = connector.startType;
        this.ctrlEndType.value = connector.endType;
        this.ctrlStartName.value = connector.startName;
        this.ctrlEndName.value = connector.endName;
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