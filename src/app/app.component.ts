import { Component, OnInit } from '@angular/core';
import { ActividadesService } from './services/actividades.service';
import { HomeService } from './services/home.service';
import { Oferta } from './models/Oferta';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'team1-fe-gc-proyecto-final-frontend';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  // oferta:Oferta = {
  //   Titulo:"nuevaOferta2",
  //   Precio:123,
  //   MaxPersonas:12,
  //   FechaInicio:"2023-01-12",
  //   FechaFin:"2023-01-12",
  //   OfertasDisponibles: 10,
  //   Descripcion:"descripcion",
  //   IdActividad: 2,
  //   IdAlojamiento:3
  // }

  constructor(){

  }

  ngOnInit(): void {
      // this.homeService.createOferta(this.oferta).subscribe();
      // this.homeService.getAllOfertas().subscribe( result => {
      //   console.log(result);
      // });
  }
}
