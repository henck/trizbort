import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Room } from '../../models/room.js';
import { App } from '../../app.js';
import { RoomShape, LineStyle, Values } from '../../enums/enums.js';
import { Panel }  from '../panels.js'
import { IdInput, IdRange, IdCheck, IdTextarea, IdPopup, IdColorPicker } from '../../controls/controls.js';
import { Map } from '../../models/map.js';

export class MapPanel extends Panel implements Subscriber {

  private ctrlTitle: IdInput;
  private ctrlAuthor: IdInput;
  private ctrlDescription: IdTextarea;
  private ctrlGridVisible: IdCheck;
  private ctrlGridOrigin: IdCheck;
  private ctrlGridSnap: IdCheck;
  private ctrlGridSize: IdRange;

  private ctrlRoomWidth: IdRange;
  private ctrlRoomHeight: IdRange;
  private ctrlRoomLinewidth: IdRange;
  private ctrlRoomRounding: IdRange;
  private ctrlRoomDarknessSize: IdRange;
  private roomColorPicker: IdColorPicker;
  private roomColorType: string;
  private roomColorButtons: Array<IdPopup>;

  private ctrlConnectorLinewidth: IdRange;
  private ctrlConnectorStalk: IdRange;
  private ctrlConnectorLabelDistance: IdRange;
  private ctrlConnectorArrowSize: IdRange;
  private ctrlConnectorCurve: IdCheck;
  private ctrlConnectorCurveStrength: IdRange;
  private connectorColorPicker: IdColorPicker;

  private ctrlNoteWidth: IdRange;
  private ctrlNoteHeight: IdRange;
  private ctrlNoteLinewidth: IdRange;
  private ctrlNoteRounding: IdRange;
  private noteColorPicker: IdColorPicker;
  private noteColorType: string;
  private noteColorButtons: Array<IdPopup>;

  private ctrlBlockWidth: IdRange;
  private ctrlBlockHeight: IdRange;
  private ctrlBlockLinewidth: IdRange;
  private ctrlBlockRounding: IdRange;
  private blockColorPicker: IdColorPicker;
  private blockColorType: string;
  private blockColorButtons: Array<IdPopup>;  
  

