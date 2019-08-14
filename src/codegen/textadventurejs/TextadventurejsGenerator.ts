import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Connector } from "../../models/connector";
import { Model } from "../../models/model";
import { Direction, ObjectKind } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";
import { Obj } from "../../models/obj";

export class TextadventurejsGenerator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map);  
    Handlebars.registerHelper('capitalizeDirToStr', (dir: Direction) => { return this.capitalize(this.dirToStr(dir)); });
    Handlebars.registerHelper('className', (name:string) => { return this.className(name); }); 
    Handlebars.registerHelper('dirToStr', (dir:Direction) => { return this.dirToStr(dir); }); 
    Handlebars.registerHelper('kindToStr', (kind:ObjectKind) => { return this.kindToStr(kind); }); 
    // Handlebars.registerPartial('tadsObject', Handlebars.templates.tadsObject);
    Handlebars.registerHelper('buildObject', (obj: Obj) => { 
      return this.buildObject(obj); 
    });
  }

  protected kindToStr(dir: ObjectKind): string {
    switch(dir) {
      case ObjectKind.Actor:   return "Actor";
      case ObjectKind.Item:   return "Item";
      case ObjectKind.Scenery:   return "Decoration";
      default: return "";
    }     
  }

  protected buildObject(obj: Obj, level?: number) {
    if(!level) level = 1;
    let str = "";
    for(let i = 0; i < level; i++) str += "+";
    str = str + Handlebars.templates.tadsObject({ obj: obj });
    obj.content.forEach((o) => {
      str = str + this.buildObject(o, level + 1);
    });
    return new Handlebars.SafeString(str);
  }

  public generate() : string {
    return Handlebars.templates.textadventurejs({ map: this.map });
  }
}