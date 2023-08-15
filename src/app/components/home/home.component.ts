import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';

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
  
  filtroAbierto = false;
  menuColapsado = false;
  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
    
    //Si se modifica el tamaño de la pantalla, la pantalla es mas pequeña que el limite y el menu esta abierto, lo cierra
    if (this.menuColapsado){
      this.filtroAbierto = false;
      
      let filtro = document.getElementById("boton-filtro-responsive");
      let filtroText = "Abrir filtro";
      if (filtro!=null)
        filtro.textContent = filtroText;
      }
  }

  constructor(private ofertasService: OfertasService, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio
    this.ofertas = this.ofertasService.getAllOfertas();

    // Detecta el tamaño de la pantalla para colapsar el menu
    this.detectScreenSize();
    this.total_paginas = Math.floor(this.ofertas.length/this.ofertas_por_pagina);

    for (let index = 0; index < this.ofertas_por_pagina; index++) {
      this.ofertas_mostradas.push(this.ofertas[index]);
    }
  }
  

  pulsarFiltro() {
    this.filtroAbierto = !this.filtroAbierto;
    let filtro = document.getElementById("boton-filtro-responsive");
    //si el filtro esta abierto (filtroAbierto es true, el texto será cerrar filtro, en caso cvontrario Abrir filtro)
    let filtroText = this.filtroAbierto ? "Cerrar filtro" : "Abrir filtro";
    if (filtro!=null)
      filtro.textContent = filtroText;
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

  actualizarListaOfertas(nombre_oferta: any):void {  
    this.ofertas_mostradas = this.ofertas.filter((oferta:any) => oferta.titulo.toLowerCase().includes(nombre_oferta.toLowerCase()))
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