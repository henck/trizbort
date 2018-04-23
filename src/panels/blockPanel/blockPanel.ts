import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Block } from '../../models/block.js';
import { App } from '../../app.js';
import { RoomShape } from '../../enums/enums.js';
import { Panel }  from '../panels.js'
import { IdColorPicker, IdRange, IdTextarea, IdPopup, IdShape, IdLineStyle } from '../../controls/controls.js';

export class BlockPanel extends Panel implements Subscriber {
  private block: Block;

  private ctrlRounding: IdRange;
  private colorPicker: IdColorPicker;
  private ctrlShape: IdShape;
  private ctrlLineStyle: IdLineStyle;
  private ctrlLineWidth: IdRange;  
  private colorType: string;
  private colorButtons: Array<IdPopup>;

  constructor() {
    super('blockpanel', Handlebars.templates.blockPanel, {});
    Dispatcher.subscribe(this);

    this.colorPicker = new IdColorPicker('.js-color', this.elem).addEventListener('change', () => { this.setNoteColor(this.colorPicker.color); });
    this.ctrlShape = new IdShape('.js-shape', this.elem).addEventListener('change', () => { this.block.shape = this.ctrlShape.value; });
    this.ctrlRounding = new IdRange('.js-rounding', this.elem).addEventListener('input', () => { this.block.rounding = this.ctrlRounding.value; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.block.lineStyle = this.ctrlLineStyle.value; });
    this.ctrlLineWidth = new IdRange('.js-linewidth', this.elem).addEventListener('input', () => { this.block.lineWidth = this.ctrlLineWidth.value; });

    // Find color buttons:
    let buttons = this.elem.querySelectorAll(`.colortype`);
    this.colorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.colorType = popup.type;
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
        this.ctrlLineWidth.value = block.lineWidth;
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
      button.selected = false;
    });

    // Select this button.
    button.selected = true;

    // Make the buttons' data-type the current color type.
    this.colorType = button.type;

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