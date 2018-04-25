import { App } from './app.js'
import { Dispatcher, Subscriber } from './dispatcher.js'
import { AppEvent, MouseMode, ConnectorHandle, Direction, Values } from './enums/enums.js'
import { Model } from './models/model.js'
import { Grid } from "./grid.js"
import { Map } from "./models/map.js"
import { Room } from "./models/room.js"
import { Connector } from "./models/connector.js"
import { View } from "./views/view.js"
import { RoomView }  from "./views/roomView.js"
import { ConnectorView }  from "./views/connectorView.js"
import { Note } from './models/note.js';
import { NoteView } from './views/noteView.js';
import { BoxView } from './views/boxView.js';
import { Box } from './models/box.js';
import { ViewFactory } from './views/viewFactory.js';
import { Canvas } from './drawing/canvas.js';
import { Block } from './models/block.js';
import { BlockView } from './views/blockView.js';
import { ConnectorType } from './enums/connectorType.js';
import { ZorkMap } from './maps/zorkMap.js';
import { MapJSON } from './io/mapJSON.js';

export class Editor implements Subscriber {
  private htmlCanvas: HTMLCanvasElement;
  private canvas: Canvas;
  private grid: Grid = new Grid();
  private views: View[];
  private hover: View = null;
  private hitTestHtmlCanvas: HTMLCanvasElement;
  private hitTestCanvas: Canvas;
  private roomHandle: Direction;
  private connectorHandle: ConnectorHandle;
  private copy: Array<Model> = new Array<Model>();
  private ctrlZoom: HTMLInputElement;

  // Scroll/drag:
  private mouseX: number = -100;
  private mouseY: number = -100;
  private selectPosX: number;
  private selectPosY: number;
  private scrollOffsetX: number;
  private scrollOffsetY: number;
  private scrollOriginX: number;
  private scrollOriginY: number;
  private dragOriginX: number = 0
  private dragOriginY: number = 0;

  constructor() {
    Dispatcher.subscribe(this);

    // Access the main canvas:
    this.htmlCanvas = <HTMLCanvasElement> document.getElementById('canvas');
    this.canvas = new Canvas(this.htmlCanvas.getContext('2d'));

    // Access the 1x1 hittest canvas:
    this.hitTestHtmlCanvas = <HTMLCanvasElement> document.getElementById('hittest');
    this.hitTestCanvas = new Canvas(this.hitTestHtmlCanvas.getContext('2d'));

    this.views = new Array(); 

    window.addEventListener('resize', () => { this.resize(); } );    
    this.htmlCanvas.addEventListener('mousedown', (e:MouseEvent) => { this.canvasMouseDown(e) } );
    this.htmlCanvas.addEventListener('mouseup', (e:MouseEvent) => { this.canvasMouseUp(e) } );
    this.htmlCanvas.addEventListener('mousemove', (e:MouseEvent) => { this.canvasMouseMove(e) } );
    this.htmlCanvas.addEventListener('wheel', (e:MouseWheelEvent) => { this.canvasMouseWheel(e) } );    
    this.htmlCanvas.addEventListener('dblclick', (e:MouseEvent) => { this.canvasMouseDoubleClick(e)} );

    document.getElementById('control-center').addEventListener('click', () => { this.cmdCenterView(); });
    document.getElementById('control-zoomin').addEventListener('click', () => { this.cmdZoomIn(); });
    document.getElementById('control-zoomout').addEventListener('click', () => { this.cmdZoomOut(); });
    this.ctrlZoom = <HTMLInputElement> document.getElementById('control-zoom');
    this.ctrlZoom.addEventListener('change', () => { this.cmdZoom(); });
    this.updateZoomPercentage();
    document.getElementById('canvas').addEventListener('keyup', (e: KeyboardEvent) => { this.keyUp(e); });

    this.resize();

    // Create a test map:
    this.makeTestMap();    

    window.requestAnimationFrame(this.render);
  }

