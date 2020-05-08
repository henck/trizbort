import { Control, IdPopup } from "./";

export class OptionsGroup extends Control {
  protected _value: any;
  protected _values: any = {};

  constructor(elem: HTMLElement|string, elements: {value: number | string, htmlEl: string}[], base?: HTMLElement) {
    super(elem, base);

    this.elem.innerHTML = this.template;

    elements.forEach(el => {
      this._values[el.value] = new IdPopup(el.htmlEl, this.elem).addEventListener('click', () => { this.value = el.value; });
    });
  }

  get dataset(): Object {
    return {}
  }

  get template(): string {
    return '';
  }

  selectValue(val: any) {
    for (const v in this._values) {
      if (this._values.hasOwnProperty(v)) {
        this._values[v].selected = false;
      }
    }
    this._values[val].selected = true;
  }

  setValue(val: any) {
    this._value = val;
    this.selectValue(this._value);
    let evt = new CustomEvent('change');
    this.elem.dispatchEvent(evt);
  }

  set value(val: any) {
    this.setValue(val);
  }    

  get value(): any {
    return this._value;
  }

}