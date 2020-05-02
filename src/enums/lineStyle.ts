export enum LineStyle {
  None,
  Solid,
  Dash,
  DashDot,
  DashDotDot,
  Dot
}

export namespace LineStyle {
  export function fromString(s: string) {
    s = s.toLowerCase();
    if(s == 'none') return LineStyle.None;
    if(s == 'solid') return LineStyle.Solid;
    if(s == 'dash') return LineStyle.Dash;
    if(s == 'dashdot') return LineStyle.DashDot;
    if(s == 'dashdotdot') return LineStyle.DashDotDot;
    if(s == 'dot') return LineStyle.Dot;
    return undefined;
  }
  export function toArray(style: LineStyle) {
    switch(style) {
      case LineStyle.Solid: return []; 
      case LineStyle.Dash: return [8,4]; 
      case LineStyle.DashDot: return [4,4]; 
      case LineStyle.DashDotDot: return [2,3];;
      case LineStyle.Dot: return [3,2,2,2,4,2,2,2,3,2];    
    }
    return [];
  }
}