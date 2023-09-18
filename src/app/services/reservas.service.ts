import { Injectable } from '@angular/core';
import { Reserva } from '../models/Reserva';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GetReserva } from '../models/GetReserva';
import { ReservasOfertas } from '../models/ReservasOfertas';
import { Usuario } from '../models/Usuario';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  baseUrl: string = environment.url+"api/Reservas";

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
  
  getReservasByUserId(id_user:number):Observable<ReservasOfertas[]>{
    return this.http.get<ReservasOfertas[]>(this.baseUrl+'/usuario/'+id_user);
  }

  createReserva(reserva: Reserva): Observable<Reserva>{
    return this.http.post<Reserva>(this.baseUrl, reserva);
  }

  updateReserva(reserva: GetReserva): Observable<GetReserva>{
    return this.http.put<GetReserva>(`${this.baseUrl}/${reserva.id}`, reserva);
  }

  getOfertaById(id_oferta:number): Observable<any>{
    return this.http.get<any>('api/Ofertas/'+id_oferta);
  }

  updateUserExperience(user:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('api/Usuarios/'+user.id,user);
  }
}
