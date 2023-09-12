import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Favorito } from '../models/Favorito';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  baseUrl: string = "api/Favoritoes";

  constructor(private http:HttpClient) { }

  createFavorito(relacion_favoritos: Favorito): void{
    this.http.post<Favorito>(this.baseUrl, relacion_favoritos);
  }

  deleteFavorito(relacion_favoritos: any): void{
    this.http.delete<any>(this.baseUrl, relacion_favoritos);
  }
}
