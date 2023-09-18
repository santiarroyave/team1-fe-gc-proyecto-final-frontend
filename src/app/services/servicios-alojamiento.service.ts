import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ServicioIdName } from '../models/Servicio';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiciosAlojamientoService {

  baseUrl: string = environment.url+"/api/Servicios";

  constructor(private http: HttpClient) { }

  getAllServicios(): Observable<ServicioIdName[]>{
    return this.http.get<ServicioIdName[]>(this.baseUrl);
  }
}
