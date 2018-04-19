import { AppEvent, MouseMode } from '../../enums/enums.js'
import { App } from '../../app.js'
import { IdPopup } from '../../controls/controls.js';

export class ToolPanel  {
  private elem: HTMLElement;

  constructor() {
    this.elem = document.getElementById('toolpanel');
    this.elem.innerHTML = Handlebars.templates.toolPanel({  });

    new IdPopup('#toolpanel .tool-none').addEventListener('click', () => { App.selection.unselectAll(); App.mouseMode = MouseMode.None; });
    new IdPopup('#toolpanel .tool-room').addEventListener('click', () => { App.selection.unselectAll(); App.mouseMode = MouseMode.AddRoom; });
    new IdPopup('#toolpanel .tool-note').addEventListener('click', () => { App.selection.unselectAll(); App.mouseMode = MouseMode.AddNote; });
    new IdPopup('#toolpanel .tool-block').addEventListener('click', () => { App.selection.unselectAll(); App.mouseMode = MouseMode.AddBlock; });
  }
}
