import { View } from './views/view.js'
import { Dispatcher } from './dispatcher.js';
import { AppEvent } from './enums/enums.js';

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
    Dispatcher.notify(AppEvent.Select, views[0].getModel());
  }  
}