  keyUp(e: KeyboardEvent) {
    console.log("Key up: ", e);
    if(!e.ctrlKey && !e.shiftKey) {
      switch(e.key) {
        case 'a': this.cmdToggleOneWay(); break;
        case 'v': this.cmdReverseConnector(); break;
        case 'k': this.cmdToggleDarkness(); break;
        case 'r': this.cmdAddRoom(); break;
        case 'n': this.cmdAddNote(); break;
        case 'b': this.cmdAddBlock(); break;
        case 'Escape': App.selection.unselectAll(); break;
        case 'Delete': this.cmdDelete(); break;
        case 'Insert': this.cmdCenterView(); break;
        case '+': this.cmdZoomIn(); break;
        case '-': this.cmdZoomOut(); break;
        case '0': this.cmdZoomNormal(); break;
        case 'Enter': // Enter/F2 calls up room/connector/note panel
        case 'F2':
          this.cmdShowPanel();
          break;
        case 'ArrowRight': this.moveCenter(1, 0); break;
        case 'ArrowLeft':  this.moveCenter(-1, 0); break;
        case 'ArrowUp':    this.moveCenter(0, -1); break;
        case 'ArrowDown':  this.moveCenter(0, 1); break;
        case 'PageUp':     this.moveCenter(1, -1); break;
        case 'PageDown':   this.moveCenter(1, 1); break;
        case 'End':        this.moveCenter(-1, 1); break;
        case 'Home':       this.moveCenter(-1, -1); break;          
      }
    }

    if(e.ctrlKey) {
      switch(e.key) {
        case 'a': this.cmdSelectAll(); break;
        case 'c': this.cmdCopySelection(); break;
        case 'v': this.cmdPaste(); break;
        case 'z':  
          App.undo();
          break;
      }
    }

    if(e.shiftKey) {
      switch(e.key) {
        // Arrow keys create new room in direction, if there isn't a room connection
        // in that direction already.
        case 'ArrowRight': this.cmdNewRoomInDir(Direction.E); break;
        case 'ArrowLeft':  this.cmdNewRoomInDir(Direction.W); break;
        case 'ArrowUp':    this.cmdNewRoomInDir(Direction.N); break;
        case 'ArrowDown':  this.cmdNewRoomInDir(Direction.S); break;
        case 'PageUp':     this.cmdNewRoomInDir(Direction.NE); break;
        case 'PageDown':   this.cmdNewRoomInDir(Direction.SE); break;
        case 'End':        this.cmdNewRoomInDir(Direction.SW); break;
        case 'Home':       this.cmdNewRoomInDir(Direction.NW); break;        
      }
    }

    e.preventDefault();
  }

  notify(event: AppEvent, model: Model) {
    if(event == AppEvent.Delete) {
      App.selection.clear();
      for(let i = 0; i < this.views.length; i++) {
        if(this.views[i].getModel() == model) {
          this.views.splice(i, 1);
          break;
        }
      }
    }
    if(event == AppEvent.Refresh) {
      App.selection.unselectAll();
      this.views.length = 0;
      App.map.elements.forEach((model) => {
        this.views.push(ViewFactory.create(model));
      });
    }
    if(event == AppEvent.Load) {
      App.selection.unselectAll();
      this.views.length = 0;
      App.map.elements.forEach((model) => {
        this.views.push(ViewFactory.create(model));
      });
      this.cmdCenterView();
      this.cmdZoomNormal();
    }    
  }  

  makeTestMap() {
    /* let startRoom = new Room(App.map.settings);
    App.map.add(startRoom);
    startRoom.name = 'hello world this is a very long text';
    startRoom.x = 0;
    startRoom.y = 0;
    this.views.push(ViewFactory.create(startRoom));

    let connection = new Connector(App.map.settings);
    App.map.add(connection);
    connection.name = 'abc';
    connection.dockStart = startRoom;
    connection.startDir = Direction.E;
    connection.isCurve = true;
    connection.oneWay = true;
    connection.startType = ConnectorType.In;
    connection.endType = ConnectorType.Out;
    this.views.push(ViewFactory.create(connection));
    
    let endRoom = new Room(App.map.settings);
    App.map.add(endRoom);
    endRoom.name = 'world';
    endRoom.x = 320;
    endRoom.y = 320;
    this.views.push(ViewFactory.create(endRoom));

    connection.dockEnd = endRoom;
    connection.endDir = Direction.W; */

    App.map = MapJSON.load(ZorkMap.json);
    // Broadcast that we've loaded a new map:
    Dispatcher.notify(AppEvent.Load, null);    
  }

