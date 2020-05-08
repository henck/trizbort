import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Direction, ConnectorType } from "../../enums";
import { CodeGenerator } from "../CodeGenerator";

export class QuestGenerator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map);
    Handlebars.registerHelper('isStartRoom', (room: Room) => { return room.isStartRoom(); });
    Handlebars.registerHelper('dirToStr', (dir:Direction, type:ConnectorType) => { return this.dirToStr(dir, type); }); 
    Handlebars.registerPartial('questObject', Handlebars.templates.questObject);
    Handlebars.registerHelper('gridWidth', (width: number) => { return Math.max(1, Math.floor(width / map.settings.room.width)); });
    Handlebars.registerHelper('gridLength', (height: number) => { return Math.max(1, Math.floor(height / map.settings.room.height)); });
  }

  public generate() : string {
    return Handlebars.templates.quest({ map: this.map }); 
  }
}