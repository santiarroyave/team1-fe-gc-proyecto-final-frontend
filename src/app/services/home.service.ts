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

  getAllOfertas():Observable<any>{
    return this.http.get<any>(this.baseUrl+"Ofertas");
  }

  createOferta(oferta:Oferta):Observable<any>{
    return this.http.post<Oferta>(this.baseUrl+"Ofertas",oferta);
  }
}