  clear() {
    this.canvas.clearRect(0, 0, this.htmlCanvas.offsetWidth, this.htmlCanvas.offsetHeight);
  }

  drawSelectionArea() {
    let x = Math.min(this.mouseX, this.selectPosX);
    let y = Math.min(this.mouseY, this.selectPosY);
    let w = Math.abs(this.mouseX - this.selectPosX);
    let h = Math.abs(this.mouseY - this.selectPosY);

    this.canvas
      .strokeStyle(Values.COLOR_SELECTION_LINE)
      .fillStyle(Values.COLOR_SELECTION_AREA)
      .fillRect(x, y, w, h)
      .strokeRect(x, y, w, h);
  }

  render = () => {
    this.canvas.save();

    // Clear the scene and draw the grid:
    this.clear();
    this.grid.draw(this.htmlCanvas, this.canvas);
    
    // Translate/scale the entire canvas to conform to world coordinates:
    this.canvas.translate(Math.floor(this.htmlCanvas.offsetWidth / 2) + App.centerX, Math.floor(this.htmlCanvas.offsetHeight / 2) + App.centerY);
    this.canvas.scale(App.zoom, App.zoom);

    // Draw all blocks:
    this.views.forEach(view => {
      if(view instanceof BlockView) {
        view.draw(this.canvas, this.mouseX, this.mouseY, App.mouseMode == MouseMode.Connect ? 0 : App.selection.size(), this.hover == view && App.mouseMode != MouseMode.Select);
      }
    });

    // Draw all connectors:
    this.views.forEach(view => {
      if(view instanceof ConnectorView) {
        view.draw(this.canvas, this.mouseX, this.mouseY, App.mouseMode == MouseMode.Connect ? 0 : App.selection.size(), this.hover == view && App.mouseMode != MouseMode.Select);
      }
    });

    // Draw all rooms and notes:
    this.views.forEach(view => {
      if(view instanceof RoomView || view instanceof NoteView) {
        view.draw(this.canvas, this.mouseX, this.mouseY, App.mouseMode == MouseMode.Connect ? 0 : App.selection.size(), this.hover == view && App.mouseMode != MouseMode.Select);
      }
    });

    // Draw all handles:
    this.views.forEach(view => {
      view.drawHandles(this.canvas, this.mouseX, this.mouseY, App.mouseMode == MouseMode.Connect ? 0 : App.selection.size(), this.hover == view && App.mouseMode != MouseMode.Select);
    });

    if(App.mouseMode == MouseMode.Select) {
      this.drawSelectionArea();
    }

    this.canvas.restore();    

    window.requestAnimationFrame(this.render);
  }

  hitTest(x: number, y: number, view: View): boolean {
    this.hitTestCanvas
      .save()
      .clearRect(0, 0, 1, 1)      // Clear the hit test canvas.
      .scale(App.zoom, App.zoom)  // Scale the canvas to the current zoom level
      .translate(-x, -y);         // Translate canvas to match world mouse coordinates
    
    // Draw the view:
    view.drawSimple(this.hitTestCanvas, 0, 0, App.selection.size(), this.hover == view);

    this.hitTestCanvas.restore();
    
    // See if the canvas contains a non-transparent pixel.
    let myImageData = this.hitTestCanvas.getImageData(0, 0, 1, 1);
    return myImageData.data[3] > 0;
  }

  resize() {
    this.htmlCanvas.setAttribute('width', this.htmlCanvas.offsetWidth.toString());
    this.htmlCanvas.setAttribute('height', this.htmlCanvas.offsetHeight.toString());    
  }

