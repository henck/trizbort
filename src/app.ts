import { Map } from './models/map.js'
import { View } from './views/view.js'
import { Dispatcher } from './dispatcher.js'
import { AppEvent, MouseMode, Values } from './enums/enums.js'
import { Editor } from './editor.js'
import { Tabs, IdToast } from './controls/controls.js'
import { BlockPopup, ConnectorPopup, NotePopup, RoomPopup } from './popups/popups.js'
import { BlockPanel, ConnectorPanel, RenderPanel, MapPanel, MenuPanel, NotePanel, RoomPanel, ToolPanel } from './panels/panels.js'

import { MapJSON } from './io/mapJSON.js'
import { Selection } from './selection.js'

export class App {
  // - App holds the current map.
  // - App holds the current zoom and view center
  //   so that GUI components may access and change them globally.
  // - App also manages the selection of views.
  static map: Map = new Map();
  static canvas: any;
  static zoom: number = 1;
  static centerX: number = 0;
  static centerY: number = 0;
  static mouseMode: MouseMode = MouseMode.None;
  static undoStack: Array<string> = new Array<string>();
  static selection: Selection; 

  static initialize() {
    App.canvas = document.getElementById('canvas');
    App.selection = new Selection();
    
    // Intialize GUI components:
    App.createComponents();

    Tabs.initialize();
  }

  // Create all GUI components:
  static createComponents() {
    new Editor();
    new RenderPanel();
    new MapPanel();
    new MenuPanel();
    new NotePanel();
    new NotePopup();
    new ToolPanel();
    new BlockPanel();
    new RoomPopup();
    new RoomPanel();
    new BlockPopup();    
    new ConnectorPanel();
    new ConnectorPopup();
    let toast = new IdToast('#toast');
    toast.setText("Welcome to Trizbort.io! To start building your map, click the <b>room icon</b> in the left-hand bar and click anywhere on the map to place your first room.");
  }  

  static pushUndo() {
    this.undoStack.push(MapJSON.save(this.map));
    if(this.undoStack.length > 100) {
      this.undoStack.shift();
    }
  }

  static undo() {
    if(this.undoStack.length == 0) return;
    let json = this.undoStack.pop();
    this.map = MapJSON.load(json);
    Dispatcher.notify(AppEvent.Refresh, null);
  }
}

