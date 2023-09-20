import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { fakeAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar-h.component.html',
  styleUrls: ['./navbar-h.component.css']
})
export class NavbarHComponent implements OnInit{
  // Ruta actual
  rutaActual:any;
  porcentage_exp = 0;
  admin = false;
  user = false;
  @ViewChild('miElemento') elemento!: ElementRef;

  // Alterna entre navbar fixed o no en funcion de si estas arriba de la pagina o no
  @HostListener("window:scroll", [])
  onWindowScroll(){
    this.posicionNavbar();
  }
  
  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService , private authService: AuthService ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn = !!this.tokenStorageService.getToken();

      if(this.authService.isLoggedIn){
        this.user = this.authService.isLoggedIn;
        this.admin = this.authService.showAdminBoard;
        let experiencia_usuario = this.tokenStorageService.getUser().experiencia;
        this.porcentage_exp = Math.floor((experiencia_usuario * 100) / 3000);
        this.elemento.nativeElement.style.width = this.porcentage_exp.toString() + '%';
      }
  }

  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // Activa los dos navbar desplegables al hacer click en el boton de menu de los moviles
  activarMenu():void{
    // let menuV:any = document.getElementById("navbarVertical");
    let menuH:any = document.getElementById("navbarHorizontal");
    // Variable que permite hacer scroll en el menu ya que es position absolute
    // Al hacer click en el boton de menu añade la clase h-100 y overflow-scroll
    let contenedorFix:any = document.getElementById("contenedorFix");

    // Muestra el menu h colapsado
    if (menuH.classList.contains("show")) {
      menuH.classList.remove("show");
    } else {
      menuH.classList.add("show");
    }
  }

  posicionNavbar(){
    // 1. Si está en el home la posicion es Fixed
    // 2. Si esta fuera del home la posición varia:
    //    - scroll < 500 es Sticky
    //    - scroll > 500 es Fixed
    //    Esto es para que no se note tanto el cambio
    let navbarFixed:any = document.getElementById("contenedorFix");

    if(this.rutaActual == "home"){
      navbarFixed.classList.add("fixed-top");
      
    }else{
      if(window.scrollY < 500){
        navbarFixed.classList.remove("fixed-top");
        navbarFixed.classList.add("sticky-top");
        
      }
      if(window.scrollY > 500){
        navbarFixed.classList.add("fixed-top");
        navbarFixed.classList.remove("sticky-top");
      }
    }
  }

}
