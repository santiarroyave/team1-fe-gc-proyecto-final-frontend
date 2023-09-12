import { Injectable } from '@angular/core';
import { Reserva } from '../models/Reserva';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  baseUrl: string = "api/Reservas";

  constructor(private http:HttpClient) { }
  
  getAllReservas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.baseUrl);
  }

  getReservaById(id:number): Observable<Reserva>{
    return this.http.get<Reserva>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const reserva: Reserva = {
          id: response.id,
          idOferta: response.idOferta,
          idUsuario:response.idUsuario,
          fechaInicio:response.fechaInicio,
          fechaFin:response.fechaFin,
          estado:response.estado
        };
        return reserva;
      })
    ); 
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

  updateReserva(reserva: Reserva): Observable<any>{
    return this.http.put<Reserva>(`${this.baseUrl}/${reserva.id}`, reserva);
  }
}
