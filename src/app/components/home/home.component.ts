import { Component, OnInit, HostListener, Input } from '@angular/core';
import { FiltrosResponse } from 'src/app/models/FiltrosResponse';
import { OfertaFiltros } from 'src/app/models/OfertaFiltros';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { OfertasService } from 'src/app/services/ofertas.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  ofertas: OfertaFiltros[] = [];



  ofertas_mostradas: any = [];
  ofertas_por_pagina: number = 6;
  pagina_actual: number = 0;
  total_paginas: number | any;
  mostrarElemento: boolean | any;
  res_length: number | any;
  filtros_data: FiltrosResponse | any;
  esperando = true;

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
    private ofertaService: OfertasService,
    private homeService: HomeService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio
    const user = this.tokenStorageService.getUser();
    

    this.ofertaService.getOfertaCardFiltros().subscribe((response) => {
      this.ofertas = response.map((item: OfertaFiltros) => {
        return {
          oferta: item.oferta,
          categoriaAlojamiento: item.categoriaAlojamiento,
          direccionAlojamiento: item.direccionAlojamiento,
          serviciosAlojamiento: item.serviciosAlojamiento,
          favorito: false,
        };
      });

      console.log("Ofertas totales de la bdd:");
      console.log(this.ofertas);
      this.homeService.actualizarOfertasFiltradas(this.ofertas); //actualiza valor que variará
      this.homeService.setOfertasAllParaFiltrar(this.ofertas); // actualizo valor original
      console.log("Ofertas totales despues con el servicio de ofertas filtradas:");
      this.homeService.getOfertasFiltradas$().subscribe(ofertas => {
        console.log(ofertas);
      });
      
      // Detecta el tamaño de la pantalla para colapsar el menú
      this.detectScreenSize();
      this.actualizarTotalPaginas();

      
      if (Object.keys(user).length > 0) {
        this.homeService.getFavoritosByUserId(user.id).subscribe((res) => {
          for (let i = 0; i < this.ofertas.length; i++) {
            for (let j = 0; j < res.length; j++) {
              if (this.ofertas[i].oferta.id == res[j].idOferta)
                this.ofertas[i].favorito = true;
            }   
          }
          for (let index = 0; index < this.ofertas_por_pagina; index++) {
          this.ofertas_mostradas.push(this.ofertas[index]);
          }
        });
      } else {        
        for (let index = 0; index < this.ofertas_por_pagina; index++) {          
          this.ofertas_mostradas.push(this.ofertas[index]);
        }
      }
      
      this.esperando = false;
    });
    

    this.authService.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.authService.isLoggedIn) {
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
    this.homeService.actualizarOfertasFiltradas(event); 
  }

  actualizarTotalPaginas(): void {
    this.total_paginas = Math.floor(
      this.ofertas.length / this.ofertas_por_pagina
    );
  }

  updateResBusqueda(event: number): void {
    this.res_length = event;
    this.updateMostrarResBusqueda();
  }

  updateMostrarResBusqueda(): void {
    this.mostrarElemento = false;
    this.mostrarElemento = !this.mostrarElemento;
  }
}