  //
  // Find the coordinates of an HTML element relative to the top-left
  // corner of the document.
  //
  findObjCoordinates(obj: any) {
    let curleft = 0;
    let curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return {
      x : curleft,
      y : curtop
    };    
  }

  //
  // Find canvas mouse coordinates, taking into 
  // account scrolling and zooming.
  // 
  findMouseCoordinates(e: MouseEvent) {
    let { x, y } = this.findObjCoordinates(this.htmlCanvas);
    return { 
      x: Math.floor((e.clientX - x - this.htmlCanvas.offsetWidth / 2 - App.centerX) / App.zoom), 
      y: Math.floor((e.clientY - y - this.htmlCanvas.offsetHeight / 2 - App.centerY) / App.zoom)
    };
  }

  findViewByCoordinates(x: number, y: number) {
    // Non-blocks first:
    for(let i = 0; i < this.views.length; i++) {
      if(!(this.views[i] instanceof BlockView)) {
        if(this.hitTest(x, y, this.views[i])) return this.views[i];
      }
    }
    // Blocks next:
    for(let i = 0; i < this.views.length; i++) {
      if(this.views[i] instanceof BlockView) {
        if(this.hitTest(x, y, this.views[i])) return this.views[i];
      }
    }    
    return undefined;
  }

  canvasMouseDoubleClick(e: MouseEvent) {
    // See if a view was doubleclicked. If not, do nothing.
    let { x, y } = this.findMouseCoordinates(e);
    let view = this.findViewByCoordinates(x, y);
    if(view === undefined) return;

    // Select the view.
    App.selection.unselectAll();
    App.selection.add([view]);
    view.select();

    // Some HTML may be selected by the double-click. Try to unselect it.
    window.getSelection().removeAllRanges();

    // Call up the view's panel.
    this.cmdShowPanel();
  }

  canvasMouseDown(e: MouseEvent) {
    // - Are we over a resize handle?
    //   - MODE: RESIZE
    // - Are we over a connector handle?
    //   - MODE: CONNECT
    // - Are we over any view?.
    //   - Make view selected (ctrl applies)
    //   - MODE: DRAG
    // - Are we not over any view?
    //   - Unselect all views
    //   - MODE: SELECT
    // --------------------------------

    let { x, y } = this.findMouseCoordinates(e);

    if(App.mouseMode == MouseMode.AddRoom) {
      this.cmdAddRoom();
      return;
    }

    if(App.mouseMode == MouseMode.AddNote) {
      this.cmdAddNote();
      return;
    }

    if(App.mouseMode == MouseMode.AddBlock) {
      this.cmdAddBlock();
      return;
    }

    // Mouse wheel button pressed. Start scrolling.
    if(e.which == 2) {
      App.mouseMode = MouseMode.Scroll;
      this.scrollOffsetX = e.clientX;
      this.scrollOffsetY = e.clientY;
      this.scrollOriginX = App.centerX;
      this.scrollOriginY = App.centerY;
      this.htmlCanvas.style.cursor = 'move';
      return;
    }

    // Is the cursor over a view?
    let view = this.findViewByCoordinates(x, y);

    // No view clicked? Then unselect all unless CTRL is pressed.
    // Also enter Select mode.
    if(view === undefined) {
      if(!e.ctrlKey) App.selection.unselectAll();
      App.mouseMode = MouseMode.Select;
      this.selectPosX = x;
      this.selectPosY = y;
    }

    // One connector selected and over a connector handle?
    else if(App.selection.isSingle() && App.selection.first() instanceof ConnectorView && (App.selection.first() as ConnectorView).isConnectorHandle(x, y) !== undefined){
      App.pushUndo();
      App.mouseMode = MouseMode.Connect;
      this.connectorHandle = (App.selection.first() as ConnectorView).isConnectorHandle(x, y);
      this.htmlCanvas.style.cursor = 'crosshair';
    }

    // One Room/Note selected and over a resize handle?
    else if(view instanceof BoxView && App.selection.isSingle() && App.selection.first() == view && view.isResizeHandle(x, y) !== undefined) {
      App.pushUndo();
      App.mouseMode = MouseMode.Resize;
      this.roomHandle = view.isResizeHandle(x,y);
      view.save();
      this.htmlCanvas.style.cursor = Direction.toCursor(this.roomHandle);
    }

    // Nothing selected and over a Room connector handle?
    else if(view instanceof RoomView && App.selection.isEmpty() && view.isConnectorHandle(x, y) != undefined) {
      App.pushUndo();
      App.mouseMode = MouseMode.Connect;
      let handle = view.isConnectorHandle(x,y);
      let connector = new Connector(App.map.settings);
      App.map.add(connector);
      connector.dockStart = view.room;
      connector.startDir = handle;
      connector.endDir = handle;
      connector.endX = x;
      connector.endY = y;
      let v = ViewFactory.create(connector);
      this.views.push(v);
      App.selection.add([v]);
      this.connectorHandle = ConnectorHandle.End; // End is being dragged.
      this.htmlCanvas.style.cursor = 'crosshair';
    }

    // View clicked? Then add to selection if CTRL is pressed, or
    // replace selection if CTRL not pressed.
    else {
      if(e.ctrlKey) {
        if(!view.isSelected()) {
          App.selection.add([view]);
        }
      } else if(!view.isSelected()) {
        App.selection.select(view);
      }
      // Turn on drag mode:
      this.htmlCanvas.style.cursor = 'pointer';
      App.pushUndo();
      App.mouseMode = MouseMode.Drag;
      this.dragOriginX = x;
      this.dragOriginY = y;
      App.selection.get().forEach(view => {  
        if(view instanceof BoxView) {
          view.save();
        }
      });      
    }
  }

