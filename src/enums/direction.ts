export enum Direction {
  N    = 0,
  NNE  = 1,
  NE   = 2,
  ENE  = 3,
  E    = 4,
  ESE  = 5,
  SE   = 6,
  SSE  = 7,
  S    = 8,
  SSW  = 9,
  SW   = 10,
  WSW  = 11,
  W    = 12,
  WNW  = 13,
  NW   = 14,
  NNW  = 15
}

export namespace Direction {
  /**
   * Return opposite of Direction.
   * @param direction Direction to evaluate
   * @returns Opposite of direction
   */
  export function opposite(direction: Direction): Direction {
    switch(direction) {
      case Direction.N:   return Direction.S;
      case Direction.NNE: return Direction.SSW;
      case Direction.NE:  return Direction.SW;
      case Direction.ENE: return Direction.WSW;
      case Direction.E:   return Direction.W;
      case Direction.ESE: return Direction.WNW;
      case Direction.SE:  return Direction.NW;
      case Direction.SSE: return Direction.NNW;
      case Direction.S:   return Direction.N;
      case Direction.SSW: return Direction.NNE;
      case Direction.SW:  return Direction.NE;
      case Direction.WSW: return Direction.ENE;
      case Direction.W:   return Direction.E;
      case Direction.WNW: return Direction.ESE;
      case Direction.NW:  return Direction.SE;
      case Direction.NNW: return Direction.SSE; 
    }
  }
  /**
   * Is this Direction a cardinal direction? 
   * NNE, ENE etc. are not cardinal directions.
   * @param direction Direction to evaluate
   * @returns True if cardinal direction, false if not
   */
  export function isCardinal(direction: Direction): boolean {
    switch(direction) {
      case Direction.N:
      case Direction.NE:
      case Direction.E:
      case Direction.SE:
      case Direction.S:
      case Direction.SW:
      case Direction.W:
      case Direction.NW:
        return true;
    }
    return false;
  }
  /**
   * Convert direction into a vector.
   * Non-cardinal compass directions are converted to cardinal vectors.
   * That is, NNE become N, ENE becomes E etc.
   * @param direction Direction to convert
   * @returns Vector, with x,y values between -1 and 1.
   */ 
  export function toCardinalVector(direction: Direction): {x: number, y: number} {
    switch(direction) {
      case Direction.N:   return { x: 0, y: -1 };
      case Direction.NNE: return { x: 0, y: -1 };
      case Direction.NE:  return { x: 1, y: -1 };
      case Direction.ENE: return { x: 1, y: 0 };
      case Direction.E:   return { x: 1, y: 0 };
      case Direction.ESE: return { x: 1, y: 0 };
      case Direction.SE:  return { x: 1, y: 1 };
      case Direction.SSE: return { x: 0, y: 1 };
      case Direction.S:   return { x: 0, y: 1 };
      case Direction.SSW: return { x: 0, y: 1 };
      case Direction.SW:  return { x: -1, y: 1 };
      case Direction.WSW: return { x: -1, y: 0 };
      case Direction.W:   return { x: -1, y: 0 };
      case Direction.WNW: return { x: -1, y: 0 };
      case Direction.NW:  return { x: -1, y: -1 };
      case Direction.NNW: return { x: 0, y: -1 };
    }
  }
  /**
   * Convert Direction into a vector. 
   * @param direction Direction to convert
   * @returns Vector object, with x,y values between -1 and 1.
   */
  export function toVector(direction: Direction): {x: number, y: number} {
    switch(direction) {
      case Direction.N:   return { x: 0, y: -1 };
      case Direction.NNE: return { x: 0.5, y: -1 };
      case Direction.NE:  return { x: 1, y: -1 };
      case Direction.ENE: return { x: 1, y: -0.5 };
      case Direction.E:   return { x: 1, y: 0 };
      case Direction.ESE: return { x: 1, y: 0.5 };
      case Direction.SE:  return { x: 1, y: 1 };
      case Direction.SSE: return { x: 0.5, y: 1 };
      case Direction.S:   return { x: 0, y: 1 };
      case Direction.SSW: return { x: -0.5, y: 1 };
      case Direction.SW:  return { x: -1, y: 1 };
      case Direction.WSW: return { x: -1, y: 0.5 };
      case Direction.W:   return { x: -1, y: 0 };
      case Direction.WNW: return { x: -1, y: -0.5 };
      case Direction.NW:  return { x: -1, y: -1 };
      case Direction.NNW: return { x: -0.5, y: -1 };
    }
  }  
  /**
   * Convert Direction into an angle expressed in radians (E = 0).
   * This is used for determining points on ellipses.
   * @param direction Directon to convert
   * @returns Radians value
   */ 
  export function toRadians(direction: Direction): number {
    switch(direction) {
      case Direction.N:   return Math.PI * 12/8;
      case Direction.NNE: return Math.PI * 13/8;
      case Direction.NE:  return Math.PI * 14/8;
      case Direction.ENE: return Math.PI * 15/8;
      case Direction.E:   return Math.PI * 0/8;
      case Direction.ESE: return Math.PI * 1/8;
      case Direction.SE:  return Math.PI * 2/8;
      case Direction.SSE: return Math.PI * 3/8;
      case Direction.S:   return Math.PI * 4/8;
      case Direction.SSW: return Math.PI * 5/8;
      case Direction.SW:  return Math.PI * 6/8;
      case Direction.WSW: return Math.PI * 7/8;
      case Direction.W:   return Math.PI * 8/8;
      case Direction.WNW: return Math.PI * 9/8;
      case Direction.NW:  return Math.PI * 10/8;
      case Direction.NNW: return Math.PI * 11/8;
    }
  }
  /**
   * Convert a Direction to a HTML cursor.
   * @param direction Direction
   */
  export function toCursor(direction: Direction) {
    switch(direction) {
      case Direction.N:   return 'n-resize';
      case Direction.NE:  return 'ne-resize';
      case Direction.E:   return 'e-resize';
      case Direction.SE:  return 'se-resize';
      case Direction.S:   return 's-resize';
      case Direction.SW:  return 'sw-resize';
      case Direction.W:   return 'w-resize';
      case Direction.NW:  return 'nw-resize';
    }
  }  
  /**
   * Convert a string to a Direction
   * @param s String to convert, e.g. 'n' or 'nne'. Case insensitive.
   * @returns Direction, or undefined if conversion failed.
   */
  export function fromString(s: string): Direction {
    s = s.toLowerCase();
    if(s == 'n') return Direction.N;
    if(s == 'nne') return Direction.NNE;
    if(s == 'ne') return Direction.NE;
    if(s == 'ene') return Direction.ENE;
    if(s == 'e') return Direction.E;
    if(s == 'ese') return Direction.ESE;
    if(s == 'se') return Direction.SE;
    if(s == 'sse') return Direction.SSE;
    if(s == 's') return Direction.S;
    if(s == 'ssw') return Direction.SSW;
    if(s == 'sw') return Direction.SW;
    if(s == 'wsw') return Direction.WSW;
    if(s == 'w') return Direction.W;
    if(s == 'wnw') return Direction.WNW;
    if(s == 'nw') return Direction.NW;
    if(s == 'nnw') return Direction.NNW;
    return undefined;
  }
}