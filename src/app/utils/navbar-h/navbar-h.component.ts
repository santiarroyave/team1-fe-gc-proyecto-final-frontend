import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar-h.component.html',
  styleUrls: ['./navbar-h.component.css']
})
export class NavbarHComponent implements OnInit{
  
  // Lista donde se mostrará el navbar-v dentro del menu horizontal
  whiteList:any = [
    "home",
    "reservas",
    "favoritos",
    "admin/hoteles"
  ];
  // Indica si el menú-V debe ser mostrado dentro del menú-H
  mostrarMenu:boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtiene la ruta actual y la coteja con la WhiteList para mostrar el menu o no
    this.route.url.subscribe(segments => {
      let rutaActual = segments.map(segment => segment.path).join('/');
      this.mostrarMenu = this.whiteList.includes(rutaActual);
    });
  }

  // Activa los dos navbar desplegables al hacer click en el boton de menu de los moviles
  activarMenu():void{
    let menuV:any = document.getElementById("navbarVertical");
    let menuH:any = document.getElementById("navbarHorizontal");
    // Variable que permite hacer scroll en el menu ya que es position absolute
    // Al hacer click en el boton de menu añade la clase h-100 y overflow-scroll
    let contenedorFix:any = document.getElementById("contenedorFix");

    // Muestra el menu h colapsado
    if (menuH.classList.contains("show")) {
      menuH.classList.remove("show");
      contenedorFix.classList.remove("h-100", "overflow-auto");
    } else {
      menuH.classList.add("show");
      contenedorFix.classList.add("h-100", "overflow-auto");
    }
    
    // Muestra el menuV colapsado al hacer click
    // Tiene un condicional nulo porque en algunas paginas se muestra y en otras no y sino daria error
    if(menuV != null){
      if(menuV.classList.contains("show")){
        menuV.classList.remove("show");
      }else{
        menuV.classList.add("show");
      }
    }

    
  }

}
