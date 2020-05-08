import { View } from './views/view'
import { Dispatcher } from './dispatcher'
import { AppEvent } from './enums'

//
// Selection wraps the selection of Views in the app.
// 
export class Selection {
  private list: Array<View>;

  constructor() {
    this.list = new Array<View>();
  }

  // Is this a selection with no elements?
  isEmpty() { 
    return this.list.length == 0;
  }

  // Is this a selection with only one element?
  isSingle() {
    return this.list.length == 1;
  }

  // Is this a selection with more than one element?
  isMultiple() {
    return this.list.length > 1;
  }

  // Returns the number of elements in the selection.
  size() {
    return this.list.length;
  }

  // Returns the first element in the selection.
  first() {
    return this.list[0];
  }

  // Returns the selection as an array, so it can be looped over.
  get() {
    return this.list;
  }

  // Clear the selection, without calling unselect() on its Views
  clear() {
    this.list.length = 0;
  }

  // Clear the selection. Unselect is called on each View and a Select event is broadcast.
  unselectAll() {
    this.list.forEach(view => { view.unselect(); });
    this.list.length = 0;
    Dispatcher.notify(AppEvent.Select, null);
  }

  // Select is called on each View in selection.
  selectAll() {
    this.list.forEach(view => { view.select(); });
  }

  // Select a view, clearing the selection first.
  select(view: View) {
    this.unselectAll();
    this.add([view]);
  }

  // Add an array of views to the selection.
  add(views: View[]) {
    views.forEach((view) => {
      view.select();
      this.list.push(view);
    });
    // Notify subscribers only if at least one view as selected.
    if(views.length > 0) {
      Dispatcher.notify(AppEvent.Select, views[0].getModel());
    }
  }  
}