import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  toogle = new FormControl('', []);
  background = document.getElementsByClassName(".hijo")
  titulo = document.getElementsByClassName(".texto")
  bandera = false

  constructor(private socketService: SocketService) { 
    this.socketService.getRealtimeDbMessages().subscribe(msg=>{
      this.bandera = msg[0]
      if(this.toogle.value != msg[0]){
        this.toogle.setValue(msg[0])
      }
    })
  }
  
  ngOnInit(){
    

    this.toogle.valueChanges.subscribe(newToogleValue=> {
       if(newToogleValue){
         console.log("encendido")
        //  this.bandera = newToogleValue
         this.socketService.sendMessage(1)
       }
       else{
        // this.bandera = newToogleValue
        this.socketService.sendMessage(0)
       }
       
    });

 }



}
