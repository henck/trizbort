import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Connector } from "../../models/connector";
import { Model } from "../../models/model";
import { Direction, ObjectKind } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";
import { Obj } from "../../models/obj";

export class Inform7Generator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map);

    Handlebars.registerHelper('validName', (str:string) => { return new Handlebars.SafeString(this.removeSpecialChars(str)); });
    Handlebars.registerHelper('capitalize', (str: string) => { return new Handlebars.SafeString(this.capitalize(str)); });
    Handlebars.registerHelper('dirToStr', (dir:Direction) => { return this.dirToStr(dir); });  
    Handlebars.registerHelper('isStartRoom', (room: Room) => { return room.isStartRoom(); });
    Handlebars.registerPartial('inform7Object', Handlebars.templates.inform7Object);
  }
 
  public generate() {
    console.log(Handlebars.templates.inform7({ map: this.map }));
  }
}