import { Model } from './model.js'
import { Room } from './room.js'
import { Values } from '../enums/enums.js'
import { MapSettings } from './mapSettings.js';

export class Map {
  title: string;
  author: string;
  description: string;
  elements: Model[];
  startRoom: Room;

  settings: MapSettings;

  constructor() {
    this.settings = new MapSettings();

    this.title = "Untitled map";
    this.author = "";
    this.description = "";
    this.elements = new Array();
    this.startRoom = null;
  }

  clear() {
    this.elements.length = 0;
  }

  add(element: Model) {
    this.elements.push(element);
    element.map = this;
  }

  remove(element: Model) {
    if(element == this.startRoom) this.startRoom = null;
    this.elements.splice(this.elements.indexOf(element), 1);
  }

  findById(id: number, type: any) {
    for(let i = 0; i < this.elements.length; i++) {
      if(this.elements[i] instanceof type && this.elements[i].id == id) return this.elements[i];
    }
    return undefined;
  }

  setStartRoom(room: Room) {
    this.startRoom = room;
  }

  bringToFront(model: Model) {
    let idx = this.elements.indexOf(model);
    this.elements.splice(idx, 1);
    this.elements.push(model);
  }

  bringForward(model: Model) {
    let idx = this.elements.indexOf(model);
    if(idx >= this.elements.length) return;
    this.elements.splice(idx, 1);
    this.elements.splice(idx + 1, 0, model);
  }

  sendBackward(model: Model) {
    let idx = this.elements.indexOf(model);
    if(idx <= 0) return;
    this.elements.splice(idx, 1);
    this.elements.splice(idx - 1, 0, model);    
  }

  sendToBack(model: Model) {
    let idx = this.elements.indexOf(model);
    this.elements.splice(idx, 1);
    this.elements.unshift(model);  
  }
}