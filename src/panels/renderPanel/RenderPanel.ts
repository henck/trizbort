import { Subscriber, Dispatcher } from '../../Dispatcher'
import { MapSettings } from '../../models';
import { AppEvent } from '../../enums/'
import { App } from '../../App'
import { Panel }  from '../'
import { IdRange, IdCheck, IdPopup, IdColorPicker, IdShape, IdLineStyle, Window } from '../../controls'
import { ObsidianTheme, DiagramTheme, HandDrawnTheme } from '../../themes'

export class RenderPanel extends Panel implements Subscriber {

  private settings: MapSettings;

  private ctrlGridVisible: IdCheck;
  private ctrlGridOrigin: IdCheck;
  private ctrlGridSnap: IdCheck;
  private ctrlGridSize: IdRange;
  private mapColorPicker: IdColorPicker;
  private mapColorType: string;
  private mapColorButtons: Array<IdPopup>;

  private ctrlRoomWidth: IdRange;
  private ctrlRoomHeight: IdRange;
  private ctrlRoomLinewidth: IdRange;
  private ctrlRoomRounding: IdRange;
  private ctrlRoomDarknessSize: IdRange;
  private roomColorPicker: IdColorPicker;
  private roomColorType: string;
  private roomColorButtons: Array<IdPopup>;
  private ctrlRoomShape: IdShape;
  private ctrlRoomLine: IdLineStyle;

  private ctrlConnectorLinewidth: IdRange;
  private ctrlConnectorStalk: IdRange;
  private ctrlConnectorLabelDistance: IdRange;
  private ctrlConnectorArrowSize: IdRange;
  private ctrlConnectorCurve: IdCheck;
  private ctrlConnectorCurveStrength: IdRange;
  private connectorColorPicker: IdColorPicker;
  private ctrlConnectorLine: IdLineStyle;

  private ctrlNoteWidth: IdRange;
  private ctrlNoteHeight: IdRange;
  private ctrlNoteLinewidth: IdRange;
  private ctrlNoteRounding: IdRange;
  private noteColorPicker: IdColorPicker;
  private noteColorType: string;
  private noteColorButtons: Array<IdPopup>;
  private ctrlNoteShape: IdShape;
  private ctrlNoteLine: IdLineStyle;

  private ctrlBlockWidth: IdRange;
  private ctrlBlockHeight: IdRange;
  private ctrlBlockLinewidth: IdRange;
  private ctrlBlockRounding: IdRange;
  private blockColorPicker: IdColorPicker;
  private blockColorType: string;
  private blockColorButtons: Array<IdPopup>;  
  private ctrlBlockShape: IdShape;
  private ctrlBlockLine: IdLineStyle;
  
