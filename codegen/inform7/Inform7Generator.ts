import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Direction, ConnectorType } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";

export class Inform7Generator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map);

    Handlebars.registerHelper('validName', (str:string) => { return new Handlebars.SafeString(this.removeSpecialChars(str)); });
    Handlebars.registerHelper('capitalize', (str: string) => { return new Handlebars.SafeString(this.capitalize(str)); });
    Handlebars.registerHelper('dirToStr', (dir:Direction, type: ConnectorType) => { return this.dirToStr(dir, type); });  
    Handlebars.registerHelper('isStartRoom', (room: Room) => { return room.isStartRoom(); });
    Handlebars.registerPartial('inform7Object', Handlebars.templates.inform7Object);
  }
 
  public generate(): string {
    return Handlebars.templates.inform7({ map: this.map });
  }
}