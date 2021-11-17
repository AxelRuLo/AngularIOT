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
  }
  
  ngOnInit(){
    

    this.toogle.valueChanges.subscribe(newToogleValue=> {
       if(newToogleValue){
         console.log("encendido")
         this.bandera = newToogleValue
         this.socketService.sendMessage("1")
       }
       else{
        this.bandera = newToogleValue
        this.socketService.sendMessage("0")
       }

       this.socketService.onNewMessage().subscribe(msg=>{
         console.log("la bandera ahora es ",msg)
       })
    });
 }



}
