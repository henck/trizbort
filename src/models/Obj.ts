import { ObjectKind } from "../enums";
import { Model } from "./Model";

export class Obj extends Model {
  protected _name: string;         // Object name, e.g. "bottle of water"
  protected _description: string;  // Object description, e.g. "This bottle gleams in the light..."
  protected _content: Obj[];       // Objects contained within this object
  protected _kind: ObjectKind;     // Kind of object

  constructor() {
    super();
    this._name = "Object";         // Default Obj name
    this._type = "Object";
    this._description = "";
    this._kind = ObjectKind.Item;  // Default Obj type
    this._content = [];            // No subobjects
  }

  /**
   * Load an Obj from a POJO from a JSON source.
   * @param settings Map settings
   * @param src POJO
   */    
  static load(src: object): Obj {
    // Create new Obj:
    let obj = new Obj();
    // Copy fields from POJO into Obj:
    for(let key in src) {
      // Content field is special. Pass it to Obj's POJO loader recursively,
      // to create subobjects.
      if(key == '_content') { 
        obj._content = (src as any)._content.map((x:object) => Obj.load(x));
      } else {
        (obj as any)[key] = (src as any)[key];
      }
    }
    return obj;
  }

  /**
   * Return the object's name, e.g. "Twisty Passage"
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Set the object's name, e.g. "Twisty Passage"
   */
  public set name(value: string) {
    this._name = value;
    this.setDirty();
  }
  
  /**
   * Return the object's description
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Set the object's description
   */
  public set description(value: string) {
    this._description = value;
    this.setDirty();
  }
  
  /** 
   * Returns a list of objects contained in this object.
   */
  public get content(): Obj[] {
    return this._content;
  }

  /**
   * Set the list of objects cotained in this object.
   */
  public set content(value: Obj[]) {
    this._content = value;
    this.setDirty();
  }
  
  /**
   * Return the kind of this object
   * @returns ObjectKind
   */
  public get kind(): ObjectKind {
    return this._kind;
  }

  /**
   * Set the kind of this object
   */
  public set kind(value: ObjectKind) {
    this._kind = value;
    this.setDirty();
  }  
}