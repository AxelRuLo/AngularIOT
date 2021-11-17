import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket:Socket;


  constructor() { 
    this.socket = io("http://54.152.37.54:3000")
  }

  // EMITTER 
  sendMessage(msg: string) {
    this.socket.emit('message', msg );
  }

  // HANDLER example
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }
}
