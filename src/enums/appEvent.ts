export enum AppEvent {
  Select,       // The views selection changed
  MouseMove,    // The mouse moved
  Delete,       // A model was deleted from the map
  Load,         // A new map was loaded
  Refresh,      
  Redraw,       
  More,
  Added         // An element was added to the map through the use of a tool button,
                // which must now be unselected.
}