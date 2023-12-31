import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/Oferta';
import { Observable, map } from 'rxjs';
import { OfertaCrear } from '../models/OfertaCrear';
import { OfertaCompleta } from '../models/OfertaCompleta';
import { OfertaFiltros } from '../models/OfertaFiltros';
import { environment } from 'src/environments/environment';
import { OfertaCrearAlojamientoAgenda } from '../models/OfertaCrearAlojamientoAgenda';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  baseUrl: string = environment.url+"api/Ofertas";
  
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

  // Se pueden crear 4 tipos de ofertas:
  
  //oferta con nuevo alojamiento y nueva actividad
  createOferta(oferta: OfertaCrear){
    console.log(oferta);
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

  // oferta con alojamiento existente y nueva actividad
  createOfertaAlojamientoExistente(oferta: OfertaCrearAlojamientoAgenda){
    console.log(oferta);
    this.http.post<OfertaCrear>(this.baseUrl + "/SinAlojamiento", oferta).subscribe(
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

  // oferta con actividades existentes y nuevo alojamiento //PROXIMAMENTE
  // oferta con actividades y alojamientos existentes //PROXIMAMENTE


  getOfertaCardFiltros(): Observable<OfertaFiltros[]>{
    return this.http.get<OfertaFiltros[]>(this.baseUrl+"/FiltrosCard");
  }
  
  getOfertaCompletaById(id:number): Observable<OfertaCompleta>{
    return this.http.get<OfertaCompleta>(this.baseUrl + "/" + id);
  }

  // endppoint para modiciar el atributo numOfertasDisponibles en especial
  updateOferta(oferta: Oferta): Observable<any> {
    return this.http.put<OfertaCompleta>(`${this.baseUrl}/${oferta.id}`, oferta);
  }
}

