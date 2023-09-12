import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import db from '../../assets/db.json'
import { Favorito } from '../models/Favorito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  oferta: any;
  baseUrl: string = "api/";
  constructor(private http:HttpClient) { }

  getAllOfertas(): any[]{
    return db.ofertas;
  }

  getOfertaById(id:number): Object{
    return db.ofertas[id-1];
  }

  //reservas
  getAllReservas(): any[]{
    return db.reservas;
  }

  getReservaById(id:number): Object{
    return db.reservas[id-1];
  }

  postFavorito(fav:Favorito):Observable<any>{
    return this.http.post(this.baseUrl+'Favoritoes',fav);
  }
}
