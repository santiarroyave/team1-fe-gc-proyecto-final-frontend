import { Component, OnInit, HostListener } from '@angular/core';
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

  private admin: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  menuColapsado = false;
  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  constructor(private homeService: HomeService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio
    // this.ofertas = this.ofertasService.getAllOfertas();
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

    this.isLoggedIn = !!this.tokenStorageService.getToken();

      if(this.isLoggedIn){
        const user = this.tokenStorageService.getUser();
        this.admin = user.admin;

        this.showAdminBoard = this.admin ? true : false;
        console.log(this.showAdminBoard);
        
        this.username = user.username;
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

  // uploadFile() {
  //   try{
  //     const response = this.drive.files.create({
  //       requestBody:{
  //         name:'test.jpg',
  //         mimeType: 'image/jpg'
  //       },
  //       media:{
  //         mimeType:'image/jpg',
  //         body:'https://images.wikidexcdn.net/mwuploads/wikidex/7/77/latest/20150621181250/Pikachu.png'
  //       }
  //     });

  //     console.log(response.data);
      
  //   }catch(error:any){
  //     console.log(error.message);
  //   }
  // }
}