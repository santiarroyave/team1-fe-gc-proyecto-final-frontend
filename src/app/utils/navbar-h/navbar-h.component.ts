import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar-h.component.html',
  styleUrls: ['./navbar-h.component.css']
})
export class NavbarHComponent {

    // Activa los dos navbar desplegables al hacer click en el boton de menu de los moviles
    activarMenu():void{
      let menuV:any = document.getElementById("navbarVertical");
      let menuH:any = document.getElementById("navbarHorizontal");
      let menuV2:any = document.getElementById("menuV-2");
      // Variable que permite hacer scroll en el menu ya que es position absolute
      let contenedorFix:any = document.getElementById("contenedorFix");
  
      
      if (menuV.classList.contains("show") || menuH.classList.contains("show")) {
        menuV.classList.remove("show");
        menuH.classList.remove("show");
        contenedorFix.classList.remove("h-100", "overflow-scroll");
      } else {
        menuV.classList.add("show");
        menuH.classList.add("show");
        contenedorFix.classList.add("h-100", "overflow-scroll");
      }

      // Oculta la barra blanca que aparecia en los moviles
      if (menuV2.classList.contains("ocultar")){
        menuV2.classList.remove("ocultar");
      }else{
        menuV2.classList.add("ocultar");
      }
      
    }
    

}
