import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FiltrosResponse } from '../models/FiltrosResponse';
import { Favorito } from '../models/Favorito';
import { OfertaFiltros } from '../models/OfertaFiltros';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: string = environment.url+"api/";

  private ofertasFiltradas$ = new BehaviorSubject<any[]>([]);
  private ofertasAllParaFiltrar: any[] = [];

  constructor(private http:HttpClient) { }

  actualizarOfertasFiltradas(ofertasFiltradas: any[]): void {
    this.ofertasFiltradas$.next(ofertasFiltradas);
  }

  getOfertasFiltradas$(): Observable<any[]> {
    return this.ofertasFiltradas$;
  }

  getAllOfertasParaFiltrar(): any[] {
    return this.ofertasAllParaFiltrar;
  }

  setOfertasAllParaFiltrar(ofertasAll: any[]): void {
    this.ofertasAllParaFiltrar = ofertasAll;
  }


  getBuscarOfertas(ubicacion:string, fecha_ini:string, fecha_fin:string, num_personas:number):Observable<OfertaFiltros[]>{
    return this.http.get<OfertaFiltros[]>(`${this.baseUrl}Ofertas/Buscar?ubicacion=${ubicacion}&fecha_inicio=${fecha_ini}&fecha_fin=${fecha_fin}&num_personas=${num_personas}`);
  }

  getDataFiltros():Observable<FiltrosResponse>{
    return this.http.get<FiltrosResponse>(this.baseUrl+'Ofertas/Filtros');
  }

  getFavoritosByUserId(id_user:number): Observable<Favorito[]>{
    return this.http.get<Favorito[]>(this.baseUrl+'Favoritoes/IdUsuario/'+id_user);
  }
}
