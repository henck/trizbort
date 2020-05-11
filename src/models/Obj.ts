import { ObjectKind } from "../enums";
import { Model } from "./model";

export class Obj extends Model {
  protected _name: string;         // Object name, e.g. "bottle of water"
  protected _description: string;  // Object description, e.g. "This bottle gleams in the light..."
  protected _content: Obj[];       // Objects contained within this object
  protected _kind: ObjectKind;     // Kind of object

  constructor() {
    super();
    this._name = "Object";
    this._type = "Object";
    this._description = "";
    this._kind = ObjectKind.Item;
    this._content = [];
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
    this.dirty();
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
    this.dirty();
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
    this.dirty();
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
    this.dirty();
  }  
}