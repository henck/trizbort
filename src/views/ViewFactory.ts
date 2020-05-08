import { Model } from "../models/model";
import { Room } from "../models/room";
import { Note } from "../models/note";
import { Block } from "../models/block";
import { Connector } from "../models/connector";

import { View } from "./View";
import { RoomView } from "./RoomView";
import { NoteView } from "./NoteView";
import { ConnectorView } from "./ConnectorView";
import { BlockView } from "./BlockView";

export class ViewFactory
{
  /**
   * Given a `Model` instance, return a `View` for it.
   * If a View doesn't exist for the Model, an exception is thrown.
   */ 
  public static create(model: Model): View {
    if(model instanceof Room) return new RoomView(model);
    if(model instanceof Note) return new NoteView(model);
    if(model instanceof Connector) return new ConnectorView(model);
    if(model instanceof Block) return new BlockView(model);
    throw("No view registered for model.");
  }
}