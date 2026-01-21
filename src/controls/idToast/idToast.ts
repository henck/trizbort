export class IdToast {
  private elem: HTMLElement;
  private timeout: number;

  constructor(html: string) {
    // Create the toast element
    this.elem = document.createElement('div');
    this.elem.className = 'toast';
    this.elem.innerHTML = html;
    document.body.appendChild(this.elem);

    // Click to dismiss
    this.elem.addEventListener('click', () => this.dismiss());

    // Auto-dismiss after 5 seconds
    this.timeout = window.setTimeout(() => this.fadeOut(), 5000);
  }

  private dismiss() {
    clearTimeout(this.timeout);
    this.elem.remove();
  }

  private fadeOut() {
    this.elem.classList.add('fade-out');
    // Remove after animation completes
    this.elem.addEventListener('animationend', () => this.elem.remove());
  }

  public static toast(html: string) {
    new IdToast(html);
  }
}
