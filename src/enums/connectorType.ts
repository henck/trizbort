export enum ConnectorType {
  Default,
  In,
  Out,
  Up,
  Down
}

export namespace ConnectorType {
  export function toString(type: ConnectorType) {
    switch(type) {
      case ConnectorType.In: return 'in';
      case ConnectorType.Out: return 'out';
      case ConnectorType.Up: return 'up';
      case ConnectorType.Down: return 'dn';
      default:
        return '';
    }
  }
}