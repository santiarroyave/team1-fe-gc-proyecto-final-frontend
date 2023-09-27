import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar-h.component.html',
  styleUrls: ['./navbar-h.component.css']
})
export class NavbarHComponent implements OnInit, AfterViewInit {
  // Ruta actual
  rutaActual: any;
  porcentage_exp = 0;
  admin = false;
  user = false;
  @ViewChild('miElemento') elemento!: ElementRef;

  // Alterna entre navbar fixed o no en función de si estás arriba de la página o no
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.posicionNavbar();
  }

  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.authService.isLoggedIn) {
      this.user = this.authService.isLoggedIn;
      this.admin = this.authService.showAdminBoard;
      let experiencia_usuario = this.tokenStorageService.getUser().experiencia;
      this.porcentage_exp = Math.floor((experiencia_usuario * 100) / 3000);
    }
  }

  ngAfterViewInit(): void {
    // El código que depende de 'elemento.nativeElement' debe colocarse aquí
    // porque 'elemento' estará inicializado en este punto.
    if (this.authService.isLoggedIn) {
      let experiencia_usuario = this.tokenStorageService.getUser().experiencia;
      this.porcentage_exp = Math.floor((experiencia_usuario * 100) / 3000);
      this.elemento.nativeElement.style.width = this.porcentage_exp.toString() + '%';
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // Activa los dos navbar desplegables al hacer clic en el botón de menú de los móviles
  activarMenu(): void {
    let menuH: any = document.getElementById("navbarHorizontal");

    // Muestra el menú h colapsado
    if (menuH.classList.contains("show")) {
      menuH.classList.remove("show");
    } else {
      menuH.classList.add("show");
    }
  }

  posicionNavbar() {
    // 1. Si está en el home la posición es Fixed
    // 2. Si está fuera del home la posición varía:
    //    - scroll < 500 es Sticky
    //    - scroll > 500 es Fixed
    //    Esto es para que no se note tanto el cambio
    let navbarFixed: any = document.getElementById("contenedorFix");

    if (this.rutaActual == "home") {
      navbarFixed.classList.add("fixed-top");
    } else {
      if (window.scrollY < 500) {
        navbarFixed.classList.remove("fixed-top");
        navbarFixed.classList.add("sticky-top");
      }
      if (window.scrollY > 500) {
        navbarFixed.classList.add("fixed-top");
        navbarFixed.classList.remove("sticky-top");
      }
    }
  }
}
