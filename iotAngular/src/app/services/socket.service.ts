import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {



  constructor( private db:AngularFireDatabase) { 

  }

  sendMessage (message: string) {
    // Get current timestamp
     const currTime = Number (new Date());
    // Convert timestamp into readable time string
     const readableTime = new Date(currTime).toLocaleTimeString();
    // Convert timestamp into readable date
     const readableDate = new Date(currTime).toDateString();
     // Push new message to messages list with time and date data
     this.db.list( "MyHome/Dispositivo/Luz_1").push({ message, time: readableTime, date: readableDate });
    // Update messages meta data
     this.db.object('MyHome/Dispositivo/Luz_1').update( {'last_updated at': currTime})
   }

   getRealtimeDbMessages(): Observable<any> {
    // Return Observable that is fired whenever an item in the messages list path in
    // the realtime db changes.
     return this.db.list('MyHome/Dispositivo/Luz_1').valueChanges ();
   }
}
