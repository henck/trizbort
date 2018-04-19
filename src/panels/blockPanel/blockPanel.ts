import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Block } from '../../models/block.js';
import { App } from '../../app.js';
import { RoomShape } from '../../enums/enums.js';
import { Panel }  from '../panels.js'
import { IdColorPicker, IdRange, IdTextarea, IdPopup } from '../../controls/controls.js';

export class BlockPanel extends Panel implements Subscriber {
  private block: Block;

  private ctrlRounding: IdRange;
  private colorPicker: IdColorPicker;
  private ctrlShapeRectangle: IdPopup;
  private ctrlShapeEllipse: IdPopup;
  private ctrlShapeOctagon: IdPopup;

  private colorType: string;
  private colorButtons: Array<IdPopup>;

  constructor() {
    super('blockpanel', Handlebars.templates.blockPanel, {});
    Dispatcher.subscribe(this);

    this.colorPicker = new IdColorPicker('#blockpanel .js-block-color').addEventListener('change', () => { this.setNoteColor(this.colorPicker.color); });

    this.ctrlShapeRectangle = new IdPopup('#blockpanel .js-block-shape-rectangle').addEventListener('click', () => { this.block.shape = RoomShape.Rectangle; });
    this.ctrlShapeEllipse = new IdPopup('#blockpanel .js-block-shape-ellipse').addEventListener('click', () => { this.block.shape = RoomShape.Ellipse; });
    this.ctrlShapeOctagon = new IdPopup('#blockpanel .js-block-shape-octagon').addEventListener('click', () => { this.block.shape = RoomShape.Octagon; });    
    this.ctrlRounding = new IdRange('#blockpanel .js-block-rounding').addEventListener('input', () => { this.block.rounding = this.ctrlRounding.value; });

    // Find color buttons:
    let buttons = document.querySelectorAll(`#blockpanel .colortype`);
    this.colorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.elem.classList.contains('selected')) this.colorType = popup.elem.dataset.type;
      this.colorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onColorButton(popup); });
    }
  }

  notify(event: AppEvent, obj: any) {

    if(event == AppEvent.Select) {
      this.close();
    }

    if(event == AppEvent.More) {
      if(obj instanceof Block) {
        let block = obj as Block;
        this.block = block;
        this.open();
    
        // Show block data.
        this.ctrlRounding.value = block.rounding;
        // Set color from currently selected color button:
        this.setColor();
      }
      else {
        this.close();
      }
    }
  }

  onColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.colorButtons.forEach((button) => {
      button.elem.classList.remove('selected');
    });

    // Select this button.
    button.elem.classList.add('selected');

    // Make the buttons' data-type the current color type.
    this.colorType = button.elem.dataset.type;

    // Set colorPicker to color.
    this.setColor();
  }

  setColor() {
    if(this.colorType == 'fill') this.colorPicker.color = this.block.fillColor;
    if(this.colorType == 'border') this.colorPicker.color = this.block.borderColor;
  }

  setNoteColor(color:string) {
    if(this.colorType == 'fill') this.block.fillColor = color;
    if(this.colorType == 'border') this.block.borderColor = color;
  }

}