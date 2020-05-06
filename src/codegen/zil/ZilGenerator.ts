import { Map } from "../../models/map";
import { Direction, ObjectKind, ConnectorType } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";
import { Obj } from "../../models/obj";

export class ZilGenerator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map);  
    Handlebars.registerHelper('zilName', (str: string) => { return this.zilName(str); });
    Handlebars.registerHelper('upperDirToStr', (dir: Direction, type: ConnectorType) => { return this.dirToStr(dir, type).toUpperCase(); });
    Handlebars.registerHelper('dirToStr', (dir:Direction, type: ConnectorType) => { return this.dirToStr(dir, type); }); 
    Handlebars.registerHelper('isItem', (kind:ObjectKind) => { return this.isItem(kind); }); 
    Handlebars.registerPartial('zilObject', Handlebars.templates.zilObject);
  }

  //
  // Returns the kebab-case form of `str`.
  // kekbabCase("hello world") -> "hello-world"
  // 
  protected kebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();    
  }

  //
  // Returns ZIL format of a name.
  // zilName('living room') -> "LIVING-ROOM"
  // 
  protected zilName(str: string) {
    return new Handlebars.SafeString(this.kebabCase(this.removeAccents(str)).toUpperCase());
  }

  protected isItem(kind: ObjectKind): boolean {
    return kind == ObjectKind.Item;
  }

  public generate() : string {
    return Handlebars.templates.zil({ map: this.map });
  }
}