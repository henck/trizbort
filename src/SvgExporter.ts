import { Map, Box, Room, Note, Block, Connector } from "./models";
import { Direction, LineStyle, RoomShape } from "./enums";

//
// The SvgExporter exports the map to an SVG file.
//
export class SvgExporter {
  private map: Map;
  private left: number;
  private top: number;
  private width: number;
  private height: number;
  private padding: number = 50;

  public constructor(map: Map) {
    this.map = map;
  }

  //
  // Export the current map to an SVG file.
  //
  public export() {
    // Calculate bounding box
    this.calculateBounds();

    // Generate SVG content
    const svg = this.generateSvg();

    // Download
    this.download(svg);
  }

  //
  // Calculate the bounding box of all elements.
  //
  private calculateBounds() {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    this.map.elements.forEach((model) => {
      if (model instanceof Box) {
        if (model.x < minX) minX = model.x;
        if (model.y < minY) minY = model.y;
        if (model.x + model.width > maxX) maxX = model.x + model.width;
        if (model.y + model.height > maxY) maxY = model.y + model.height;
      } else if (model instanceof Connector) {
        // Include connector endpoints
        const points = this.getConnectorPoints(model);
        points.forEach(p => {
          if (p.x < minX) minX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.x > maxX) maxX = p.x;
          if (p.y > maxY) maxY = p.y;
        });
      }
    });

    // Handle empty map
    if (minX === Infinity) {
      minX = 0;
      minY = 0;
      maxX = 100;
      maxY = 100;
    }

