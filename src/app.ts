import { Map } from './models/map.js'
import { View } from './views/view.js'
import { Dispatcher } from './dispatcher.js'
import { AppEvent, MouseMode, Values } from './enums/enums.js'
import { Editor } from './editor.js'
import { Tabs } from './controls/controls.js'
import { ConnectorPopup, NotePopup, RoomPopup } from './popups/popups.js'
import { ConnectorPanel, MapPanel, MenuPanel, NotePanel, RoomPanel, ToolPanel } from './panels/panels.js'
import { MapJSON } from './io/mapJSON.js'
import { Selection } from './selection.js'
import { BlockPopup } from './popups/blockPopup/blockPopup.js';
import { BlockPanel } from './panels/blockPanel/blockPanel.js';

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
    let editor = new Editor();
    let connectorPanel = new ConnectorPanel();
    let connectorPopup = new ConnectorPopup;
    let mapPanel = new MapPanel();
    let menuPanel = new MenuPanel();
    let notePanel = new NotePanel();
    let notePopup = new NotePopup();
    let toolPanel = new ToolPanel();
    let blockPanel = new BlockPanel();
    let roomPopup = new RoomPopup();
    let roomPanel = new RoomPanel();
    let blockPopup = new BlockPopup();

    Values.BITMAP_ASSETS.forEach((asset) => {
      let img = new Image();
      img.src = `assets/${asset}.jpg`;
    });
    
    Tabs.initialize();
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
    Dispatcher.notify(AppEvent.Load, null);
  }
}

