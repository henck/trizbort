import { Model } from '../models/model.js'
import { IScreen } from '../drawing/IScreen.js';
import { App } from '../app.js';
import { Canvas } from '../drawing/canvas.js';
import { Rect } from '../util/rect.js';

export class View {
  id: string;
  selected: boolean;

  constructor() {
    this.selected = false;  
  }

  getModel() : Model {
    return null;
  }  

  draw(canvas: IScreen, hover: boolean) {
  }

  clear(canvas: IScreen): Rect {
    return;
  }

  drawSimple(canvas: IScreen, hover: boolean) {
  }  

  drawHandles(canvas: IScreen, mouseX: number, mouseY: number, selectionSize: number, hover: boolean) {
  }

  get movingSelectable(): boolean {
    return false;
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