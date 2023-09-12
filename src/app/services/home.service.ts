import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/Oferta';
import { FiltrosResponse } from '../models/FiltrosResponse';
import { Alojamiento } from '../models/Alojamiento';
import { ServiciosAlojamientos } from '../models/ServiciosAlojamientos';
import { Favorito } from '../models/Favorito';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: string = "api/";

  constructor(private http:HttpClient) { }

  getAllOfertas():Observable<Oferta[]>{
    return this.http.get<Oferta[]>(this.baseUrl+'Ofertas');
  }

  getAlojamientoById(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+'Alojamientoes/'+id);
  }

  getBuscarOfertas(nombre:string, fecha_ini:string, fecha_fin:string, num_personas:number):Observable<FiltrosResponse>{
    return this.http.get<FiltrosResponse>(`${this.baseUrl}Ofertas/Buscar?nombre=${nombre}&fecha_inicio=${fecha_ini}&fecha_fin=${fecha_fin}&num_personas=${num_personas}`);
  }

  getDataFiltros():Observable<FiltrosResponse>{
    return this.http.get<FiltrosResponse>(this.baseUrl+'Ofertas/Filtros');
  }

  postOferta(oferta:Oferta):Observable<Oferta>{
    return this.http.post<Oferta>(this.baseUrl+'Ofertas',oferta);
  }

  postAlojamiento(aloja:Alojamiento):Observable<Alojamiento>{
    return this.http.post<Alojamiento>(this.baseUrl+'Alojamientoes',aloja);
  }

  postSA(sa:ServiciosAlojamientos):Observable<ServiciosAlojamientos>{
    return this.http.post<ServiciosAlojamientos>(this.baseUrl+'ServiciosAlojamientos',sa);
  }
}
