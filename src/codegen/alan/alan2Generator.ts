import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Connector } from "../../models/connector";
import { Model } from "../../models/model";
import { Direction, ObjectKind } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";
import { Obj } from "../../models/obj";

export class Alan2Generator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map); 
    Handlebars.registerHelper('className', (name:string) => { return this.className(name); }); 
    Handlebars.registerHelper('dirToStr', (dir:Direction) => { return this.dirToStr(dir); }); 
  }

  public generate() {
    console.log(Handlebars.templates.alan({ map: this.map }));
  }
}