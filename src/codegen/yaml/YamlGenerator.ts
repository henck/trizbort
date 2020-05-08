import { Map } from "../../models";
import { Direction, ObjectKind, ConnectorType } from "../../enums";
import { CodeGenerator } from "../CodeGenerator";

export class YamlGenerator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map); 
    Handlebars.registerHelper('className', (name:string) => { return this.className(name); }); 
    Handlebars.registerHelper('dirToStr', (dir:Direction, type:ConnectorType) => { return this.dirToStr(dir, type); }); 
    Handlebars.registerHelper('kindToStr', (kind:ObjectKind) => { return this.kindToStr(kind); }); 
    Handlebars.registerPartial('DescriptionPartial', Handlebars.templates.yamlDescription);
    Handlebars.registerPartial('yamlObject', Handlebars.templates.yamlObject);
  }

  protected kindToStr(dir: ObjectKind): string {
    switch(dir) {
      case ObjectKind.Actor:   return "actor";
      case ObjectKind.Item:    return "item";
      case ObjectKind.Scenery: return "decoration";
      default: return "";
    }     
  }
  public generate() : string {
    return Handlebars.templates.yaml({ map: this.map });
  }
}