  canvasMouseMove(e: MouseEvent) {
    // MODE: NONE
    //   - Are we over any view where there is a selection?
    //     - Do nothing
    //   - Are over any view while there is NO selection?
    //     - Turn that view into hover mode.
    //       This means drawing handles
    //       Are we over a handle? Highlight it in draw
    //   - Are we NOT over any view?
    //     - Turn hover mode off for all views.
    //
    // MODE: SELECT
    //   - Draw selection area
    //
    // MODE: DRAG
    //   - Drag views
    //
    // MODE: RESIZE
    //   - Resize room
    //
    // MODE: CONNECT
    //   - Create connection
    // 
    // --------------------------------

    // Hide the room popup if we're dragging/resizing:
    if(App.mouseMode != MouseMode.None) {
      Dispatcher.notify(AppEvent.MouseMove, null);
    }

    // Find world coordinates of mouse:
    let { x, y } = this.findMouseCoordinates(e);
    this.mouseX = x;
    this.mouseY = y;

    // Update which view is currently hovered over:
    // (but not while scrolling, that slows things down).
    let view = undefined;
    if(App.mouseMode != MouseMode.Scroll) {
      view = this.findViewByCoordinates(x, y);
      if(view != this.hover) {
        this.hover = view;
      }
    }

    // We do different things for different mouse modes.
    switch(App.mouseMode) {
      case MouseMode.Scroll:
        App.centerX = this.scrollOriginX + (e.clientX - this.scrollOffsetX);
        App.centerY = this.scrollOriginY + (e.clientY - this.scrollOffsetY);
        break; 

      // We are dragging a (set of) boxes.
      case MouseMode.Drag:
        App.selection.get().forEach(view => {
          if(view instanceof BoxView) {
            (view.getModel() as Box).x = Grid.snap(view.oldX - this.dragOriginX + x);
            (view.getModel() as Box).y = Grid.snap(view.oldY - this.dragOriginY + y);
          }
        });
        break;

      // We are resizing a single box.
      case MouseMode.Resize:
        let selectedView = App.selection.first();
        if(selectedView instanceof BoxView) selectedView.resize(this.roomHandle, Grid.snap(x), Grid.snap(y));
        break;

      // We are manipulating a connector endpoint.
      case MouseMode.Connect:
        let connectorView = App.selection.first() as ConnectorView;
        // Are we hovering over a room's target handle?
        // Connect the connector to the handle.
        if(view instanceof RoomView) {
          let targetHandle = view.isConnectorHandle(x, y);
          if(targetHandle !== undefined) {
            if(this.connectorHandle == ConnectorHandle.Start) {
              connectorView.connector.dockStart = view.room;
              connectorView.connector.startDir = targetHandle;
            } else {
              connectorView.connector.dockEnd = view.room;
              connectorView.connector.endDir = targetHandle;              
            }
          }
        }
        // Not over a target handle. Just make the line follow
        // the cursor.
        else {
          if(this.connectorHandle == ConnectorHandle.Start) {
            connectorView.connector.dockStart = null;
            connectorView.connector.startX = Grid.snap(x);
            connectorView.connector.startY = Grid.snap(y);
          } else {
            connectorView.connector.dockEnd = null;
            connectorView.connector.endX = Grid.snap(x);
            connectorView.connector.endY = Grid.snap(y);
          }
        }
        break;
    }
  }

