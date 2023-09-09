import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-v',
  templateUrl: './navbar-v.component.html',
  styleUrls: ['./navbar-v.component.css']
})
export class NavbarVComponent {

  // ATRIBUTOS
  @Input() ofertas: any = [];
  @Input() alojamientos: any = [];
  @Input() servicios_alojamientos: any = [];

  precioMinimo:number = 200;
  precioMaximo:number = 2000;
  listaServicios:any = [];
  categorias_alojamiento:boolean[] =[false,false,false,false,false,false];

  constructor(){
    // Servicios de ejemplo (hace llamada a la BBDD)
    this.listaServicios = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];
  }

  cambiarValor(indice: number) {
    this.categorias_alojamiento[indice] = !this.categorias_alojamiento[indice];
  }

  filtrar(): void{
    
  }
}
