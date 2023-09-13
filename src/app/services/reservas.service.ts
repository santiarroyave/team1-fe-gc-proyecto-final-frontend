import { Injectable } from '@angular/core';
import { Reserva } from '../models/Reserva';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GetReserva } from '../models/GetReserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  baseUrl: string = "api/Reservas";

  constructor(private http:HttpClient) { }
  
  getAllReservas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.baseUrl);
  }

  getReservaById(id:number): Observable<GetReserva>{
    return this.http.get<GetReserva>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const reserva: GetReserva = {
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

  createReserva(reserva: Reserva): Observable<Reserva>{
    return this.http.post<Reserva>(this.baseUrl, reserva);
  }

  updateReserva(reserva: GetReserva): Observable<GetReserva>{
    return this.http.put<GetReserva>(`${this.baseUrl}/${reserva.id}`, reserva);
  }
}
