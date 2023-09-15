import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/Oferta';
import { Observable, map } from 'rxjs';
import { OfertaCrear } from '../models/OfertaCrear';

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

  createOferta(oferta: OfertaCrear){
    this.http.post<OfertaCrear>(this.baseUrl, oferta).subscribe(
      () => {
        console.log('Oferta subida correctamente');
        console.log(oferta);
      },
      (error) => {
        console.error("Ha habido un error al subir la oferta" + error);
        throw error;
      }
    );
  }
}

