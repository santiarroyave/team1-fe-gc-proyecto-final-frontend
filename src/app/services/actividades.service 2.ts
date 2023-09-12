import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import db from '../../assets/db.json'

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl: string = "api/Actividades";
  constructor(private http:HttpClient) { }

  getAllActividades():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

  getActividadById(id:number): Object{
    return db.actividades[id-1];
  }

  updateActividad(actividad: any){
    db.alojamientos[actividad.id-1] = actividad;
  }

  addActividad(actividad: any){
    console.log("actividad añadida" + JSON.stringify(actividad));
  }
}