// Shared tooltip element
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

export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

export function showTooltip(target: HTMLElement, text: string, forcedPosition?: TooltipPosition) {
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

export function hideTooltip() {
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
