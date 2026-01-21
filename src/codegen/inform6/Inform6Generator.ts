import { Map, Room } from "../../models";
import { Direction, ConnectorType } from "../../enums";
import { CodeGenerator } from "../CodeGenerator";

export class Inform6Generator extends CodeGenerator {

  constructor(map: Map) {
    super(map);

    Handlebars.registerHelper('i6ValidName', (str: string) => { return new Handlebars.SafeString(this.toIdentifier(str)); });
    Handlebars.registerHelper('i6DirProp', (dir: Direction, type: ConnectorType) => { return this.dirToProp(dir, type); });
    Handlebars.registerHelper('i6IsStartRoom', (room: Room) => { return room.isStartRoom(); });
    Handlebars.registerPartial('inform6Object', Handlebars.templates.inform6Object);
  }

  public generate(): string {
    return Handlebars.templates.inform6({ map: this.map });
  }

  // Convert a string to a valid Inform 6 identifier (no spaces, starts with letter)
  private toIdentifier(str: string): string {
    if (typeof str !== "string") return str;
    // Remove accents, special chars, convert spaces to underscores
    let result = this.removeAccents(str)
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '_');
    // Ensure it starts with a letter
    if (result && /^[0-9]/.test(result)) {
      result = '_' + result;
    }
    return result;
  }

  // Convert direction and connector type to Inform 6 property name
  private dirToProp(dir: Direction, type: ConnectorType): string {
    // Special connections
    switch (type) {
      case ConnectorType.Down: return "d_to";
      case ConnectorType.Up: return "u_to";
      case ConnectorType.In: return "in_to";
      case ConnectorType.Out: return "out_to";
    }
    // Compass directions
    switch (dir) {
      case Direction.N: return "n_to";
      case Direction.NNE: return "n_to";  // Inform 6 doesn't have NNE, map to nearest
      case Direction.NE: return "ne_to";
      case Direction.ENE: return "e_to";
      case Direction.E: return "e_to";
      case Direction.ESE: return "e_to";
      case Direction.SE: return "se_to";
      case Direction.SSE: return "s_to";
      case Direction.S: return "s_to";
      case Direction.SSW: return "s_to";
      case Direction.SW: return "sw_to";
      case Direction.WSW: return "w_to";
      case Direction.W: return "w_to";
      case Direction.WNW: return "w_to";
      case Direction.NW: return "nw_to";
      case Direction.NNW: return "n_to";
      default: return "n_to";
    }
  }
}
