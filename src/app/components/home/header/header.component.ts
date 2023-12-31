import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  scroll:boolean = false;
  navbarH:any;

  // Está alerta de que se haga el scroll
  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowScroll($event:Event){
    this.navegarABuscador();
    this.scroll = true;
    
    this.ocultarFlecha();
  }
  
  ngOnInit(){
    // Oculta el menu horizontal mientras se ve el header
    if (this.scroll == false){
      this.navbarH = document.querySelector("app-navbar-h");
      this.navbarH.classList.add("d-none");

      this.ocultarFlecha();
    }
  }
  
  // Hace scroll hasta el buscador
  navegarABuscador() {
    let elemento = document.getElementById("auxiliarBuscador");
    if (elemento && this.scroll == false) {
      elemento.scrollIntoView({ behavior: 'smooth' });
      
      // Activa el menu horizontal
      this.navbarH.classList.remove("d-none");
    }
  }

  scrollClick(){
    let elemento = document.getElementById("auxiliarBuscador");
    if (elemento){
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  ocultarFlecha(){
    let flecha:any;
    flecha = document.getElementById("flechaSubir");

    if(window.scrollY > 1500){
      flecha.classList.remove("ocultarFlecha");
    }else{
      flecha.classList.add("ocultarFlecha");
    }
  }
}
