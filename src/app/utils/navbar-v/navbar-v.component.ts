import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-v',
  templateUrl: './navbar-v.component.html',
  styleUrls: ['./navbar-v.component.css']
})
export class NavbarVComponent {

  listaServicios:any = [];

  constructor(){
    this.listaServicios = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];
  }
}
