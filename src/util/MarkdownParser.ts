//
// Simple markdown parser for bold and italic only.
// Supports: **bold**, __bold__, *italic*, _italic_
//

export interface TextSegment {
  text: string;
  bold: boolean;
  italic: boolean;
}

export class MarkdownParser {
  //
  // Parse text into segments with bold/italic formatting.
  //
  static parse(text: string): TextSegment[] {
    const segments: TextSegment[] = [];
    let remaining = text;
    let pos = 0;

    while (pos < remaining.length) {
      // Try to match **bold**
      if (remaining.substring(pos, pos + 2) === '**') {
        const endPos = remaining.indexOf('**', pos + 2);
        if (endPos !== -1) {
          // Add any text before this
          if (pos > 0) {
            segments.push({ text: remaining.substring(0, pos), bold: false, italic: false });
          }
          // Add bold text
          segments.push({ text: remaining.substring(pos + 2, endPos), bold: true, italic: false });
          remaining = remaining.substring(endPos + 2);
          pos = 0;
          continue;
        }
      }

      // Try to match __bold__
      if (remaining.substring(pos, pos + 2) === '__') {
        const endPos = remaining.indexOf('__', pos + 2);
        if (endPos !== -1) {
          if (pos > 0) {
            segments.push({ text: remaining.substring(0, pos), bold: false, italic: false });
          }
          segments.push({ text: remaining.substring(pos + 2, endPos), bold: true, italic: false });
          remaining = remaining.substring(endPos + 2);
          pos = 0;
          continue;
        }
      }

      // Try to match *italic* (single asterisk, not double)
      if (remaining[pos] === '*' && remaining[pos + 1] !== '*') {
        const endPos = this.findSingleChar(remaining, '*', pos + 1);
        if (endPos !== -1) {
          if (pos > 0) {
            segments.push({ text: remaining.substring(0, pos), bold: false, italic: false });
          }
          segments.push({ text: remaining.substring(pos + 1, endPos), bold: false, italic: true });
          remaining = remaining.substring(endPos + 1);
          pos = 0;
          continue;
        }
      }

      // Try to match _italic_ (single underscore, not double)
      if (remaining[pos] === '_' && remaining[pos + 1] !== '_') {
        const endPos = this.findSingleChar(remaining, '_', pos + 1);
        if (endPos !== -1) {
          if (pos > 0) {
            segments.push({ text: remaining.substring(0, pos), bold: false, italic: false });
          }
          segments.push({ text: remaining.substring(pos + 1, endPos), bold: false, italic: true });
          remaining = remaining.substring(endPos + 1);
          pos = 0;
          continue;
        }
      }

      pos++;
    }

    // Add any remaining text
    if (remaining.length > 0) {
      segments.push({ text: remaining, bold: false, italic: false });
    }

    return segments.length > 0 ? segments : [{ text: '', bold: false, italic: false }];
  }

  //
  // Find a single character that's not doubled.
  //
  private static findSingleChar(text: string, char: string, startPos: number): number {
    for (let i = startPos; i < text.length; i++) {
      if (text[i] === char) {
        // Make sure it's not doubled
        if (text[i + 1] !== char) {
          return i;
        }
        // Skip the double
        i++;
      }
    }
    return -1;
  }

  //
  // Get plain text (strips formatting markers).
  //
  static toPlainText(segments: TextSegment[]): string {
    return segments.map(s => s.text).join('');
  }
}
