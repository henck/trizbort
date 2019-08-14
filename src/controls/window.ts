export class Window {
  private elem: HTMLElement;

  constructor(title: string, content: string, onOK: any, onCancel: any) {
    this.elem = document.getElementById('window');
    this.elem.querySelector('.title').innerHTML = title;
    this.elem.querySelector('.content').innerHTML = content;

    let ok: HTMLElement = this.elem.querySelector('.ok');
    ok.style.display = onOK === false ? 'none' : 'block';
    this.elem.querySelector('.ok').addEventListener('click', () => {
      this.close();
      if(onOK instanceof Function) onOK();

      onCancel = null;
      onOK = null;
    });

    let cancel: HTMLElement = this.elem.querySelector('.cancel');
    cancel.style.display = onCancel === false ? 'none' : 'block';
    this.elem.querySelector('.cancel').addEventListener('click', () => {
      this.close();
      if(onCancel instanceof Function) onCancel();

      onCancel = null;
      onOK = null;
    });
    
    this.open();
  }

  open() {
    this.elem.style.display = 'flex';
  }

  close() {
    this.elem.style.display = 'none';
  }  
}