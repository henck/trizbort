import { Model } from '../../models/model.js'
import { Subscriber, Dispatcher } from '../../dispatcher.js';
import { AppEvent } from '../../enums/appEvent.js'
import { Room } from '../../models/room.js';
import { App } from '../../app.js';
import { RoomShape, LineStyle, Values } from '../../enums/enums.js';
import { Panel }  from '../panels.js'
import { IdInput, IdRange, IdCheck, IdTextarea, IdPopup, IdColorPicker, IdShape, IdLineStyle } from '../../controls/controls.js';
import { Map } from '../../models/map.js';

export class MapPanel extends Panel implements Subscriber {

  private ctrlTitle: IdInput;
  private ctrlAuthor: IdInput;
  private ctrlDescription: IdTextarea;

  constructor() {
    super('mappanel', Handlebars.templates.mapPanel, { });
    Dispatcher.subscribe(this);

    this.ctrlTitle = new IdInput('.js-title', this.elem).addEventListener('input', () => { App.map.title = this.ctrlTitle.value; App.header.title = this.ctrlTitle.value});
    this.ctrlAuthor = new IdInput('.js-author', this.elem).addEventListener('input', () => { App.map.author = this.ctrlAuthor.value; App.header.content = App.author(this.ctrlAuthor.value); });
    this.ctrlDescription = new IdTextarea('.js-description', this.elem).addEventListener('input', () => { App.map.description = this.ctrlDescription.value; });
  }

  notify(event: AppEvent, obj: any) {
    if(event == AppEvent.More) {
      if(obj instanceof Map) {
        this.open();

        // Place map data in controls:
        this.ctrlTitle.value = App.map.title; 
        this.ctrlAuthor.value = App.map.author;
        this.ctrlDescription.value = App.map.description;
      }
      else {
        this.close();
      }      
    }
  }
}