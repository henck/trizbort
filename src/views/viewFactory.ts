import { Model } from "../models/model";
import { Room } from "../models/room";
import { Note } from "../models/note";
import { Connector } from "../models/connector";
import { View } from "./view";
import { RoomView } from "./roomView";
import { NoteView } from "./noteView";
import { ConnectorView } from "./connectorView";
import { Block } from "../models/block";
import { BlockView } from "./blockView";

export class ViewFactory
{
  // Given a Model instance, return a View for it.
  public static create(model: Model): View {
    if(model instanceof Room) return new RoomView(model);
    if(model instanceof Note) return new NoteView(model);
    if(model instanceof Connector) return new ConnectorView(model);
    if(model instanceof Block) return new BlockView(model);
    throw("No view registered for model.");
  }
}