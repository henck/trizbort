export enum ConnectorType {
  Default,
  In,
  Out,
  Up,
  Down
}

//
// Add a static toString method to ConnectorType, so you
// can write ConnectorType.toString(type)
// 
export namespace ConnectorType {
  /**
   * Convert a ConnectorType to a string.
   * @param type ConnectorType to convert
   */
  export function toString(type: ConnectorType): string {
    switch(type) {
      case ConnectorType.In:   return 'in';
      case ConnectorType.Out:  return 'out';
      case ConnectorType.Up:   return 'up';
      case ConnectorType.Down: return 'dn';
      default:
        return '';
    }
  }
}