  canvasMouseUp(e: MouseEvent) {
    //
    // MODE: NONE
    // - Do nothing
    //
    // MODE: SELECT
    // - Select all views in selection area. Partially selected views are included. Lines are also included.
    // 
    // MODE: DRAG
    // - End drag view mode. Views stay selected
    //
    // MODE: RESIZE
    // - Go to NONE mode
    // - Room stays selected
    //
    // MODE: CONNECT
    // - Go to NONE mode
    // - New connection stays selected
    // 
    // --------------------------------
    switch(App.mouseMode) {
      // Selection mode. Select all views that are in the selection area.
      case MouseMode.Select:
        App.selection.unselectAll();
        for(let i = 0; i < this.views.length; i++) {
          if(this.views[i].isIn(this.mouseX, this.mouseY, this.selectPosX, this.selectPosY)) {
            App.selection.add([this.views[i]]);
          }
        }
        break;
    }

    this.htmlCanvas.style.cursor = 'default';
    App.mouseMode = MouseMode.None;
  }

  canvasMouseWheel(e:MouseWheelEvent) {
    if(e.deltaY < 0) {
      this.cmdZoomIn();
    }
    if(e.deltaY > 0) {
      this.cmdZoomOut();
    }
  }   

  //-----------------------------------------
  //
  //             EDITOR COMMANDS
  //
  //-----------------------------------------

  cmdSelectAll() {
    App.selection.unselectAll();
    App.selection.add(this.views);    
  }

  cmdShowPanel() {
    if(App.selection.isSingle()) {
      Dispatcher.notify(AppEvent.More, App.selection.first().getModel());
    }    
  }

  cmdReverseConnector() {
    if(App.selection.isSingle() && App.selection.first() instanceof ConnectorView) {
      let connector = (App.selection.first() as ConnectorView).getModel();
      if(connector.isDoubleDocked()) {
        App.pushUndo();
        connector.reverse();
      }
    }    
  }

  cmdToggleDarkness() {
    if(App.selection.isSingle() && App.selection.first() instanceof RoomView) {
      let room = (App.selection.first() as RoomView).getModel();
      App.pushUndo();
      room.dark = !room.dark;
    }    
  }

  cmdDelete() {
    if(!App.selection.isEmpty()) {
      App.pushUndo();
      let toDelete: Array<View> = new Array<View>();
      App.selection.get().forEach((view) => { toDelete.push(view); });
      toDelete.forEach((view) => { view.getModel().delete(); });
    }
  }

  cmdToggleOneWay() {
    if(App.selection.isSingle() && App.selection.first() instanceof ConnectorView) {
      let connector = (App.selection.first() as ConnectorView).getModel();
      App.pushUndo();
      connector.oneWay = !connector.oneWay;
    }
  }

