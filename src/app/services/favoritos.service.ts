import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Favorito } from '../models/Favorito';
import { Oferta } from '../models/Oferta';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  baseUrl: string = "api/Favoritoes";

  constructor(private http:HttpClient) { }

  createFavorito(relacion_favoritos: any): Observable<Favorito>{
    return this.http.post<Favorito>(this.baseUrl, relacion_favoritos);
  }

  deleteFavorito(id_user: number, id_oferta:number): Observable<any>{
    return this.http.delete<any>(this.baseUrl+`?id_usuario=${id_user}&id_oferta=${id_oferta}`);
  }

  getFavoritosByUserId(id_user:number): Observable<Favorito[]>{
    return this.http.get<Favorito[]>(this.baseUrl+'/IdUsuario/'+id_user);
  }

  getOfertasById(id_oferta:number):Observable<Oferta>{
    return this.http.get<Oferta>("api/Ofertas/"+id_oferta);
  }
}
