import { Model } from '../models/model.js'
import { IScreen } from '../drawing/IScreen.js';

export class View {
  selected: boolean;

  constructor() {
    this.selected = false;  
  }

  getModel() : Model {
    return null;
  }  

  draw(canvas: IScreen, hover: boolean) {
  }

  drawSimple(canvas: IScreen, hover: boolean) {
  }  

  drawHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {
  }  

  isSelected() {
    return this.selected;
  }

  select() {
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }

  isIn(x: number, y: number, width: number, height: number) {
    return false;
  }

  isPointIn(x: number, y: number) {
    return false;
  }
}