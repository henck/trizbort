import { LineStyle } from "../../enums";
import { OptionsGroup } from "../OptionsGroup";

export class IdLineStyle extends OptionsGroup {
  // 
  // Create a new instance of IdLineStyle by providing a query selector that
  // yields an id-linestyle element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, [
      {value: LineStyle.Solid, htmlEl: '.js-linestyle-solid'},
      {value: LineStyle.Dash, htmlEl: '.js-linestyle-dash'},
      {value: LineStyle.DashDot, htmlEl: '.js-linestyle-dashdot'},
      {value: LineStyle.DashDotDot, htmlEl: '.js-linestyle-dashdotdot'},
      {value: LineStyle.Dot, htmlEl: '.js-linestyle-dot'},
      {value: LineStyle.None, htmlEl: '.js-linestyle-none'},
    ], base);
  }

  get template(): string {
    return Handlebars.templates.idLineStyle({ noneDisplay: (<any>this.dataset)['hasNone'] ? 'block' : 'none', label: (<any>this.dataset)['label'] });
  }

  get dataset(): Object {
    return {
      label: this.elem.dataset.label,
      hasNone: this.elem.dataset.none || false,
    }
  }
}