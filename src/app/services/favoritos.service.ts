import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Favorito } from '../models/Favorito';
import { Oferta } from '../models/Oferta';
import { Imagen } from '../models/Imagen';
import { OfertasImagenes } from '../models/OfertasImagenes';
import { OfertaCard } from '../models/OfertaCard';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  baseUrl: string = environment.url+"/api/Favoritoes";

  constructor(private http:HttpClient) { }

  createFavorito(relacion_favoritos: any): Observable<Favorito>{
    return this.http.post<Favorito>(this.baseUrl, relacion_favoritos);
  }

  deleteFavorito(id_user: number, id_oferta:number): Observable<any>{
    return this.http.delete<any>(this.baseUrl+`?id_usuario=${id_user}&id_oferta=${id_oferta}`);
  }

  getFavoritosByUserId(id_user:number): Observable<OfertaCard[]>{
    return this.http.get<OfertaCard[]>('api/Favoritoes/Usuario/'+id_user);
  }

  getImagenesOferta():Observable<OfertasImagenes[]>{
    return this.http.get<OfertasImagenes[]>('api/OfertasImagenes');
  }

  getImagenes():Observable<Imagen[]>{
    return this.http.get<Imagen[]>('api/Imagens');
  }
}