  cmdNewRoomInDir(dir: Direction) {

    // Only works if a single room is selected.
    if(!App.selection.isSingle() || !(App.selection.first() instanceof RoomView)) return;

    // Get room model.
    let room: Room = (App.selection.first() as RoomView).getModel();

    // Abort if there is already a connection in the desired direction.
    if (room.hasConnection(dir)) return;

    App.pushUndo();

    // Create new room in the specified direction.
    let newRoom = new Room(App.map.settings);
    App.map.add(newRoom);
    let {x: dx, y: dy} = Direction.toVector(dir);
    newRoom.x = room.x + room.width / 2 + dx*room.width + App.map.settings.grid.size * 2 * dx - newRoom.width/2;
    newRoom.y = room.y + room.height / 2 + dy*room.height + App.map.settings.grid.size * 2 * dy - newRoom.height/2;

    // Add new room view to editor.
    let view = ViewFactory.create(newRoom);
    this.views.push(view);

    // Create connector.
    let newConnector = new Connector(App.map.settings);
    App.map.add(newConnector);
    newConnector.dockStart = room;
    newConnector.dockEnd = newRoom;
    newConnector.startDir = dir;
    newConnector.endDir = Direction.opposite(dir);

    // Add new connector view to editor.
    view = ViewFactory.create(newConnector);
    this.views.push(view);
  }

  // 
  // Move the canvas center by (dx, dy)
  moveCenter(dx: number, dy: number) {
    App.centerX += dx * App.map.settings.grid.size;
    App.centerY += dy * App.map.settings.grid.size;
  }

  cmdCopySelection() {
    // Clear the copy list.
    this.copy.length = 0;

    // For each non-connector in the selection, create a clone and store it in
    // the copy list.
    // The position of the first element in the copy list is saved as "offset",
    // so that the whole group is offset relative from the center of the viewport.
    let hasOffset = false;
    let offsetX = 0;
    let offsetY = 0;
    App.selection.get().forEach((view) => {
      if(!(view instanceof ConnectorView)) {
        let box:Box = <Box> view.getModel().clone();
        this.copy.push(box);
        if(!hasOffset) {
          hasOffset = true;
          offsetX = box.x;
          offsetY = box.y;
        }
        box.x = -App.centerX + box.x - offsetX;
        box.y = -App.centerY + box.y - offsetY;
      }
    });

    // For each connector in the selection,
    App.selection.get().forEach((view) => {
      if(view instanceof ConnectorView) {
        let connector = view.getModel();
        // Check that the connector is connected at both ends to room that
        // are in the copy list. Otherwise, ignore the connector.
        let dockStartIdx: number = -1;
        let dockEndIdx: number = -1;
        let roomIdx = 0;
        for(let i = 0; i < App.selection.size(); i++) {
          if(App.selection.get()[i] instanceof RoomView) {
            let roomView = App.selection.get()[i];
            if(connector.dockStart == roomView.getModel()) dockStartIdx = roomIdx;
            if(connector.dockEnd == roomView.getModel()) dockEndIdx = roomIdx;
            roomIdx++;
          }
        }
        // If the connector is docked to rooms inside the copy list at both ends,
        // clone it and store it in the copy list, pointing its connections to the
        // new room clones in the copy list.
        if(dockStartIdx >= 0 && dockEndIdx >= 0) {
          let newConnector: Connector = <Connector> connector.clone();
          newConnector.dockStart = <Room> this.copy[dockStartIdx];
          newConnector.dockEnd = <Room> this.copy[dockEndIdx];
          this.copy.push(newConnector);
        }
      }
    });    
  }

