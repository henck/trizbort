import { Dispatcher } from '../dispatcher.js'
import { AppEvent } from '../enums/appEvent.js'
import { Map } from './map.js'
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
  
  type: string;
  map: Map;

  constructor() {
    this.id = 0;
  }

  getType() {
    return this.type;
  }

  public delete() {
    this.map.remove(this);
    Dispatcher.notify(AppEvent.Delete, this);
  }

  protected cloneToTarget(target: Model) {
    for(let key in this) {
      if(this.hasOwnProperty(key)) {
        (<any>target)[key] = (<any>this)[key];
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
}