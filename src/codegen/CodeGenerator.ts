import { Map } from "../models/map";

export class CodeGenerator {
  protected map: Map;

  constructor(map: Map) {
    this.map = map;
    Handlebars.registerHelper('className', (str:string) => { return this.className(str); });
  }

  protected removeAccents(str: string): string {
    if (typeof str !== "string") return str; 
    const accents = "ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź";
    const accentsOut = "AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz";
    return str
      .split("")
      .map((letter, index) => {
        const accentIndex = accents.indexOf(letter);
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
      })
      .join("");
  }

  protected removeSpecialChars(str: string): string {
    if (typeof str !== "string") return str; 
    return str.replace(/[^\w\s]/gi, '');
  }

  protected camelCase(str: string): string {
    if (typeof str !== "string") return str; 
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match: string, reg1: string, reg2: string) { 
      if (typeof reg2 !== "undefined" && reg2) {
          return reg2.toUpperCase();
      } else {
          return reg1.toLowerCase();
      }
    });    
  }

  protected capitalize(str: string): string {
    if (typeof str !== "string") return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  protected className(str: string) {
    return this.capitalize(this.camelCase(this.removeSpecialChars(this.removeAccents(str))));
  }  
}