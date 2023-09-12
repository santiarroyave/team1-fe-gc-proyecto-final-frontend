import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import db from '../../assets/db.json'
import { Reserva } from '../models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  oferta: any;
  baseUrl: string = "api/Reservas";
  constructor(private http:HttpClient) { }

  getAllOfertas(): any[]{
    return db.ofertas;
  }

  getOfertaById(id:number): Object{
    return db.ofertas[id-1];
  }

  //reservas
  getAllReservas(): any[]{
    return db.reservas;
  }

  getReservaById(id:number): Object{
    return db.reservas[id-1];
  }

  createReserva(reserva: Reserva): void{
    this.http.post<Reserva>(this.baseUrl, reserva).subscribe(
      () => {
        console.log('reserva subida correctamente');
        console.log(reserva);
      },
      (error) => {
        console.error("Ha habido un errooooooooor aaaaaaaaaaaaaahhhhh" + error);
        throw error;
      }
    );
  }
}
