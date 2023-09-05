import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  ofertas: any = [];
  ofertas_mostradas: any = [];
  ofertas_por_pagina: number = 6;
  pagina_actual: number = 0;
  total_paginas: number | any;
  mostrarElemento:boolean | any;
  res_length:number | any;
  menuColapsado = false;
  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  constructor(private homeService: HomeService, private tokenStorageService: TokenStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio
    this.homeService.getAllOfertas().subscribe(response => {
      this.ofertas = response;
      // Detecta el tamaño de la pantalla para colapsar el menu
      this.detectScreenSize();
      this.total_paginas = Math.floor(this.ofertas.length/this.ofertas_por_pagina);

      for (let index = 0; index < this.ofertas_por_pagina; index++) {
        this.ofertas_mostradas.push(this.ofertas[index]);
      }
    });

    // this.uploadFile();

    this.authService.isLoggedIn = !!this.tokenStorageService.getToken();

      if(this.authService.isLoggedIn){

        const user = this.tokenStorageService.getUser();
        this.authService.isLoggedIn = true;
        this.authService.showAdminBoard = user.admin ? true : false;
      }
  }

  // Esta función detecta cuando la pantalla llega al limite de colapsamiento del menu
  detectScreenSize() {
    let windowWidth = window.innerWidth;
    let limite = 992;

    if(windowWidth < limite){
      this.menuColapsado = true;
    }else{
      this.menuColapsado = false;
    }
  }

  actualizarListaOfertas(event: string | string[]):void {  
    if(typeof(event)==='string'){
      this.ofertas_mostradas = this.ofertas.filter((oferta:any) => oferta.titulo.toLowerCase().includes(event.toLowerCase()));
    }else{
      if(event.length === 0){
        this.res_length = event.length;
        this.mostrarElemento = false;
        this.mostrarElemento = !this.mostrarElemento;
      }else{
        this.res_length = event.length;
        this.mostrarElemento = false;
        this.mostrarElemento = !this.mostrarElemento;
        this.ofertas = event
        this.ofertas_mostradas = this.ofertas;
      }
    }
  }

  goToPage(page:number):void{
    this.pagina_actual = page;
    this.actualizarPagina();
  }

  nextPage():void{
    if(this.pagina_actual<this.total_paginas) this.pagina_actual++;
    this.actualizarPagina();
  }
  previousPage():void{
    if(this.pagina_actual>0) this.pagina_actual--;
    this.actualizarPagina();
  }

  private actualizarPagina():void{
    this.ofertas_mostradas = [];
    for (let index = 0; index < this.ofertas_por_pagina; index++) {
      if(this.ofertas[index+this.ofertas_por_pagina*this.pagina_actual] != null){
        this.ofertas_mostradas.push(this.ofertas[index+this.ofertas_por_pagina*this.pagina_actual]);
      }
    }
  }

  scrollClick(){
    let flecha = document.getElementById("auxiliarBuscador");
    if (flecha){
      flecha.scrollIntoView({ behavior: 'smooth' });
    }
  }

}