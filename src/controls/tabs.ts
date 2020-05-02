export class Tabs {
  private elem: HTMLElement;
  private tabs: Array<Tab>;

  //
  // Create a Tabs instance for each element with
  // class .tabs in the Document.
  //
  static initialize() {
    // Find all the Tabs elements in the document.
    let tabsList = document.querySelectorAll('.tabs');
    for(let i = 0; i < tabsList.length; i++) {
      // For each element found, create a new Tabs instance.
      new Tabs(tabsList[i] as HTMLElement);
    }
  } 

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.tabs = new Array<Tab>();
    // Find all tab elements inside the Tabs.
    let tabList = this.elem.querySelectorAll('.tab');
    for(let i = 0; i < tabList.length; i++) {
      // For each element found, create a new Tab instance.
      this.tabs.push(new Tab(this, tabList[i] as HTMLElement));
    }
  }

  //
  // Called by Tab when a Tab is selected.
  // Selects new tab, unselects other tabs.
  //
  select(tab: Tab) {
    for(let i = 0; i < this.tabs.length; i++) {
      if(this.tabs[i] == tab) {
        this.tabs[i].select();
      } else {
        this.tabs[i].unselect();
      }
    }
  }
}

class Tab {
  private tabs: Tabs;
  private elem: HTMLElement;
  private body: HTMLElement;

  constructor(tabs: Tabs, elem: HTMLElement) {
    this.tabs = tabs;
    this.elem = elem;
    // Find data-body attribute
    let bodyID = this.elem.dataset.body;
    // Find the body element
    this.body = document.getElementById(bodyID);
    if(!this.body) {
      console.log("Tabs error: body not found.");
      return;
    }
    // Show/hide the body element depending on presence of 'selected' class on tab.
    if(this.elem.classList.contains('selected')) this.select();
    // Make tab clickable
    this.elem.addEventListener('click', () => {
      this.tabs.select(this);
    });
  }

  select() {
    this.elem.classList.add('selected');
    this.body.classList.add("selected");
  }

  unselect() {
    this.elem.classList.remove('selected');
    this.body.classList.remove("selected");
  }
}