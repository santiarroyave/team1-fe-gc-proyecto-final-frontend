import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-v',
  templateUrl: './navbar-v.component.html',
  styleUrls: ['./navbar-v.component.css']
})
export class NavbarVComponent {

  // ATRIBUTOS
  precioMinimo:number = 200;
  precioMaximo:number = 2000;
  listaServicios:any = [];


  constructor(){
    // Servicios de ejemplo (hace llamada a la BBDD)
    this.listaServicios = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];
  }
}
