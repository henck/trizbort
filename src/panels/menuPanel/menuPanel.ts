import { App } from '../../app.js'
import { Window } from '../../controls/window.js'
import { MapXMLLoader } from '../../io/mapXML.js'
import { Dispatcher } from '../../dispatcher.js'
import { AppEvent } from '../../enums/enums.js'
import { MapJSON } from '../../io/mapJSON.js'
import { Panel } from '../panels.js';
import { MapSettings } from '../../models/mapSettings.js';
import { Map } from '../../models/map.js';
import { TadsGenerator } from '../../codegen/TadsGenerator.js';
import { Inform7Generator } from '../../codegen/Inform7Generator.js';

export class MenuPanel extends Panel {
  private loader: any;
  private inputLoad: HTMLInputElement;
  private inputImport: HTMLInputElement;

  constructor() {
    super('menupanel', Handlebars.templates.menuPanel, {});

    let btnMenu = document.querySelector('#menu');
    btnMenu.addEventListener('click', () => {
      this.toggle();
    });

    this.inputLoad = document.getElementById('inputLoad') as HTMLInputElement;
    this.inputImport = document.getElementById('inputImport') as HTMLInputElement;

    this.createMenuItem('#menu-new', () => { this.actionNewMap(); });
    this.createMenuItem('#menu-load', () => { this.actionLoadMap(); });
    this.createMenuItem('#menu-save', () => { this.actionSaveMap(); });
    this.createMenuItem('#menu-import', () => { this.actionImportMap(); });
    this.createMenuItem('#menu-map', () => { this.actionMapSettings(); });
    this.createMenuItem('#menu-export');
    this.createMenuItem('#menu-export-tads', () => { this.actionExportTads(); });
    this.createMenuItem('#menu-export-inform7', () => { this.actionExportInform7(); });

    this.inputLoad.addEventListener('change', () => { this.load(this.inputLoad.files, this.loadMap); });
    this.inputImport.addEventListener('change', () => { this.load(this.inputImport.files, this.importMap); });
  }

  private createMenuItem(selector: string, f?: any) {
    let elem: HTMLElement = document.querySelector(selector);
    if(f) elem.addEventListener('click', f);
    elem.addEventListener('click', () => { elem.classList.toggle('open') });
  }

  actionNewMap() {
    new Window('New map', 'This will erase all editor contents. Proceed?', () => {
      // OK
      App.map = new Map();
      Dispatcher.notify(AppEvent.Load, null);
    }, () => {
      // Cancel
    });
  }

  actionLoadMap() {
    this.inputLoad.click();
  }

  actionSaveMap() {
    let json:string = MapJSON.save(App.map);
    let blob = new Blob([json], { type: "text/plain; charset:utf-8"});
    window.saveAs(blob, 'map.json');
  }

  actionImportMap() {
    this.inputImport.click();
  }

  load(files: FileList, callback: Function) {
    // Are there no files? Then abort.
    if(files.length == 0) return;
    // Work only on the first file.
    let file: File = files[0];
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      callback(reader.result);
    });
    reader.readAsText(file);
  }  

  loadMap(text: string) {
    let map = null;
    try {
      map = MapJSON.load(text);
    }
    catch {
      new Window(
        'Map loading error', 
        'Unfortunately, an error occurred and map loading could not proceed. Perhaps the map file is in the wrong format?',
        true,
        false);
      return;
    }
    App.map = map;
    // Broadcast that we've loaded a new map:
    Dispatcher.notify(AppEvent.Load, null);
  }

  importMap(text: string) {
    let map = null;
    try {
      map = MapXMLLoader.load(text);
    }
    catch {
      new Window(
        'Map import error', 
        'Unfortunately, an error occurred and map import could not proceed. Perhaps the map file is in the wrong format?',
        true,
        false);
      return;      
    }
    
    App.map = map;
    // Broadcast that we've loaded a new map:
    Dispatcher.notify(AppEvent.Load, null);
  }

  actionMapSettings() {
    Dispatcher.notify(AppEvent.More, App.map);
  }

  actionExportTads() {
    let generator = new TadsGenerator(App.map);
    generator.generate();
  }

  actionExportInform7() {
    let generator = new Inform7Generator(App.map);
    generator.generate();
  }  

}
