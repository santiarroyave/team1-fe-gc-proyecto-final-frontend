import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/Oferta';
import { Observable, map } from 'rxjs';
import { OfertaCrear } from '../models/OfertaCrear';
import { OfertaCompleta } from '../models/OfertaCompleta';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  baseUrl: string = "api/Ofertas";

  constructor(private http:HttpClient) { }

  getAllOfertas(): Observable<Oferta[]>{
    return this.http.get<Oferta[]>(this.baseUrl);
  }

  getOfertaById(id:number): Observable<OfertaCompleta>{
    return this.http.get<OfertaCompleta>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const oferta: OfertaCompleta = {
          oferta: response.oferta,
          alojamiento: response.alojamiento,
          actividades: response.actividades,
          imagenes: response.imagenes
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

