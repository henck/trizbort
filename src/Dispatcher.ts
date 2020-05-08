import { AppEvent } from './enums/'

export interface Subscriber {
  notify(event: AppEvent, obj: any) : void;
}

export class Dispatcher
{
  static subscribers: Subscriber[] = new Array<Subscriber>();

  // Attach a new subscriber
  static subscribe(subscriber: Subscriber) {
    Dispatcher.subscribers.push(subscriber);
  }

  // Remove a subscriber
  static unsubscribe(subscriber: Subscriber) {
    Dispatcher.subscribers.splice(Dispatcher.subscribers.indexOf(subscriber), 1);
  }

  // Notify all subscribers of an event occurring on a model
  static notify(event: AppEvent, obj: any) {
    for(let i = 0; i < Dispatcher.subscribers.length; i++) {
      Dispatcher.subscribers[i].notify(event, obj);
    }
  }
}