    this.left = minX - this.padding;
    this.top = minY - this.padding;
    this.width = maxX - minX + this.padding * 2;
    this.height = maxY - minY + this.padding * 2;
  }

  //
  // Get all points of a connector for bounds calculation.
  //
  private getConnectorPoints(conn: Connector): { x: number, y: number }[] {
    const points: { x: number, y: number }[] = [];

    if (conn.dockStart) {
      const pos = conn.dockStart.directionToPos(conn.startDir, false);
      points.push(pos);
    } else {
      points.push({ x: conn.startX, y: conn.startY });
    }

    if (conn.dockEnd) {
      const pos = conn.dockEnd.directionToPos(conn.endDir, false);
      points.push(pos);
    } else {
      points.push({ x: conn.endX, y: conn.endY });
    }

    return points;
  }

  //
  // Generate the complete SVG markup.
  //
  private generateSvg(): string {
    const parts: string[] = [];

    // SVG header
    parts.push(`<?xml version="1.0" encoding="UTF-8"?>`);
    parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${this.left} ${this.top} ${this.width} ${this.height}" width="${this.width}" height="${this.height}">`);

    // Background
    parts.push(`  <rect x="${this.left}" y="${this.top}" width="${this.width}" height="${this.height}" fill="${this.map.settings.grid.background}"/>`);

    // Draw blocks first (behind everything)
    this.map.elements.forEach((model) => {
      if (model instanceof Block) {
        parts.push(this.renderBlock(model));
      }
    });

    // Draw connectors (behind rooms but above blocks)
    this.map.elements.forEach((model) => {
      if (model instanceof Connector) {
        parts.push(this.renderConnector(model));
      }
    });

    // Draw rooms and notes
    this.map.elements.forEach((model) => {
      if (model instanceof Room) {
        parts.push(this.renderRoom(model));
      } else if (model instanceof Note) {
        parts.push(this.renderNote(model));
      }
    });

    parts.push(`</svg>`);

    return parts.join('\n');
  }

  //
  // Convert LineStyle to SVG stroke-dasharray.
  //
  private lineStyleToDashArray(style: LineStyle): string {
    const arr = LineStyle.toArray(style);
    return arr.length > 0 ? arr.join(',') : 'none';
  }

  //
  // Generate SVG shape path for a box (room/note/block).
  //
  private getShapePath(box: Box): string {
    const x = box.x;
    const y = box.y;
    const w = box.width;
    const h = box.height;
    const r = Math.min(box.rounding || 0, w / 4, h / 4);

    switch (box.shape) {
      case RoomShape.Ellipse:
        const cx = x + w / 2;
        const cy = y + h / 2;
        const rx = w / 2;
        const ry = h / 2;
        return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy} Z`;

      case RoomShape.Octagon:
        const cut = Math.min(w, h) * 0.25;
        return `M ${x + cut} ${y} L ${x + w - cut} ${y} L ${x + w} ${y + cut} L ${x + w} ${y + h - cut} L ${x + w - cut} ${y + h} L ${x + cut} ${y + h} L ${x} ${y + h - cut} L ${x} ${y + cut} Z`;

      default: // Rectangle with optional rounding
        if (r > 0) {
          return `M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${x + r} ${y + h} Q ${x} ${y + h} ${x} ${y + h - r} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
        }
        return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
    }
  }

  //
  // Escape text for XML.
  //
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  //
  // Render a room to SVG.
  //
  private renderRoom(room: Room): string {
    const parts: string[] = [];
    const path = this.getShapePath(room);
    const dashArray = this.lineStyleToDashArray(room.lineStyle);

    parts.push(`  <g class="room">`);

    // Fill
    parts.push(`    <path d="${path}" fill="${room.fillColor}" stroke="none"/>`);

    // Darkness indicator (diagonal stripe in top-right)
    if (room.dark) {
      const darkColor = this.map.settings.room.darkColor;
      const stripeSize = Math.min(room.width, room.height) * 0.3;
      parts.push(`    <clipPath id="dark-clip-${room.id}">`);
      parts.push(`      <path d="${path}"/>`);
      parts.push(`    </clipPath>`);
      parts.push(`    <polygon points="${room.x + room.width - stripeSize},${room.y} ${room.x + room.width},${room.y} ${room.x + room.width},${room.y + stripeSize}" fill="${darkColor}" clip-path="url(#dark-clip-${room.id})"/>`);
    }

    // Border
    if (room.lineStyle !== LineStyle.None) {
      const strokeDash = dashArray !== 'none' ? ` stroke-dasharray="${dashArray}"` : '';
      parts.push(`    <path d="${path}" fill="none" stroke="${room.borderColor}" stroke-width="${room.lineWidth}"${strokeDash}/>`);
    }

    // Room name
    const fontSize = this.map.settings.basic.fontSize;
    const fontFamily = this.map.settings.basic.fontFamily;
    const cx = room.x + room.width / 2;
    const cy = room.y + room.height / 2;

    parts.push(`    <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" fill="${room.nameColor}" font-size="${fontSize}" font-family="${fontFamily}">${this.escapeXml(room.name)}</text>`);

    // Subtitle
    if (room.subtitle) {
      const subtitleSize = fontSize * 0.8;
      parts.push(`    <text x="${cx}" y="${cy + fontSize}" text-anchor="middle" dominant-baseline="middle" fill="${room.subtitleColor}" font-size="${subtitleSize}" font-family="${fontFamily}">${this.escapeXml(room.subtitle)}</text>`);
    }

    parts.push(`  </g>`);

    return parts.join('\n');
  }

  //
  // Render a note to SVG.
  //
  private renderNote(note: Note): string {
    const parts: string[] = [];
    const path = this.getShapePath(note);
    const dashArray = this.lineStyleToDashArray(note.lineStyle);

    parts.push(`  <g class="note">`);

    // Fill
    parts.push(`    <path d="${path}" fill="${note.fillColor}" stroke="none"/>`);

    // Fold corner (diagonal line in corner)
    const foldSize = note.height * 0.15;
    parts.push(`    <line x1="${note.x + note.width - foldSize}" y1="${note.y}" x2="${note.x + note.width}" y2="${note.y + foldSize}" stroke="${note.borderColor}" stroke-width="${note.lineWidth / 2}"/>`);

    // Border
    if (note.lineStyle !== LineStyle.None) {
      const strokeDash = dashArray !== 'none' ? ` stroke-dasharray="${dashArray}"` : '';
      parts.push(`    <path d="${path}" fill="none" stroke="${note.borderColor}" stroke-width="${note.lineWidth}"${strokeDash}/>`);
    }

    // Text
    const fontSize = this.map.settings.basic.fontSize;
    const fontFamily = this.map.settings.basic.fontFamily;
    const cx = note.x + note.width / 2;
    const cy = note.y + note.height / 2;

    parts.push(`    <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" fill="${note.textColor}" font-size="${fontSize}" font-family="${fontFamily}">${this.escapeXml(note.text)}</text>`);

    parts.push(`  </g>`);

    return parts.join('\n');
  }

  //
  // Render a block to SVG.
  //
  private renderBlock(block: Block): string {
    const parts: string[] = [];
    const path = this.getShapePath(block);
    const dashArray = this.lineStyleToDashArray(block.lineStyle);

    parts.push(`  <g class="block">`);

    // Fill
    parts.push(`    <path d="${path}" fill="${block.fillColor}" stroke="none"/>`);

    // Border
    if (block.lineStyle !== LineStyle.None) {
      const strokeDash = dashArray !== 'none' ? ` stroke-dasharray="${dashArray}"` : '';
      parts.push(`    <path d="${path}" fill="none" stroke="${block.borderColor}" stroke-width="${block.lineWidth}"${strokeDash}/>`);
    }

    parts.push(`  </g>`);

    return parts.join('\n');
  }

  //
  // Render a connector to SVG.
  //
  private renderConnector(conn: Connector): string {
    const parts: string[] = [];
    const dashArray = this.lineStyleToDashArray(conn.lineStyle);

    // Get start and end points
    let startX: number, startY: number, endX: number, endY: number;
    let startDir: Direction, endDir: Direction;

    if (conn.dockStart) {
      const pos = conn.dockStart.directionToPos(conn.startDir, false);
      startX = pos.x;
      startY = pos.y;
      startDir = conn.startDir;
    } else {
      startX = conn.startX;
      startY = conn.startY;
      startDir = conn.startDir;
    }

    if (conn.dockEnd) {
      const pos = conn.dockEnd.directionToPos(conn.endDir, false);
      endX = pos.x;
      endY = pos.y;
      endDir = conn.endDir;
    } else {
      endX = conn.endX;
      endY = conn.endY;
      endDir = conn.endDir;
    }

    parts.push(`  <g class="connector">`);

    // Draw connector path
    let pathD: string;
    if (conn.isCurve && conn.dockStart && conn.dockEnd) {
      // Curved connector (cubic Bezier)
      const stalkLength = 15;
      const { x: vx1, y: vy1 } = Direction.toVector(startDir);
      const { x: vx2, y: vy2 } = Direction.toVector(endDir);

      const cp1x = startX + vx1 * stalkLength * 3;
      const cp1y = startY + vy1 * stalkLength * 3;
      const cp2x = endX + vx2 * stalkLength * 3;
      const cp2y = endY + vy2 * stalkLength * 3;

      pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`;
    } else {
      // Straight connector with stalks
      const stalkLength = 15;
      const { x: vx1, y: vy1 } = Direction.toVector(startDir);
      const { x: vx2, y: vy2 } = Direction.toVector(endDir);

      const stalk1x = startX + vx1 * stalkLength;
      const stalk1y = startY + vy1 * stalkLength;
      const stalk2x = endX + vx2 * stalkLength;
      const stalk2y = endY + vy2 * stalkLength;

      pathD = `M ${startX} ${startY} L ${stalk1x} ${stalk1y} L ${stalk2x} ${stalk2y} L ${endX} ${endY}`;
    }

    const strokeDash = dashArray !== 'none' ? ` stroke-dasharray="${dashArray}"` : '';
    parts.push(`    <path d="${pathD}" fill="none" stroke="${conn.color}" stroke-width="${conn.lineWidth}" stroke-linecap="round" stroke-linejoin="round"${strokeDash}/>`);

    // One-way arrows
    if (conn.oneWay) {
      // Draw arrow at 50% along the path
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const angle = Math.atan2(endY - startY, endX - startX);

      const arrowSize = 8;
      const arrowPoints = this.getArrowPoints(midX, midY, angle, arrowSize);
      parts.push(`    <polygon points="${arrowPoints}" fill="${conn.color}"/>`);
    }

    // Connector name label
    if (conn.name) {
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const fontSize = this.map.settings.basic.fontSize * 0.7;
      const fontFamily = this.map.settings.basic.fontFamily;
      const padding = 4;
      const textWidth = conn.name.length * fontSize * 0.6;

      parts.push(`    <rect x="${midX - textWidth / 2 - padding}" y="${midY - fontSize / 2 - padding}" width="${textWidth + padding * 2}" height="${fontSize + padding * 2}" fill="white" stroke="black" stroke-width="1" rx="3"/>`);
      parts.push(`    <text x="${midX}" y="${midY}" text-anchor="middle" dominant-baseline="middle" font-size="${fontSize}" font-family="${fontFamily}">${this.escapeXml(conn.name)}</text>`);
    }

    parts.push(`  </g>`);

    return parts.join('\n');
  }

  //
  // Get arrow polygon points.
  //
  private getArrowPoints(x: number, y: number, angle: number, size: number): string {
    const points: { x: number, y: number }[] = [
      { x: x + Math.cos(angle) * size, y: y + Math.sin(angle) * size },
      { x: x + Math.cos(angle + 2.5) * size, y: y + Math.sin(angle + 2.5) * size },
      { x: x + Math.cos(angle - 2.5) * size, y: y + Math.sin(angle - 2.5) * size }
    ];
    return points.map(p => `${p.x},${p.y}`).join(' ');
  }

  //
  // Download the SVG as a file.
  //
  private download(svg: string) {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    let title = this.map.title;
    if (!title) title = "untitled";

    // Use same download mechanism as PNG export
    if ((navigator as any).msSaveBlob) {
      (navigator as any).msSaveBlob(blob, `${title}.svg`);
    } else {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${title}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
