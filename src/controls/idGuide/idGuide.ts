import { Control } from "../Control";

let guide: IdGuide = null;
const HIDE_TIPS_KEY = 'hideGuideTips';

export class IdGuide extends Control {
  private title: HTMLHeadingElement;
  private text: HTMLParagraphElement;
  private dismissTipsLink: HTMLAnchorElement;

  //
  // Create a new instance of IdGuide by providing a query selector that
  // yields an id-guide element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idGuide({});

    // Keep a reference to guide text to be able to set the text:
    this.title = this.elem.querySelector('h3');
    this.text = this.elem.querySelector('p');
    this.dismissTipsLink = this.elem.querySelector('.js-dismiss-tips');

    // Close guide when close-icon is clicked:
    this.elem.querySelector('span').addEventListener('click', this.handleClose);
    this.dismissTipsLink.addEventListener('click', this.handleDismissTips);
  }

  private handleClose = () => {
    this.elem.style.display = 'none';
  }

  private handleDismissTips = (e: Event) => {
    e.preventDefault();
    localStorage.setItem(HIDE_TIPS_KEY, '1');
    this.handleClose();
  }

  public setText(title: string, text: string, autoWidth: boolean) {
    // Make sure element is visible (guide may have been closed previously):
    this.elem.style.display = 'block';
    this.title.innerHTML = title;
    this.text.innerHTML = text;
    if(autoWidth) {
      this.elem.style.width = 'auto';
    } else {
      this.elem.style.width = '250px';
    }
  }

  public static resetTipsForNewMap(): void {
    localStorage.removeItem(HIDE_TIPS_KEY);
    IdGuide.guide("Welcome to Trizbort.io!", "To start building your map, click the <b>room icon</b> in the tool bar and click anywhere on the map to place your first room (or press <kbd>Ctrl/⌘</kbd><kbd>1</kbd>).");
  }

  // Pass force=true for requested help so it still appears after tips are dismissed.
  public static guide(title: string, text: string, autoWidth?: boolean, force?: boolean) {
    if(!force && localStorage.getItem(HIDE_TIPS_KEY) === '1') return;
    if(guide == null) guide = new IdGuide("#guide");
    guide.setText(title, text, !!autoWidth);
  }
}
