import { Model, Map, Room, Note, Connector, Block, MapSettings } from '../models'

export class MapJSON {

  static save(map: Map): string {
    // Generate unique keys for all map elements.
    let id = 1;
    map.elements.forEach((elem) => elem.id = id++);

    // Convert the map to JSON. During the conversion, with replace
    // the dockStart and dockEnd properties of Connector with ID numbers
    // using a replacer function.
    // Also, the map property of the map elements is not saved, nor is the
    // _dirty field.
    let json = JSON.stringify(map, function(key, value) {
      // In the replacer, the value of "this" is the object being serialized.
      if(key == 'map') return undefined;    // avoid circular references to map.
      if(key == '_dirty') return undefined; // do not save _dirty field.
      if(key == '_dockStart' || key == 'dockStart') { // replace room references with IDs
        if(this._dockStart == null) return 0;
        return this._dockStart.id; 
      }
      if(key == '_dockEnd' || key == 'dockEnd') { // replace room references with IDs
        if(this._dockEnd == null) return 0;
        return this._dockEnd.id; 
      }
      if(key == '_startRoom' || key == 'startRoom') { // replace room references with IDs
        if(this._startRoom == null) return 0;
        return this._startRoom.id;
      }
      return value;
    });

    return json;
  }

  //
  // Copy fields from a source object into a target object.
  //
  static clone(target: Object, source: Object): Object {
    let keys = Object.keys(source);
    for(var i = 0; i < keys.length; i++) {
      (<any>target)[keys[i]] = (<any>source)[keys[i]];
    }
    return target;
  }

  //
  // Given a JSON string, parse it into a Map instance.
  //
  static load(text: string): Map {
    // Parse the JSON string. It will return a tree of ordinary objects,
    // not instances of Map, Room or Connector.
    // We clone the root object into a Map instance.
    let map: Map = <Map> this.clone(new Map(), JSON.parse(text));

    // The map settings object is an ordinary object. 
    // Clone it into a real MapSettings instance.
    map.settings = new MapSettings().cloneFrom(map.settings);

    // The elements array of the Map now contains a list of ordinary objects.
    // We remove the list contents from the Map, then loop through the list
    // to create a new list with Room and Connector instances based on the 
    // "type" field of each list element.
    let elements = map.elements;
    map.elements = [];
    elements.forEach((element) => {
      let model: Model = null;
      let type = (element.type || element["_type"]); // _type is protected but present in the json
      switch(type) {
        case 'Room': model = Room.load(map.settings, element); break;
        case 'Note': model = Note.load(map.settings, element); break;
        case 'Block': model = Block.load(map.settings, element); break;
        case 'Connector': model = Connector.load(map.settings, element); break;
        default:
          throw(new TypeError(`Element type ${type} is unknown.`));
      }
      map.add(model);
    });

    // The startRoom property still contains a room ID. 
    // If the ID is not 0, replace it with an actual room.
    // Otherwise set to null.
    if(map.startRoom) {
      map.startRoom = map.findById(<any> map.startRoom, Room) as Room;
    } else {
      map.startRoom = null;
    }

    // The connectors still contain IDs for dockStart and dockEnd references.
    // Loop through all map elements,converting Connectors' dockStart and 
    // dockEnd IDs to references.
    map.elements.forEach((elem) => {
      if(elem instanceof Connector) {
        if(<any> elem.dockStart != 0) { 
          elem.dockStart = map.findById(<any> elem.dockStart, Room) as Room;
        } else {
          elem.dockStart = null;
        }
        if(<any> elem.dockEnd != 0) {
          elem.dockEnd = map.findById(<any> elem.dockEnd, Room) as Room;
        } else {
          elem.dockEnd = null;
        }
      } 
    });

    // Return the parsed map instance.
    return map;
  }
}
