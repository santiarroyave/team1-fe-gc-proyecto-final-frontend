import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  baseUrl: string = "api/favoritoes";

  constructor(private http:HttpClient) { }

  createFavorito(relacion_favoritos: any): void{
    this.http.post<any>(this.baseUrl, relacion_favoritos);
  }

  deleteFavorito(relacion_favoritos: any): void{
    this.http.delete<any>(this.baseUrl, relacion_favoritos);
  }
}
