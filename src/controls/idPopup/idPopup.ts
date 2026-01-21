import { Control } from "../Control";

// Shared tooltip element for all IdPopup instances
let tooltipElement: HTMLElement | null = null;
let hideTimeout: number | null = null;

function getTooltipElement(): HTMLElement {
  if (!tooltipElement) {
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    document.body.appendChild(tooltipElement);
  }
  return tooltipElement;
}

type TooltipPosition = 'above' | 'below' | 'left' | 'right';

function showTooltip(target: HTMLElement, text: string, forcedPosition?: TooltipPosition) {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  const tooltip = getTooltipElement();
  tooltip.innerHTML = text;
  tooltip.className = 'tooltip'; // Reset classes

  // Make visible but transparent to measure
  tooltip.style.visibility = 'hidden';
  tooltip.style.display = 'block';

  const targetRect = target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const gap = 12; // Space between tooltip and target

  let position: TooltipPosition = forcedPosition || 'above';
  let top: number;
  let left: number;

  // Only auto-position if no forced position was specified
  if (!forcedPosition) {
    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = window.innerWidth - targetRect.right;

    if (spaceRight <= tooltipRect.width + gap) {
      position = 'left';
    } else if (spaceLeft <= tooltipRect.width + gap) {
      position = 'right';
    } else if (spaceAbove <= tooltipRect.height + gap) {
      position = 'below';
    }
  } 

  switch (position) {
    case 'above':
      top = targetRect.top - tooltipRect.height - gap;
      left = targetRect.left + (targetRect.width - tooltipRect.width) / 2 - 4;
      break;
    case 'below':
      top = targetRect.bottom + gap;
      left = targetRect.left + (targetRect.width - tooltipRect.width) / 2 - 4;
      break;
    case 'left':
      top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
      left = targetRect.left - tooltipRect.width - gap;
      break;
    case 'right':
      top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
      left = targetRect.right + gap;
      break;
  }

  // Clamp to viewport
  left = Math.max(4, Math.min(left, window.innerWidth - tooltipRect.width - 4));
  top = Math.max(4, Math.min(top, window.innerHeight - tooltipRect.height - 4));

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.style.visibility = 'visible';
  tooltip.classList.add(`tooltip-${position}`, 'visible');
}

function hideTooltip() {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
  hideTimeout = window.setTimeout(() => {
    if (tooltipElement) {
      tooltipElement.classList.remove('visible');
    }
    hideTimeout = null;
  }, 100);
}

export class IdPopup extends Control {
  private div: HTMLElement;
  private dataType: string;

  //
  // Create a new instance of IdPopup by providing a query selector that
  // yields an id-popup element.
  //
  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    super(elem, base);

    // Convert title to data-tooltip for custom tooltip
    // (removes native browser tooltip)
    if (this.elem.hasAttribute('title')) {
      this.elem.dataset.tooltip = this.elem.getAttribute('title');
      this.elem.removeAttribute('title');
    }

    // Find element's children and remove them.
    let children = new Array<Element>();
    for(var i = 0; i < this.elem.children.length; i++) {
      children.push(this.elem.children[i]);
    }
    children.forEach((child) => { child.remove(); });

    // Expand a handlebars template into the top element.
    this.elem.innerHTML = Handlebars.templates.idPopup({ });

    // Get a reference to the button's div:
    this.div = this.elem.querySelector('div');

    // Store button data-type field, if any
    this.dataType = this.elem.dataset.type;

    // Add the children back:
    children.forEach((child) => { this.div.appendChild(child); });

    this.setupOverlay();
    this.setupTooltip();
  }

  private setupTooltip() {
    const tooltipText = this.elem.dataset.tooltip;
    if (!tooltipText) return;

    const forcedPosition = this.elem.dataset.tooltipPosition as TooltipPosition | undefined;

    this.elem.addEventListener('mouseenter', () => {
      showTooltip(this.elem, tooltipText, forcedPosition);
    });

    this.elem.addEventListener('mouseleave', () => {
      hideTooltip();
    });
  }

  private findObjCoordinates(obj: any) {
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

  private setupOverlay() {
    // See if button has a .popup-overlay child.
    let child = this.elem.querySelector('.popup-overlay') as HTMLElement;
    // Abort if child not present.
    if(!child) return;
    // Add a click event that shows/hides the child overlay.
    child.style.display = 'none';
    this.elem.addEventListener('click', (e:Event) => {
      window.getSelection().removeAllRanges(); // strangely, contents of overlay sometimes get selected.
      if(child.style.display == 'none') {
        // Hide all popup overlays in the Document except this one.
        let overlayNodes = document.querySelectorAll('.popup-overlay');
        for(let j = 0; j < overlayNodes.length; j++) {
          (overlayNodes[j] as HTMLElement).style.display = 'none';
        }
        child.style.display = 'block';
        let {x, y} = this.findObjCoordinates(this.elem);
        if(x + child.offsetWidth > window.innerWidth) {
          child.style.left = (window.innerWidth - (x + child.offsetWidth)) + "px";
        }
      } else {
        child.style.display = 'none';
      }
    });
    // Clicking on the overlay itself does not cause it to close,
    // because the click event is never propagated up the DOM tree:
    child.addEventListener('click', (e:Event) => {
      e.stopPropagation();
    });
  }

  set backgroundColor(color: string) {
    this.div.style.backgroundColor = color;
  }

  get backgroundColor() {
    return this.div.style.backgroundColor;
  }

  get selected() {
    return this.elem.classList.contains('selected');
  }

  set selected(select: boolean) {
    if(select) {
      this.elem.classList.add('selected');
    } else {
      this.elem.classList.remove('selected');
    }
  }

  get type() {
    return this.dataType;
  }

}
