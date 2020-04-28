import { ObjectKind } from "../enums/enums";
import { Model } from "./model";

export class Obj extends Model {
  protected _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this._changed = true;
  }
  
  protected _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
    this._changed = true;
  }
  protected _content: Array<Obj>;
  public get content(): Array<Obj> {
    return this._content;
  }
  public set content(value: Array<Obj>) {
    this._content = value;
    this._changed = true;
  }
  protected _kind: ObjectKind;
  public get kind(): ObjectKind {
    return this._kind;
  }
  public set kind(value: ObjectKind) {
    this._kind = value;
    this._changed = true;
  }

  constructor() {
    super();
    this._name = "Object";
    this._type = "Object";
    this._description = "";
    this._kind = ObjectKind.Item;
    this._content = new Array<Obj>();
  }
}