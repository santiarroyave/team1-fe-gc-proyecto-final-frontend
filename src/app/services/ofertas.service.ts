import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/Oferta';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  baseUrl: string = "api/Ofertas";

  constructor(private http:HttpClient) { }

  getAllOfertas(): Observable<Oferta[]>{
    return this.http.get<Oferta[]>(this.baseUrl);
  }

  getOfertaById(id:number): Observable<Oferta>{
    return this.http.get<Oferta>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const oferta: Oferta = {
          id: response.id,
          titulo: response.titulo,
          descripcion: response.descripcion,
          precio: response.precio,
          maxPersonas: response.maxPersonas,
          fechaInicio: response.fechaInicio,
          fechaFin: response.fechaFin,
          ofertasDisponibles: response.ofertasDisponibles,
          idAlojamiento: response.idAlojamiento
        };
        return oferta;
      })
    );
  }
}

