import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Connector } from "../../models/connector";
import { Model } from "../../models/model";
import { Direction, ObjectKind } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";
import { Obj } from "../../models/obj";

export class QuestGenerator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map);
    Handlebars.registerHelper('isStartRoom', (room: Room) => { return room.isStartRoom(); });
    Handlebars.registerHelper('dirToStr', (dir:Direction) => { return this.dirToStr(dir); }); 
    Handlebars.registerPartial('questObject', Handlebars.templates.questObject);
  }

  public generate() {
    console.log(Handlebars.templates.quest({ map: this.map })); 
  }
}