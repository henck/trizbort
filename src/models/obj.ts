import { ObjectKind } from "../enums/enums";

export class Obj {
  name: string;
  type: string;
  description: string;
  content: Array<Obj>;
  kind: ObjectKind;

  constructor() {
    this.name = "Object";
    this.type = "Object";
    this.description = "";
    this.kind = ObjectKind.Item;
    this.content = new Array<Obj>();
  }
}