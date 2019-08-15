import { App } from '../../app'
import { Window } from '../../controls/window'
import { MapXMLLoader } from '../../io/mapXML'
import { Dispatcher } from '../../dispatcher'
import { AppEvent } from '../../enums/enums'
import { MapJSON } from '../../io/mapJSON'
import { Panel } from '../panels';
import { Map } from '../../models/map';
import { Exporter } from '../../exporter';

import { CodeGenerator, TadsGenerator, Inform7Generator, Alan2Generator, Alan3Generator, 
         QuestGenerator, TextadventurejsGenerator } from '../../codegen/CodeGeneration'
import { IdToast } from '../../controls/controls';

export class MenuPanel extends Panel {
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
    this.createMenuItem('#menu-image', () => { this.actionExport(); });
    this.createMenuItem('#menu-map', () => { this.actionMapSettings(); });
    this.createMenuItem('#menu-render', () => { this.actionRenderSettings(); });
    this.createMenuItem('#menu-help', () => { this.actionHelp(); });
    this.createMenuItem('#menu-export');
    this.createMenuItem('#menu-export-tads', () => { this.actionGenerateCode(new TadsGenerator(App.map), 't3'); });
    this.createMenuItem('#menu-export-inform7', () => { this.actionGenerateCode(new Inform7Generator(App.map), 'ni'); });
    this.createMenuItem('#menu-export-alan2', () => { this.actionGenerateCode(new Alan2Generator(App.map), 'a2c'); });
    this.createMenuItem('#menu-export-alan3', () => { this.actionGenerateCode(new Alan3Generator(App.map), 'a3c'); });
    this.createMenuItem('#menu-export-quest', () => { this.actionGenerateCode(new QuestGenerator(App.map), 'aslx'); });
    this.createMenuItem('#menu-export-textadventurejs', () => { this.actionGenerateCode(new TextadventurejsGenerator(App.map), 'txt'); });

    this.inputLoad.addEventListener('change', this.handleInputLoad);
    this.inputImport.addEventListener('change', this.handleInputImport);
  }

  private handleInputLoad = () => {
    this.load(this.inputLoad.files, this.loadMap);
    this.inputLoad.value = null;
  }

  private handleInputImport = () => {
    this.load(this.inputImport.files, this.importMap);
    this.inputImport.value = null;
  }

  private createMenuItem(selector: string, f?: any) {
    let elem: HTMLElement = document.querySelector(selector);
    if(f) elem.addEventListener('click', f);
    elem.addEventListener('click', () => { elem.classList.toggle('open') });
  }

  actionExport() {
    let exporter = new Exporter(App.map);
    exporter.export();
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
    let title = App.map.title;
    if(!title) title = "untitled";
    window.saveAs(blob, `${title}.json`);
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

  actionRenderSettings() {
    Dispatcher.notify(AppEvent.More, App.map.settings);
  }

  actionHelp() {
    IdToast.toast("Keyboard help", "(keyboard help here)");
  }

  actionGenerateCode(generator: CodeGenerator, extension: string) {
    let code:string = generator.generate();
    let blob = new Blob([code], { type: "text/plain; charset:utf-8"});
    let title = App.map.title;
    if(!title) title = "untitled";
    window.saveAs(blob, `${title}.${extension}`);    
  }
}
