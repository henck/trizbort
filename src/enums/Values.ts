export class Values {
  static readonly ZOOM_FRACTION = 1.2;
  static readonly ZOOM_ADDITIVE = 0.1;

  static readonly COLOR_TRANSPARENT = 'rgba(0,0,0,0.004)';
  static readonly COLOR_LINE = '#000000';
  static readonly COLOR_SELECTED_GLOW = 'rgba(255,215,0,0.5)';
  static readonly COLOR_SELECTED = 'rgb(255,215,0)';
  static readonly COLOR_HOVER = '#FF8C00';
  static readonly COLOR_CONNECTOR = 'rgba(135, 206, 235, 0.5)';
  static readonly COLOR_CONNECTOR_HIGHLIGHT = 'rgb(255,215,0)';
  static readonly COLOR_RESIZE = 'rgba(135, 206, 235, 0.5)';
  static readonly COLOR_RESIZE_HIGHLIGHT = 'rgb(255,215,0)';
  static readonly COLOR_SELECTION_LINE = '#292B71';
  static readonly COLOR_SELECTION_AREA = 'rgba(41, 43, 113, 0.4)';
  static readonly COLOR_STARTROOM = 'green';
  static readonly COLOR_ENDROOM = 'red';

  /**
   * Standard colors that appear in color selection dialogs.
   */
  static readonly COLORS_STANDARD: string[] = [ 
    '#FFFFFF', '#D5E5D6', '#D0E0F2', 
    '#F6D5D5', '#F8DFD0', '#E0DDF6', 
    '#DFDFDF', '#CCCCCC', '#333333', 
    '#000000' ];

  static readonly DIMEN_ROOM_MIN_WIDTH = 64; // stay in values
  static readonly DIMEN_ROOM_MIN_HEIGHT = 32; // stay in values
  static readonly DIMEN_ROOM_MARGIN = 6;
  static readonly DIMEN_STARTROOM_MARGIN = 3;
  static readonly DIMEN_RESIZE_HANDLE = 6;
  static readonly DIMEN_CONNECTOR_HANDLE = 5;
  static readonly DIMEN_CONNECTOR_WIDE = 20;
  static readonly DIMEN_NOTE_FOLD = 15;

  static readonly VIEWS_FIRSTID = 100;
}