  constructor() {
    super('renderpanel', Handlebars.templates.RenderPanel, { });
    Dispatcher.subscribe(this);

    this.ctrlGridVisible = new IdCheck('.js-grid-visible', this.elem).addEventListener('input', () => { App.map.settings.grid.visible = this.ctrlGridVisible.checked})
    this.ctrlGridOrigin = new IdCheck('.js-grid-origin', this.elem).addEventListener('input', () => { App.map.settings.grid.origin = this.ctrlGridOrigin.checked})
    this.ctrlGridSnap = new IdCheck('.js-grid-snap', this.elem).addEventListener('input', () => { App.map.settings.grid.snap = this.ctrlGridSnap.checked})
    this.ctrlGridSize = new IdRange('.js-grid-size', this.elem).addEventListener('input', () => { App.map.settings.grid.size = this.ctrlGridSize.value; });

    this.mapColorPicker = new IdColorPicker('.js-map-color', this.elem).addEventListener('change', () => { this.setMapColor(this.mapColorPicker.color); }) as IdColorPicker;
    // Find map color buttons:
    var buttons = this.elem.querySelectorAll('.map-colortype');
    this.mapColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.mapColorType = popup.type;
      this.mapColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onMapColorButton(popup); });
    }    

    this.elem.querySelector('.js-theme-default').addEventListener('click', () => { this.applyTheme('default'); });
    this.elem.querySelector('.js-theme-diagram').addEventListener('click', () => { this.applyTheme('diagram'); });
    this.elem.querySelector('.js-theme-obsidian').addEventListener('click', () => { this.applyTheme('obsidian'); });
    this.elem.querySelector('.js-theme-hand-drawn').addEventListener('click', () => { this.applyTheme('hand-drawn'); });

    this.ctrlRoomWidth = new IdRange('.js-room-width', this.elem).addEventListener('input', () => { App.map.settings.room.width = this.ctrlRoomWidth.value });
    this.ctrlRoomHeight = new IdRange('.js-room-height', this.elem).addEventListener('input', () => { App.map.settings.room.height = this.ctrlRoomHeight.value });
    this.ctrlRoomLinewidth = new IdRange('.js-room-linewidth', this.elem).addEventListener('input', () => { App.map.settings.room.lineWidth = this.ctrlRoomLinewidth.value });
    this.ctrlRoomRounding = new IdRange('.js-room-rounding', this.elem).addEventListener('input', () => { App.map.settings.room.rounding = this.ctrlRoomRounding.value });
    this.ctrlRoomDarknessSize = new IdRange('.js-room-darkness-size', this.elem).addEventListener('input', () => { App.map.settings.room.darknessSize = this.ctrlRoomDarknessSize.value });

    this.ctrlRoomShape = new IdShape('.js-room-shape', this.elem).addEventListener('change', () => { App.map.settings.room.shape = this.ctrlRoomShape.value }) as IdShape;
    this.ctrlRoomLine = new IdLineStyle('.js-room-line', this.elem).addEventListener('change', () => { App.map.settings.room.lineStyle = this.ctrlRoomLine.value }) as IdLineStyle;

    this.roomColorPicker = new IdColorPicker('.js-room-color', this.elem).addEventListener('change', () => { this.setRoomColor(this.roomColorPicker.color); }) as IdColorPicker;
    // Find room color buttons:
    var buttons = this.elem.querySelectorAll('.room-colortype');
    this.roomColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.roomColorType = popup.type;
      this.roomColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onRoomColorButton(popup); });
    }

    this.ctrlConnectorLinewidth = new IdRange('.js-connector-linewidth', this.elem).addEventListener('input', () => { App.map.settings.connector.lineWidth = this.ctrlConnectorLinewidth.value });
    this.ctrlConnectorStalk = new IdRange('.js-connector-stalk', this.elem).addEventListener('input', () => { App.map.settings.connector.stalk = this.ctrlConnectorStalk.value });
    this.ctrlConnectorLabelDistance = new IdRange('.js-connector-label-distance', this.elem).addEventListener('input', () => { App.map.settings.connector.labelDistance = this.ctrlConnectorLabelDistance.value });
    this.ctrlConnectorArrowSize = new IdRange('.js-connector-arrow-size', this.elem).addEventListener('input', () => { App.map.settings.connector.arrowSize = this.ctrlConnectorArrowSize.value });
    this.ctrlConnectorCurve = new IdCheck('.js-connector-curve', this.elem).addEventListener('input', () => { App.map.settings.connector.isCurve = this.ctrlConnectorCurve.checked })
    this.ctrlConnectorCurveStrength = new IdRange('.js-connector-curve-strength', this.elem).addEventListener('input', () => { App.map.settings.connector.curveStrength = this.ctrlConnectorCurveStrength.value / 10 });
    this.ctrlConnectorLine = new IdLineStyle('.js-connector-line', this.elem).addEventListener('change', () => { App.map.settings.connector.lineStyle = this.ctrlConnectorLine.value }) as IdLineStyle;
    this.connectorColorPicker = new IdColorPicker('.js-connector-color', this.elem).addEventListener('change', () => { App.map.settings.connector.color = this.connectorColorPicker.color }) as IdColorPicker;

    this.ctrlNoteWidth = new IdRange('.js-note-width', this.elem).addEventListener('input', () => { App.map.settings.note.width = this.ctrlNoteWidth.value });
    this.ctrlNoteHeight = new IdRange('.js-note-height', this.elem).addEventListener('input', () => { App.map.settings.note.height = this.ctrlNoteHeight.value });
    this.ctrlNoteLinewidth = new IdRange('.js-note-linewidth', this.elem).addEventListener('input', () => { App.map.settings.note.lineWidth = this.ctrlNoteLinewidth.value });
    this.ctrlNoteRounding = new IdRange('.js-note-rounding', this.elem).addEventListener('input', () => { App.map.settings.note.rounding = this.ctrlNoteRounding.value });

    this.ctrlNoteShape = new IdShape('.js-note-shape', this.elem).addEventListener('change', () => { App.map.settings.note.shape = this.ctrlNoteShape.value }) as IdShape;

    this.ctrlNoteLine = new IdLineStyle('.js-note-line', this.elem).addEventListener('change', () => { App.map.settings.note.lineStyle = this.ctrlNoteLine.value }) as IdLineStyle;

    this.noteColorPicker = new IdColorPicker('.js-note-color', this.elem).addEventListener('change', () => { this.setNoteColor(this.noteColorPicker.color); }) as IdColorPicker;
    // Find note color buttons:
    var buttons = this.elem.querySelectorAll(`.note-colortype`);
    this.noteColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.noteColorType = popup.type;
      this.noteColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onNoteColorButton(popup); });
    }    

    this.ctrlBlockWidth = new IdRange('.js-block-width', this.elem).addEventListener('input', () => { App.map.settings.block.width = this.ctrlBlockWidth.value });
    this.ctrlBlockHeight = new IdRange('.js-block-height', this.elem).addEventListener('input', () => { App.map.settings.block.height = this.ctrlBlockHeight.value });
    this.ctrlBlockLinewidth = new IdRange('.js-block-linewidth', this.elem).addEventListener('input', () => { App.map.settings.block.lineWidth = this.ctrlBlockLinewidth.value });
    this.ctrlBlockRounding = new IdRange('.js-block-rounding', this.elem).addEventListener('input', () => { App.map.settings.block.rounding = this.ctrlBlockRounding.value });

    this.ctrlBlockShape = new IdShape('.js-block-shape', this.elem).addEventListener('change', () => { App.map.settings.block.shape = this.ctrlBlockShape.value }) as IdShape;

    this.ctrlBlockLine = new IdLineStyle('.js-block-line', this.elem).addEventListener('change', () => { App.map.settings.block.lineStyle = this.ctrlBlockLine.value }) as IdLineStyle;

    this.blockColorPicker = new IdColorPicker('.js-block-color', this.elem).addEventListener('change', () => { this.setBlockColor(this.blockColorPicker.color); }) as IdColorPicker;
    // Find block color buttons:
    var buttons = this.elem.querySelectorAll('.block-colortype');
    this.blockColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.selected) this.blockColorType = popup.type;
      this.blockColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onBlockColorButton(popup); });
    }        
  }

  notify(event: AppEvent, obj: any) {
    if(event == AppEvent.More) {
      if(obj instanceof MapSettings) {
        this.open();
        this.settings = obj;

        // Place settings data in controls:
        this.ctrlGridVisible.checked = App.map.settings.grid.visible;
        this.ctrlGridOrigin.checked = App.map.settings.grid.origin;
        this.ctrlGridSnap.checked = App.map.settings.grid.snap;
        this.ctrlGridSize.value = App.map.settings.grid.size;
        
        this.ctrlRoomWidth.value = App.map.settings.room.width;
        this.ctrlRoomHeight.value = App.map.settings.room.height;
        this.ctrlRoomLinewidth.value = App.map.settings.room.lineWidth;
        this.ctrlRoomRounding.value = App.map.settings.room.rounding;
        this.ctrlRoomDarknessSize.value = App.map.settings.room.darknessSize;
        this.setRoomPickerColor();  

        this.ctrlConnectorLinewidth.value = App.map.settings.connector.lineWidth;
        this.ctrlConnectorStalk.value = App.map.settings.connector.stalk;
        this.ctrlConnectorLabelDistance.value = App.map.settings.connector.labelDistance;
        this.ctrlConnectorArrowSize.value = App.map.settings.connector.arrowSize;
        this.ctrlConnectorCurve.checked = App.map.settings.connector.isCurve;
        this.ctrlConnectorCurveStrength.value = Math.floor(App.map.settings.connector.curveStrength * 10);
        this.connectorColorPicker.color = App.map.settings.connector.color;

        this.ctrlNoteWidth.value = App.map.settings.note.width;
        this.ctrlNoteHeight.value = App.map.settings.note.height;
        this.ctrlNoteLinewidth.value = App.map.settings.note.lineWidth;
        this.ctrlNoteRounding.value = App.map.settings.note.rounding;
        this.setNotePickerColor();  

        this.ctrlBlockWidth.value = App.map.settings.block.width;
        this.ctrlBlockHeight.value = App.map.settings.block.height;
        this.ctrlBlockLinewidth.value = App.map.settings.block.lineWidth;
        this.ctrlBlockRounding.value = App.map.settings.block.rounding;
        this.setBlockPickerColor();  
        
      }
      else {
        this.close();
      }      
    }
  }

  applyTheme(theme: string) {
    new Window('Apply theme', 'Applying a new theme will overwrite all render settings. Proceed?', () => {
      // OK
      switch(theme) {
        case 'obsidian':
          App.map.settings = new ObsidianTheme();
          break;
        case 'hand-drawn':
          App.map.settings = new HandDrawnTheme();
          break;
        case 'diagram':
          App.map.settings = new DiagramTheme();
          break;
        default:
          App.map.settings = new MapSettings();
          break;
      }
      Dispatcher.notify(AppEvent.Refresh, null);
    }, () => {
      // Cancel
    });    
  }

  onMapColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.mapColorButtons.forEach((button) => {
      button.selected = false;
    });

    // Select this button.
    button.selected = true;

    // Make the buttons' data-type the current color type.
    this.mapColorType = button.type;

    // Set colorPicker to color.
    this.setMapPickerColor();
  }  

  setMapPickerColor() {
    if(this.mapColorType == 'background') this.mapColorPicker.color = App.map.settings.grid.background;
    if(this.mapColorType == 'grid') this.mapColorPicker.color = App.map.settings.grid.color;
    Dispatcher.notify(AppEvent.Refresh, null); 
  }  

  setMapColor(color:string) {
    if(this.mapColorType == 'background') App.map.settings.grid.background = color;
    if(this.mapColorType == 'grid') App.map.settings.grid.color = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  }   

  onRoomColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.roomColorButtons.forEach((button) => {
      button.selected = false;
    });

    // Select this button.
    button.selected = true;

    // Make the buttons' data-type the current color type.
    this.roomColorType = button.type;

    // Set colorPicker to color.
    this.setRoomPickerColor();
  }

  setRoomPickerColor() {
    if(this.roomColorType == 'fill') this.roomColorPicker.color = App.map.settings.room.fillColor;
    if(this.roomColorType == 'border') this.roomColorPicker.color = App.map.settings.room.borderColor;
    if(this.roomColorType == 'name') this.roomColorPicker.color = App.map.settings.room.nameColor;
    if(this.roomColorType == 'subtitle') this.roomColorPicker.color = App.map.settings.room.subtitleColor;
    if(this.roomColorType == 'dark') this.roomColorPicker.color = App.map.settings.room.darkColor;
    if(this.roomColorType == 'start') this.roomColorPicker.color = App.map.settings.room.startRoomColor;
    if(this.roomColorType == 'end') this.roomColorPicker.color = App.map.settings.room.endRoomColor;
    Dispatcher.notify(AppEvent.Refresh, null); 
  }

  setRoomColor(color:string) {
    if(this.roomColorType == 'fill') App.map.settings.room.fillColor = color;
    if(this.roomColorType == 'border') App.map.settings.room.borderColor = color;
    if(this.roomColorType == 'name') App.map.settings.room.nameColor = color;
    if(this.roomColorType == 'subtitle') App.map.settings.room.subtitleColor = color;
    if(this.roomColorType == 'dark') App.map.settings.room.darkColor = color;
    if(this.roomColorType == 'start') App.map.settings.room.startRoomColor = color;
    if(this.roomColorType == 'end') App.map.settings.room.endRoomColor = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  } 
  
  onNoteColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.noteColorButtons.forEach((button) => {
      button.selected = false;
    });

    // Select this button.
    button.selected = true;

    // Make the buttons' data-type the current color type.
    this.noteColorType = button.type;

    // Set colorPicker to color.
    this.setNotePickerColor();
  }

  setNotePickerColor() {
    if(this.noteColorType == 'fill') this.noteColorPicker.color = App.map.settings.note.fillColor;
    if(this.noteColorType == 'border') this.noteColorPicker.color = App.map.settings.note.borderColor;
    if(this.noteColorType == 'text') this.noteColorPicker.color = App.map.settings.note.textColor;
    Dispatcher.notify(AppEvent.Refresh, null); 
  }

  setNoteColor(color:string) {
    if(this.noteColorType == 'fill') App.map.settings.note.fillColor = color;
    if(this.noteColorType == 'border') App.map.settings.note.borderColor = color;
    if(this.noteColorType == 'text') App.map.settings.note.textColor = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  }    

  onBlockColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.blockColorButtons.forEach((button) => {
      button.selected = false;
    });

    // Select this button.
    button.selected = true;

    // Make the buttons' data-type the current color type.
    this.blockColorType = button.type;

    // Set colorPicker to color.
    this.setBlockPickerColor();
  }

  setBlockPickerColor() {
    if(this.blockColorType == 'fill') this.blockColorPicker.color = App.map.settings.block.fillColor;
    if(this.blockColorType == 'border') this.blockColorPicker.color = App.map.settings.block.borderColor;
  }

  setBlockColor(color:string) {
    if(this.blockColorType == 'fill') App.map.settings.block.fillColor = color;
    if(this.blockColorType == 'border') App.map.settings.block.borderColor = color;
    Dispatcher.notify(AppEvent.Refresh, null);
  }    
}