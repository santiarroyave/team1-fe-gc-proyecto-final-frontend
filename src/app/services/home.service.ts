import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/Oferta';

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

  getBuscarOfertas(nombre:string, fecha_ini:string, fecha_fin:string, num_personas:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Ofertas/Buscar?nombre=${nombre}&fecha_inicio=${fecha_ini}&fecha_fin=${fecha_fin}&num_personas=${num_personas}`);
  }
}
