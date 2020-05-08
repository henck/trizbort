import { Subscriber, Dispatcher } from '../../Dispatcher';
import { AppEvent } from '../../enums/'
import { Block } from '../../models';
import { Panel }  from '../'
import { IdColorPicker, IdRange, IdPopup, IdShape, IdLineStyle } from '../../controls';

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
    super('blockpanel', Handlebars.templates.BlockPanel, {});
    Dispatcher.subscribe(this);

    this.colorPicker = new IdColorPicker('.js-color', this.elem).addEventListener('change', () => { this.setNoteColor(this.colorPicker.color); }) as IdColorPicker;
    this.ctrlShape = new IdShape('.js-shape', this.elem).addEventListener('change', () => { this.block.shape = this.ctrlShape.value; }) as IdShape;
    this.ctrlRounding = new IdRange('.js-rounding', this.elem).addEventListener('input', () => { this.block.rounding = this.ctrlRounding.value; });
    this.ctrlLineStyle = new IdLineStyle('.js-linestyle', this.elem).addEventListener('change', () => { this.block.lineStyle = this.ctrlLineStyle.value; }) as IdLineStyle;
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

    /* if(event == AppEvent.Select) {
      this.close();
    } */

    if(event == AppEvent.More) {
      if(obj instanceof Block) {
        let block = obj as Block;
        this.block = block;
        this.open();
    
        // Show block data.
        this.ctrlRounding.value = this.block.rounding;
        this.ctrlShape.value = this.block.shape;
        this.ctrlLineStyle.value = this.block.lineStyle;
        this.ctrlLineWidth.value = this.block.lineWidth;
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
    Dispatcher.notify(AppEvent.Refresh, null);
  }

  setNoteColor(color:string) {
    if(this.colorType == 'fill') this.block.fillColor = color;
    if(this.colorType == 'border') this.block.borderColor = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  }

}