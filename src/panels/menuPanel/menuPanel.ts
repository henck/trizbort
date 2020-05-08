import { App } from '../../app'
import { Window } from '../../controls/window'
import { MapXMLLoader } from '../../io/mapXML'
import { Dispatcher } from '../../dispatcher'
import { AppEvent } from '../../enums'
import { MapJSON } from '../../io/mapJSON'
import { Panel } from '../panels';
import { Map } from '../../models';
import { Exporter } from '../../exporter';

import { CodeGenerator, TadsGenerator, Inform7Generator, Alan2Generator, Alan3Generator, 
         QuestGenerator, TextadventurejsGenerator, YamlGenerator, ZilGenerator } from '../../codegen/CodeGeneration'
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

    this.createMenuGroup('#group-file');
    this.createMenuItem('#menu-new', () => { this.actionNewMap(); });
    this.createMenuItem('#menu-load', () => { this.actionLoadMap(); });
    this.createMenuItem('#menu-save', () => { this.actionSaveMap(); });
    this.createMenuItem('#menu-import', () => { this.actionImportMap(); });
    this.createMenuItem('#menu-image', () => { this.actionExport(); });

    this.createMenuGroup('#group-settings');
    this.createMenuItem('#menu-map', () => { this.actionMapSettings(); });
    this.createMenuItem('#menu-render', () => { this.actionRenderSettings(); });

    this.createMenuGroup('#group-export');
    this.createMenuItem('#menu-export-tads', () => { this.actionGenerateCode(new TadsGenerator(App.map), 't3'); });
    this.createMenuItem('#menu-export-inform7', () => { this.actionGenerateCode(new Inform7Generator(App.map), 'ni'); });
    this.createMenuItem('#menu-export-alan2', () => { this.actionGenerateCode(new Alan2Generator(App.map), 'a2c'); });
    this.createMenuItem('#menu-export-alan3', () => { this.actionGenerateCode(new Alan3Generator(App.map), 'a3c'); });
    this.createMenuItem('#menu-export-quest', () => { this.actionGenerateCode(new QuestGenerator(App.map), 'aslx'); });
    this.createMenuItem('#menu-export-textadventurejs', () => { this.actionGenerateCode(new TextadventurejsGenerator(App.map), 'js'); });
    this.createMenuItem('#menu-export-yaml', () => { this.actionGenerateCode(new YamlGenerator(App.map), 'yaml'); });
    this.createMenuItem('#menu-export-zil', () => { this.actionGenerateCode(new ZilGenerator(App.map), 'zil'); });

    this.createMenuGroup('#group-help');
    this.createMenuItem('#menu-help', () => { this.actionHelp(); });

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

  private createMenuGroup(selector: string) {
    let elem: HTMLElement = document.querySelector(selector);
    elem.addEventListener('click', (e: Event) => {
      // Hide all group nodes:
      let nodes = this.elem.querySelectorAll(".menugroup > div");
      for (let i = 0; i < nodes.length; i++) {
        (nodes[i] as HTMLElement).style.display = 'none';
      } 
      // Show node for clicked group:
      let node:HTMLElement = elem.parentElement.querySelector(`div`);
      node.style.display = 'block';
    });
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
    catch (error) {
      console.error(error);
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
    IdToast.toast("Keyboard help", `
    <table>
      <tbody>
        <tr>
          <th>
            <h4>Selection</h4>
            <table>
              <tbody>
                <tr>
                  <td><kbd>Ctrl</kbd><kbd>A</kbd></td>
                  <td>Select all</td>
                </tr>
                <tr>
                  <td><kbd>Esc</kbd></td>
                  <td>Unselect all</td>
                </tr>        
                <tr>
                  <td><kbd>Ctrl</kbd><kbd>C</kbd></td>
                  <td>Copy selection</td>
                </tr>        
                <tr>
                  <td><kbd>Ctrl</kbd><kbd>V</kbd></td>
                  <td>Paste selection</td>
                </tr>        
                <tr>
                  <td><kbd>Del</kbd></td>
                  <td>Delete current selection</td>
                </tr>
                <tr>
                  <td><kbd>Ctrl</kbd><kbd>Z</kbd></td>
                  <td>Undo</td>
                </tr>
                <tr>
                  <td><kbd>Enter</kbd> or <kbd>F2</kbd></td>
                  <td>Open detail panel</td>
                </tr>
              </tbody>
            </table>   
          </th>
          <th>
            <h4>Navigation</h4>
            <table>
              <tbody>
                <tr>
                  <td><svg><use xlink:href="dist/icons.svg#arrows"></use></svg></td>
                  <td>Pan map</td>
                </tr>
                <tr>
                  <td><kbd>+</kbd></td>
                  <td>Zoom in</td>
                </tr>        
                <tr>
                  <td><kbd>-</kbd></td>
                  <td>Zoom out</td>
                </tr>        
                <tr>
                  <td><kbd>0</kbd></td>
                  <td>Zoom 100%</td>
                </tr>        
                <tr>
                  <td><kbd>Ins</kbd></td>
                  <td>Center map</td>
                </tr>
                <tr>
                  <td><kbd>Shift</kbd><kbd>Enter</kbd></td>
                  <td>Center map</td>
                </tr>
              </tbody>
            </table>   
          </th>
          <th>
            <h4>Construction</h4>
            <table>
              <tbody>
                <tr>
                  <td><kbd>Shift</kbd> <svg><use xlink:href="dist/icons.svg#arrows"></use></svg></td>
                  <td>Create room in dir</td>
                </tr>
                <tr>
                  <td><kbd>R</kbd></td>
                  <td>Add room</td>
                </tr>        
                <tr>
                  <td><kbd>N</kbd></td>
                  <td>Add note</td>
                </tr>        
                <tr>
                  <td><kbd>B</kbd></td>
                  <td>Add block</td>
                </tr>        
                <tr>
                  <td><kbd>A</kbd></td>
                  <td>Toggle one-way</td>
                </tr>
                <tr>
                  <td><kbd>V</kbd></td>
                  <td>Reverse connector</td>
                </tr>
                <tr>
                  <td><kbd>K</kbd></td>
                  <td>Toggle darkness</td>
                </tr>
              </tbody>
            </table>   
          </th>          
        </tr>
      </tbody>
    </table>
 
 
    `, true);
  }

  actionGenerateCode(generator: CodeGenerator, extension: string) {
    let code:string = generator.generate();
    let blob = new Blob([code], { type: "text/plain; charset:utf-8"});
    let title = App.map.title;
    if(!title) title = "untitled";
    window.saveAs(blob, `${title}.${extension}`);    
  }
}
