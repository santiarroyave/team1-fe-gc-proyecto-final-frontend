import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActividadCrear } from '../models/IActividadCrear';
import db from '../../assets/db.json'

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl: string = "api/Actividads";

  constructor(private http:HttpClient) { }

  getAllActividades():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

  getActividadById(id:number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  updateActividad(actividad: any): void{
    // this.http.post<any>(this.baseUrl, actividad);
  }

  addActividad(actividad: IActividadCrear){
    console.log("Actividad a subir:" + JSON.stringify(actividad));
    this.http.post<IActividadCrear>(this.baseUrl, actividad).subscribe(
      () => {
        console.log('Actividad subida correctamente');
      },
      (error) => {
        console.error("Ha habido un erroooooooooooooooooooooor" + error);
        throw error;
      }
    );
  }
}
