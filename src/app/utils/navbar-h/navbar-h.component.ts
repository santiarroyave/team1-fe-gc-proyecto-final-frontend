import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar-h.component.html',
  styleUrls: ['./navbar-h.component.css']
})
export class NavbarHComponent {

    // Este metodo activa los dos menus al clickar desde el movil
    activarMenu():void{
      let menuV:any = document.getElementById("navbarVertical");
      let menuH:any = document.getElementById("navbarHorizontal");
  
      if (menuV.classList.contains("show") || menuH.classList.contains("show")) {
        menuV.classList.remove("show");
        menuH.classList.remove("show");
      } else {
        menuV.classList.add("show");
        menuH.classList.add("show");
      }
    }

}
