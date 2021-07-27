import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs/Rx';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  ws: WebSocket;

  createObservableSocket(url: string) {

    this.ws = new WebSocket(url);

    return new Observable(
      observer => {

        this.ws.onmessage = (event) =>
          observer.next(event.data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (event) => observer.complete();

      }
    );
  }

  sendMessage(message: any) {
    this.ws.send(message);
  }




}
