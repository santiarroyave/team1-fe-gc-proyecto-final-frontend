import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio} from '../models/Servicio';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiciosAlojamientoService {

  baseUrl: string = environment.url+"api/Servicios";

  constructor(private http: HttpClient) { }

  getAllServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.baseUrl);
  }
}