  constructor() {
    super('mappanel', Handlebars.templates.mapPanel, { assets: Values.BITMAP_ASSETS });
    Dispatcher.subscribe(this);

    this.ctrlTitle = new IdInput('#mappanel .js-map-title').addEventListener('input', () => { App.map.title = this.ctrlTitle.value; });
    this.ctrlAuthor = new IdInput('#mappanel .js-map-author').addEventListener('input', () => { App.map.author = this.ctrlAuthor.value; });
    this.ctrlDescription = new IdTextarea('#mappanel .js-map-description').addEventListener('input', () => { App.map.description = this.ctrlDescription.value; });
    this.ctrlGridVisible = new IdCheck('#mappanel .js-map-grid-visible').addEventListener('input', () => { App.map.settings.grid.visible = this.ctrlGridVisible.checked; })
    this.ctrlGridOrigin = new IdCheck('#mappanel .js-map-grid-origin').addEventListener('input', () => { App.map.settings.grid.origin = this.ctrlGridOrigin.checked; })
    this.ctrlGridSnap = new IdCheck('#mappanel .js-map-grid-snap').addEventListener('input', () => { App.map.settings.grid.snap = this.ctrlGridSnap.checked; })
    this.ctrlGridSize = new IdRange('#mappanel .js-map-grid-size').addEventListener('input', () => { App.map.settings.grid.size = this.ctrlGridSize.value; });

    // Map backgrounds
    new IdPopup('#mappanel .js-map-bg-none').addEventListener('click', () => { App.map.settings.background = 'none'; } );
    Values.BITMAP_ASSETS.forEach((asset) => {
      new IdPopup(`#mappanel .js-map-bg-${asset}`).addEventListener('click', () => { App.map.settings.background = asset; } );
    });

    this.ctrlRoomWidth = new IdRange('#mappanel .js-map-room-width').addEventListener('input', () => { App.map.settings.room.width = this.ctrlRoomWidth.value; });
    this.ctrlRoomHeight = new IdRange('#mappanel .js-map-room-height').addEventListener('input', () => { App.map.settings.room.height = this.ctrlRoomHeight.value; });
    this.ctrlRoomLinewidth = new IdRange('#mappanel .js-map-room-linewidth').addEventListener('input', () => { App.map.settings.room.lineWidth = this.ctrlRoomLinewidth.value; });
    this.ctrlRoomRounding = new IdRange('#mappanel .js-map-room-rounding').addEventListener('input', () => { App.map.settings.room.rounding = this.ctrlRoomRounding.value; });
    this.ctrlRoomDarknessSize = new IdRange('#mappanel .js-map-room-darkness-size').addEventListener('input', () => { App.map.settings.room.darknessSize = this.ctrlRoomDarknessSize.value; });

    new IdPopup('#mappanel .js-room-shape-rectangle').addEventListener('click', () => { App.map.settings.room.shape = RoomShape.Rectangle; });
    new IdPopup('#mappanel .js-room-shape-ellipse').addEventListener('click', () => { App.map.settings.room.shape = RoomShape.Ellipse; });
    new IdPopup('#mappanel .js-room-shape-octagon').addEventListener('click', () => { App.map.settings.room.shape = RoomShape.Octagon; });

    new IdPopup('#mappanel .js-room-linestyle-solid').addEventListener('click', () => { App.map.settings.room.lineStyle = LineStyle.Solid; });
    new IdPopup('#mappanel .js-room-linestyle-dash').addEventListener('click', () => { App.map.settings.room.lineStyle = LineStyle.Dash; });
    new IdPopup('#mappanel .js-room-linestyle-dashdot').addEventListener('click', () => { App.map.settings.room.lineStyle = LineStyle.DashDot; });
    new IdPopup('#mappanel .js-room-linestyle-dashdotdot').addEventListener('click', () => { App.map.settings.room.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#mappanel .js-room-linestyle-dot').addEventListener('click', () => { App.map.settings.room.lineStyle = LineStyle.Dot; });
    new IdPopup('#mappanel .js-room-linestyle-none').addEventListener('click', () => { App.map.settings.room.lineStyle = LineStyle.None; });    

    this.roomColorPicker = new IdColorPicker('#mappanel .js-map-room-color').addEventListener('change', () => { this.setRoomColor(this.roomColorPicker.color); });
    // Find room color buttons:
    var buttons = document.querySelectorAll(`#mappanel .room-colortype`);
    this.roomColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.elem.classList.contains('selected')) this.roomColorType = popup.elem.dataset.type;
      this.roomColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onRoomColorButton(popup); });
    }

    this.ctrlConnectorLinewidth = new IdRange('#mappanel .js-map-connector-linewidth').addEventListener('input', () => { App.map.settings.connector.lineWidth = this.ctrlConnectorLinewidth.value; });
    this.ctrlConnectorStalk = new IdRange('#mappanel .js-map-connector-stalk').addEventListener('input', () => { App.map.settings.connector.stalk = this.ctrlConnectorStalk.value; });
    this.ctrlConnectorLabelDistance = new IdRange('#mappanel .js-map-connector-label-distance').addEventListener('input', () => { App.map.settings.connector.labelDistance = this.ctrlConnectorLabelDistance.value; });
    this.ctrlConnectorArrowSize = new IdRange('#mappanel .js-map-connector-arrow-size').addEventListener('input', () => { App.map.settings.connector.arrowSize = this.ctrlConnectorArrowSize.value; });
    this.ctrlConnectorCurve = new IdCheck('#mappanel .js-map-connector-curve').addEventListener('input', () => { App.map.settings.connector.isCurve = this.ctrlConnectorCurve.checked; })
    this.ctrlConnectorCurveStrength = new IdRange('#mappanel .js-map-connector-curve-strength').addEventListener('input', () => { App.map.settings.connector.curveStrength = this.ctrlConnectorCurveStrength.value / 10; });
    new IdPopup('#mappanel .js-connector-linestyle-solid').addEventListener('click', () => { App.map.settings.connector.lineStyle = LineStyle.Solid; });
    new IdPopup('#mappanel .js-connector-linestyle-dash').addEventListener('click', () => { App.map.settings.connector.lineStyle = LineStyle.Dash; });
    new IdPopup('#mappanel .js-connector-linestyle-dashdot').addEventListener('click', () => { App.map.settings.connector.lineStyle = LineStyle.DashDot; });
    new IdPopup('#mappanel .js-connector-linestyle-dashdotdot').addEventListener('click', () => { App.map.settings.connector.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#mappanel .js-connector-linestyle-dot').addEventListener('click', () => { App.map.settings.connector.lineStyle = LineStyle.Dot; });    
    this.connectorColorPicker = new IdColorPicker('#mappanel .js-map-connector-color').addEventListener('change', () => { App.map.settings.connector.color = this.connectorColorPicker.color; });

    this.ctrlNoteWidth = new IdRange('#mappanel .js-map-note-width').addEventListener('input', () => { App.map.settings.note.width = this.ctrlNoteWidth.value; });
    this.ctrlNoteHeight = new IdRange('#mappanel .js-map-note-height').addEventListener('input', () => { App.map.settings.note.height = this.ctrlNoteHeight.value; });
    this.ctrlNoteLinewidth = new IdRange('#mappanel .js-map-note-linewidth').addEventListener('input', () => { App.map.settings.note.lineWidth = this.ctrlNoteLinewidth.value; });
    this.ctrlNoteRounding = new IdRange('#mappanel .js-map-note-rounding').addEventListener('input', () => { App.map.settings.note.rounding = this.ctrlNoteRounding.value; });

    new IdPopup('#mappanel .js-note-shape-rectangle').addEventListener('click', () => { App.map.settings.note.shape = RoomShape.Rectangle; });
    new IdPopup('#mappanel .js-note-shape-ellipse').addEventListener('click', () => { App.map.settings.note.shape = RoomShape.Ellipse; });
    new IdPopup('#mappanel .js-note-shape-octagon').addEventListener('click', () => { App.map.settings.note.shape = RoomShape.Octagon; });

    new IdPopup('#mappanel .js-note-linestyle-solid').addEventListener('click', () => { App.map.settings.note.lineStyle = LineStyle.Solid; });
    new IdPopup('#mappanel .js-note-linestyle-dash').addEventListener('click', () => { App.map.settings.note.lineStyle = LineStyle.Dash; });
    new IdPopup('#mappanel .js-note-linestyle-dashdot').addEventListener('click', () => { App.map.settings.note.lineStyle = LineStyle.DashDot; });
    new IdPopup('#mappanel .js-note-linestyle-dashdotdot').addEventListener('click', () => { App.map.settings.note.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#mappanel .js-note-linestyle-dot').addEventListener('click', () => { App.map.settings.note.lineStyle = LineStyle.Dot; });
    new IdPopup('#mappanel .js-note-linestyle-none').addEventListener('click', () => { App.map.settings.note.lineStyle = LineStyle.None; });    

    this.noteColorPicker = new IdColorPicker('#mappanel .js-map-note-color').addEventListener('change', () => { this.setNoteColor(this.noteColorPicker.color); });
    // Find note color buttons:
    var buttons = document.querySelectorAll(`#mappanel .note-colortype`);
    this.noteColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.elem.classList.contains('selected')) this.noteColorType = popup.elem.dataset.type;
      this.noteColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onNoteColorButton(popup); });
    }    

    this.ctrlBlockWidth = new IdRange('#mappanel .js-map-block-width').addEventListener('input', () => { App.map.settings.block.width = this.ctrlBlockWidth.value; });
    this.ctrlBlockHeight = new IdRange('#mappanel .js-map-block-height').addEventListener('input', () => { App.map.settings.block.height = this.ctrlBlockHeight.value; });
    this.ctrlBlockLinewidth = new IdRange('#mappanel .js-map-block-linewidth').addEventListener('input', () => { App.map.settings.block.lineWidth = this.ctrlBlockLinewidth.value; });
    this.ctrlBlockRounding = new IdRange('#mappanel .js-map-block-rounding').addEventListener('input', () => { App.map.settings.block.rounding = this.ctrlBlockRounding.value; });

    new IdPopup('#mappanel .js-block-shape-rectangle').addEventListener('click', () => { App.map.settings.block.shape = RoomShape.Rectangle; });
    new IdPopup('#mappanel .js-block-shape-ellipse').addEventListener('click', () => { App.map.settings.block.shape = RoomShape.Ellipse; });
    new IdPopup('#mappanel .js-block-shape-octagon').addEventListener('click', () => { App.map.settings.block.shape = RoomShape.Octagon; });

    new IdPopup('#mappanel .js-block-linestyle-solid').addEventListener('click', () => { App.map.settings.block.lineStyle = LineStyle.Solid; });
    new IdPopup('#mappanel .js-block-linestyle-dash').addEventListener('click', () => { App.map.settings.block.lineStyle = LineStyle.Dash; });
    new IdPopup('#mappanel .js-block-linestyle-dashdot').addEventListener('click', () => { App.map.settings.block.lineStyle = LineStyle.DashDot; });
    new IdPopup('#mappanel .js-block-linestyle-dashdotdot').addEventListener('click', () => { App.map.settings.block.lineStyle = LineStyle.DashDotDot; });
    new IdPopup('#mappanel .js-block-linestyle-dot').addEventListener('click', () => { App.map.settings.block.lineStyle = LineStyle.Dot; });
    new IdPopup('#mappanel .js-block-linestyle-none').addEventListener('click', () => { App.map.settings.block.lineStyle = LineStyle.None; });    

    this.blockColorPicker = new IdColorPicker('#mappanel .js-map-block-color').addEventListener('change', () => { this.setBlockColor(this.blockColorPicker.color); });
    // Find block color buttons:
    var buttons = document.querySelectorAll(`#mappanel .block-colortype`);
    this.blockColorButtons = new Array<IdPopup>();
    for(let i = 0; i < buttons.length; i++) {
      let popup = new IdPopup(buttons[i] as HTMLElement);
      if(popup.elem.classList.contains('selected')) this.blockColorType = popup.elem.dataset.type;
      this.blockColorButtons.push(popup);
      buttons[i].addEventListener('click', () => { this.onBlockColorButton(popup); });
    }        
  }

  notify(event: AppEvent, obj: any) {
    if(event == AppEvent.More) {
      if(obj instanceof Map) {
        this.open();

        // Place map data in controls:
        this.ctrlTitle.value = App.map.title; 
        this.ctrlAuthor.value = App.map.author;
        this.ctrlDescription.value = App.map.description;

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

  onRoomColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.roomColorButtons.forEach((button) => {
      button.elem.classList.remove('selected');
    });

    // Select this button.
    button.elem.classList.add('selected');

    // Make the buttons' data-type the current color type.
    this.roomColorType = button.elem.dataset.type;

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
  }

  setRoomColor(color:string) {
    if(this.roomColorType == 'fill') App.map.settings.room.fillColor = color;
    if(this.roomColorType == 'border') App.map.settings.room.borderColor = color;
    if(this.roomColorType == 'name') App.map.settings.room.nameColor = color;
    if(this.roomColorType == 'subtitle') App.map.settings.room.subtitleColor = color;
    if(this.roomColorType == 'dark') App.map.settings.room.darkColor = color;
    if(this.roomColorType == 'start') App.map.settings.room.startRoomColor = color;
    if(this.roomColorType == 'end') App.map.settings.room.endRoomColor = color;
  } 
  
  onNoteColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.noteColorButtons.forEach((button) => {
      button.elem.classList.remove('selected');
    });

    // Select this button.
    button.elem.classList.add('selected');

    // Make the buttons' data-type the current color type.
    this.noteColorType = button.elem.dataset.type;

    // Set colorPicker to color.
    this.setNotePickerColor();
  }

  setNotePickerColor() {
    if(this.noteColorType == 'fill') this.noteColorPicker.color = App.map.settings.note.fillColor;
    if(this.noteColorType == 'border') this.noteColorPicker.color = App.map.settings.note.borderColor;
    if(this.noteColorType == 'text') this.noteColorPicker.color = App.map.settings.note.textColor;
  }

  setNoteColor(color:string) {
    if(this.noteColorType == 'fill') App.map.settings.note.fillColor = color;
    if(this.noteColorType == 'border') App.map.settings.note.borderColor = color;
    if(this.noteColorType == 'text') App.map.settings.note.textColor = color;
  }    

  onBlockColorButton(button: IdPopup) {
    // Unselect all buttons.
    this.blockColorButtons.forEach((button) => {
      button.elem.classList.remove('selected');
    });

    // Select this button.
    button.elem.classList.add('selected');

    // Make the buttons' data-type the current color type.
    this.blockColorType = button.elem.dataset.type;

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
  }    
}