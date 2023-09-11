import { Component, OnInit, HostListener, Input } from '@angular/core';
import { FiltrosResponse } from 'src/app/models/FiltrosResponse';
import { Oferta } from 'src/app/models/Oferta';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ofertas: Oferta[] = [];
  ofertas_mostradas: any = [];
  ofertas_por_pagina: number = 6;
  pagina_actual: number = 0;
  total_paginas: number | any;
  mostrarElemento: boolean | any;
  res_length: number | any;
  filtros_data: FiltrosResponse | any;

  @Input() ofertas_filtered: any;

  menuColapsado = false;
  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  constructor(
    private homeService: HomeService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio
    // Obtiene todas las ofertas del servicio
    this.homeService.getDataFiltros().subscribe((response) => {
      this.ofertas = response.ofertas;
      this.filtros_data = response;      

      // Detecta el tamaño de la pantalla para colapsar el menú
      this.detectScreenSize();
      this.actualizarTotalPaginas();

      for (let index = 0; index < this.ofertas_por_pagina; index++) {
        this.ofertas_mostradas.push(this.ofertas[index]);
      }
    });

    // this.uploadFile();

    this.authService.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.authService.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.authService.showAdminBoard = user.admin ? true : false;
    }
  }

  // Esta función detecta cuando la pantalla llega al limite de colapsamiento del menu
  detectScreenSize() {
    let windowWidth = window.innerWidth;
    let limite = 992;

    if (windowWidth < limite) {
      this.menuColapsado = true;
    } else {
      this.menuColapsado = false;
    }
  }

  actualizarListaOfertas(event: string | FiltrosResponse): void {
    if (typeof event === 'string') {
      this.ofertas_mostradas = this.ofertas.filter((oferta: any) =>
        oferta.titulo.toLowerCase().includes(event.toLowerCase())
      );
    } else {    
      if (event.ofertas.length === 0) {
        this.res_length = 0;
        this.mostrarElemento = false;
       this.updateMostrarResBusqueda();
      } else {
        this.filtros_data = event;
        this.ofertas = event.ofertas;
        this.res_length = this.ofertas.length;
        this.updateMostrarResBusqueda();
        this.actualizarTotalPaginas();
        this.actualizarPagina();
      }
    }
  }

  goToPage(page: number): void {
    this.pagina_actual = page;
    this.actualizarPagina();
  }

  nextPage(): void {
    if (this.pagina_actual < this.total_paginas) this.pagina_actual++;
    this.actualizarPagina();
  }
  previousPage(): void {
    if (this.pagina_actual > 0) this.pagina_actual--;
    this.actualizarPagina();
  }

  private actualizarPagina(): void {
    this.ofertas_mostradas = [];
    for (let index = 0; index < this.ofertas_por_pagina; index++) {
      if (
        this.ofertas[index + this.ofertas_por_pagina * this.pagina_actual] !=
        null
      ) {
        this.ofertas_mostradas.push(
          this.ofertas[index + this.ofertas_por_pagina * this.pagina_actual]
        );
      }
    }
  }

  scrollClick() {
    let flecha = document.getElementById('auxiliarBuscador');
    if (flecha) {
      flecha.scrollIntoView({ behavior: 'smooth' });
    }
  }

  actualizarPaginaFiltrada(event: any): void {
    this.ofertas = event;
    this.actualizarTotalPaginas();
    this.actualizarPagina();
  }

  actualizarTotalPaginas():void{
    this.total_paginas = Math.floor(
      this.ofertas.length / this.ofertas_por_pagina
    );
  }

  updateResBusqueda(event:number):void{
    this.res_length = event;
    this.updateMostrarResBusqueda();
  }

  updateMostrarResBusqueda():void{
    this.mostrarElemento = false;
    this.mostrarElemento = !this.mostrarElemento;
  }
}