  cmdPaste() {
    App.pushUndo();
    App.selection.unselectAll();

    let viewCount = this.views.length;

    // For each non-connector in the copy list:
    this.copy.forEach((model) => {
      if(!(model instanceof Connector)) {
        // Clone the model and add it to the map:
        let newModel: Model = model.clone();
        App.map.add(newModel);
        // Create a view and add it to the selection:
        let view: View = ViewFactory.create(newModel);
        this.views.push(view);
        App.selection.add([view]);
      }
    });

    // For each connector in the copy list:
    this.copy.forEach((model) => {
      if(model instanceof Connector) {
        let connector: Connector = model;
        // For each end, find the index of the Room it is connected to in the copy list.
        let dockStartIdx: number = 0;
        let dockEndIdx: number = 0;
        let roomIdx = 0;
        for(let i = 0; i < this.copy.length; i++) {
          if(!(this.copy[i] instanceof Room)) continue;
          if(connector.dockStart == this.copy[i]) dockStartIdx = viewCount + roomIdx;
          if(connector.dockEnd == this.copy[i]) dockEndIdx = viewCount + roomIdx;
          roomIdx++;
        }
        // Actually copy the connector, and connect it to the copied rooms.
        let newConnector: Connector = <Connector> connector.clone();
        App.map.add(newConnector);
        newConnector.dockStart = <Room> this.views[dockStartIdx].getModel();
        newConnector.dockEnd = <Room> this.views[dockEndIdx].getModel();
        // Create a view and add it to the selection:
        let view: ConnectorView = <ConnectorView> ViewFactory.create(newConnector);
        this.views.push(view);
        App.selection.add([view]);
      }
    });
  }  

  // Zoom = 1 is the standard zoom level.
  // Under 1, zoom is multiplied by a fraction (zoomFraction)
  // Above 1, zoom is increased by an addition (zoomAdditive)
  // This seems to give the smoothest result without giant steps
  // at higher/lower zoom levels.  

  updateZoomPercentage() {
    this.ctrlZoom.value = Math.floor(App.zoom * 100) + '%';
  }

  cmdZoom() {
    let zoomStr = this.ctrlZoom.value;
    // Remove percentage sign if present
    zoomStr.replace('%', ' ');
    // Convert to number. Ignore result on failure.
    let zoomPercentage = parseFloat(zoomStr);
    if(!isNaN(zoomPercentage)) {
      // Set zoom level (clamp range)
      App.zoom = zoomPercentage / 100;
      if(App.zoom >= 10) App.zoom = 10;
      if(App.zoom <= 0.1) App.zoom = 0.1;
    }
    // Place new zoom percentage in control.
    this.updateZoomPercentage();
  }

  cmdZoomIn() {
    if(App.zoom < 1) {
      App.zoom = App.zoom * Values.ZOOM_FRACTION;
    } else {
      App.zoom += Values.ZOOM_ADDITIVE;
    }
    // Clamp zoom level
    if(App.zoom >= 10) App.zoom = 10;
    if(App.zoom <= 0.1) App.zoom = 0.1;
    this.updateZoomPercentage();
  }

  cmdZoomOut() {
    if(App.zoom <= 1) {
      App.zoom = App.zoom / Values.ZOOM_FRACTION;
    } else {
      App.zoom -= Values.ZOOM_ADDITIVE;
    }
    // Clamp zoom level
    if(App.zoom >= 10) App.zoom = 10;
    if(App.zoom <= 0.1) App.zoom = 0.1;
    this.updateZoomPercentage();
  }

  cmdZoomNormal() {
    App.zoom = 1;
    this.updateZoomPercentage();
  }

  cmdCenterView() {
    App.centerX = 0;
    App.centerY = 0;
  }  
  
  cmdAddRoom() {
    App.pushUndo();
    let room = new Room(App.map.settings);
    App.map.add(room);
    room.x = Grid.snap(this.mouseX);
    room.y = Grid.snap(this.mouseY);
    this.views.push(ViewFactory.create(room));
  }

  cmdAddNote() {
    App.pushUndo();
    let note = new Note(App.map.settings);
    App.map.add(note);
    note.x = Grid.snap(this.mouseX);
    note.y = Grid.snap(this.mouseY);
    this.views.push(ViewFactory.create(note));
  }

  cmdAddBlock() {
    App.pushUndo();
    let block = new Block(App.map.settings);
    App.map.add(block);
    block.x = Grid.snap(this.mouseX);
    block.y = Grid.snap(this.mouseY);
    this.views.push(ViewFactory.create(block));
  }  
}
