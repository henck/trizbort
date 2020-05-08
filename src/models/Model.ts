import { Dispatcher } from '../dispatcher'
import { AppEvent } from '../enums/'
import { Map } from './map'
import { Xml } from '../io/xmlMap';

//
// Everything that lives on the map is a Model.
// A model has a unique ID.
// 
// When a Model is deleted, it broadcasts a Delete event
// so that subscribers can reflect the deletion.
//
export class Model {
  @Xml('id', 0, (s:string) => { return parseInt(s); })
  id: number;
  map: Map;
  protected _changed: boolean;
  protected _type: string;

  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
    this._changed = true;
  }

  constructor() {
    this.id = 0;
    this._changed = true;
  }

  getType() {
    return this.type;
  }

  get isChanged(): boolean {
    return this._changed;
  }

  forceChanged() {
    this._changed = true;
  }

  unChanged() {
    this._changed = false;
  }

  public delete() {
    this.map.remove(this);
    Dispatcher.notify(AppEvent.Delete, this);
  }

  protected cloneToTargetField(target: Model, key: string) {
    switch (key) {
      case 'map':
          if(!((<any>target)[key] as Map)) ((<any>target)[key] as Map) = new Map();
          ((<any>target)[key] as Map).clone(this.map);
        break;
      default:
        if(typeof (<any>this)[key] == 'object') throw "'" + key + "' field is a complex type. cloneToTarget failed with " + this.type;
        
    (<any>target)[key] = (<any>this)[key];
        break;
    }
  }

  protected cloneToTarget(target: Model) {
    for(let key in this) {
      if(this.hasOwnProperty(key)) {
        this.cloneToTargetField(target, key);
      }
    }
    return target;
  }

  public clone(): Model {
    return null;
  }

  bringToFront() {
    this.map.bringToFront(this);
  }

  bringForward() {
    this.map.bringForward(this);
  }

  sendBackward() {
    this.map.sendBackward(this);
  }

  sendToBack() {
    this.map.sendToBack(this);
  }  

  isBackwardOf(dst: Model): boolean {
    return this.map.isBackward(this, dst);
  }
}