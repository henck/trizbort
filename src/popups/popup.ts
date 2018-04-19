export class Popup {
  private id: string;
  protected elem: HTMLElement;

  constructor(id: string, template: any, args: Object) {
    this.id = id;
    this.elem = document.getElementById(id);
    this.elem.innerHTML = template(args);
  }
}