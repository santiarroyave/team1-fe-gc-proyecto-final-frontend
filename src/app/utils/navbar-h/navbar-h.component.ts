import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar-h.component.html',
  styleUrls: ['./navbar-h.component.css']
})
export class NavbarHComponent {
  
  // Lista donde se mostrará el navbar-v dentro del menu horizontal
  whiteList:any = [
    "home",
    "reservas",
    "favoritos"
  ];
  // Indica si el menú-V debe ser mostrado dentro del menú-H
  mostrarMenu:boolean = this.mostrarNavbarV();

  constructor(private route: ActivatedRoute) { }


  // Activa los dos navbar desplegables al hacer click en el boton de menu de los moviles
  activarMenu():void{
    let menuV:any = document.getElementById("navbarVertical");
    let menuH:any = document.getElementById("navbarHorizontal");
    // Variable que permite hacer scroll en el menu ya que es position absolute
    // Al hacer click en el boton de menu añade la clase h-100 y overflow-scroll
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
    
  }

  
  // Devuelve true si el menu debe ser mostrado
  mostrarNavbarV():boolean{
    let rutaActual = this.route.snapshot.url[0].path;
    return this.whiteList.includes(rutaActual);
  }

}
