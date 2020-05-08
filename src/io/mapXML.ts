import { Map, Room, Connector } from '../models'
import { Direction, LineStyle, RoomShape } from '../enums'

export class MapXMLLoader {

  private static getAttr(node: Element, name: string, defaultValue: any, transform?: (s: string) => any) {
    // Get attribute.
    let attr = node.getAttribute(name);
    // If attribute does not exist or is empty, return the default value.
    if(!attr) return defaultValue;
    // Transform the attribute if a transform function was given.
    if(transform) attr = transform(attr);
    // Return the attribute's value.
    return attr;
  }

  private static getContent(node: Element, path: string, defaultValue: any, transform?: (s: string) => any) {
    // Find the node using the path:
    let subnode = node.querySelector(path);
    // If the node does not exist, return the default value.
    if(!subnode) return defaultValue;
    // Get the node's text value
    let value = subnode.textContent;
    // Transform the value if a transform function was given.
    if(transform) value = transform(value);
    // Return the (transformed) value:
    return value;
  }

  private static loadRoom(map: Map, node: Element) {
    /* let r = new Room();
    XmlMap.load(r, node);
    console.log("xml loaded", r); */

    let room = new Room(map.settings);
    map.add(room);
    room.id = this.getAttr(node, 'id', 0, parseInt);
    room.x = this.getAttr(node, 'x', 0, parseFloat);
    room.y = this.getAttr(node, 'y', 0, parseFloat);
    room.name = this.getAttr(node, 'name', '');
    room.subtitle = this.getAttr(node, 'subtitle', '');
    room.description = this.getAttr(node, 'description', '');
    room.width = this.getAttr(node, 'w', map.settings.room.width, parseFloat);
    room.height = this.getAttr(node, 'h', map.settings.room.height, parseFloat);
    room.lineStyle = this.getAttr(node, 'borderstyle', map.settings.room.lineStyle, (s:string) => { return LineStyle.fromString(s); });
    room.dark = this.getAttr(node, 'isDark', false, (s:string) => { return s == 'yes'; });
    room.endroom = this.getAttr(node, 'isEndRoom', false, (s:string) => { return s == 'yes'; });
    room.fillColor = this.getAttr(node, 'roomFill', map.settings.room.fillColor);
    room.borderColor = this.getAttr(node, 'roomBorder', map.settings.room.borderColor);
    room.nameColor = this.getAttr(node, 'roomLargeText', map.settings.room.nameColor);
    room.subtitleColor = this.getAttr(node, 'roomSubtitleColor', map.settings.room.subtitleColor);
    room.rounding = this.getAttr(node, 'cornerTopLeft', map.settings.room.rounding, parseInt);

    // Room shapes:
    if(node.getAttribute('ellipse') == 'yes') room.shape = RoomShape.Ellipse;
    if(node.getAttribute('octagonal') == 'yes') room.shape = RoomShape.Octagon;
  }

  private static loadConnector(map: Map, node: Element) {
    let connector = new Connector(map.settings);
    map.add(connector);
    connector.id = this.getAttr(node, 'id', 0, parseInt)
    connector.name = this.getAttr(node, 'name', '');
    // Trizbort seems to support only solid and dotted (called "dashed") lines.
    connector.lineStyle = this.getAttr(node, 'style', map.settings.connector.lineStyle, (s:string) => { return s == 'dashed' ? LineStyle.Dash : LineStyle.Solid; });

    let dockNodes = node.querySelectorAll('dock');
    let startDone = false;
    for(let d = 0; d < node.children.length; d++) {
      let childNode = node.children[d];
      if(childNode.nodeName == 'dock') {
        let room = map.findById(parseInt(childNode.getAttribute('id')), Room) as Room;
        let dir = Direction.fromString(childNode.getAttribute('port'));
        if(!startDone) {
          connector.dockStart = room;
          connector.startDir = dir;            
          startDone = true;
        } else {
          connector.dockEnd = room;
          connector.endDir = dir;
        }
      } else if(childNode.nodeName == 'point') {
        let x = parseFloat(childNode.getAttribute('x'));
        let y = parseFloat(childNode.getAttribute('y'));
        if(!startDone) {
          connector.startX = x;
          connector.startY = y;
          startDone = true;
        } else {
          connector.endX = x;
          connector.endY = y;
        }          
      }
    }
  }

  static load(text: string): Map {
    // Parse XML to Document.
    let xml: Document = new DOMParser().parseFromString(text, 'text/xml');

    // Create an empty map.
    let map: Map = new Map();
    let mapNode = xml.querySelector('map');
    let trizbort = xml.querySelector('trizbort');

    // Process map
    map.title = this.getContent(trizbort, 'info title', '');
    map.author = this.getContent(trizbort, 'info author', '');
    map.description = this.getContent(trizbort, 'info description', '');
    map.settings.grid.visible = this.getContent(trizbort, 'settings grid visible', map.settings.grid.visible, (s: string) => { return s == 'yes' });
    map.settings.grid.origin = this.getContent(trizbort, 'settings grid showOrigin', map.settings.grid.origin, (s: string) => { return s == 'yes' });
    map.settings.grid.snap = this.getContent(trizbort, 'settings grid snapTo', map.settings.grid.snap, (s: string) => { return s == 'yes' });
    map.settings.grid.size = this.getContent(trizbort, 'settings grid size', map.settings.grid.size, parseInt);

    map.settings.room.borderColor = this.getContent(trizbort, 'settings colors border', map.settings.room.borderColor);
    map.settings.room.subtitleColor = this.getContent(trizbort, 'settings colors subTitle', map.settings.room.subtitleColor);
    map.settings.room.startRoomColor = this.getContent(trizbort, 'settings colors startRoom', map.settings.room.startRoomColor);
    map.settings.room.endRoomColor = this.getContent(trizbort, 'settings colors endRoom', map.settings.room.endRoomColor);
    map.settings.room.shape = this.getContent(trizbort, 'settings rooms defaultRoomShape', map.settings.room.shape, (s: string) => { let x = parseInt(s); if(x > 0) x--; return x; });

    map.settings.connector.color = this.getContent(trizbort, 'settings colors line', map.settings.connector.color);
    map.settings.connector.lineWidth = this.getContent(trizbort, 'settings lines width', map.settings.connector.lineWidth, parseInt);
    map.settings.connector.stalk = this.getContent(trizbort, 'settings rooms connectionStalkLength', map.settings.connector.stalk, parseInt);

    // Process rooms.
    let roomNodes = mapNode.querySelectorAll("room");
    for(let i = 0; i < roomNodes.length; i++) {
      this.loadRoom(map, roomNodes[i]);
    }

    // Process connectors.
    let connectorNodes = mapNode.querySelectorAll("line");
    for(let i = 0; i < connectorNodes.length; i++) {
      this.loadConnector(map, connectorNodes[i]);
    }

    return map;
  }    
}
