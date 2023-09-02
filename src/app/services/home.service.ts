import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/Oferta';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: string = "api/";

  constructor(private http:HttpClient) { }

  getAllOfertas():Observable<any>{
    return this.http.get<any>(this.baseUrl+"Ofertas");
  }

  // createOferta(oferta:Oferta):Observable<any>{
  //   return this.http.post<Oferta>(this.baseUrl+"Ofertas",oferta);
  // }

  getBuscarOfertas(nombre:string, fecha_ini:string, fecha_fin:string, num_personas:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Ofertas/Buscar?nombre=${nombre}&fecha_inicio=${fecha_ini}&fecha_fin=${fecha_fin}&num_personas=${num_personas}`);
  }
}
