import { Map } from "../../models";
import { Direction, ConnectorType } from "../../enums/";
import { CodeGenerator } from "../CodeGenerator";

export class Alan2Generator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map); 
    Handlebars.registerHelper('className', (name:string) => { return this.className(name); }); 
    Handlebars.registerHelper('dirToStr', (dir:Direction, type: ConnectorType) => { return this.dirToStr(dir, type); }); 
    Handlebars.registerHelper('objName', (name:string) => { return this.objName(name); });
  } 
  
  protected objName(name: string): string {
    let str = "";
    let words = name.split(' ');
    words.forEach((word) => {
      str = str + "'" + word.trim().replace("'", "''") + "' ";
    });
    return str;
  }  

  public generate(): string { 
    return Handlebars.templates.alan2({ map: this.map });
  }
}