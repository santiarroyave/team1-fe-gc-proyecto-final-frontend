import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import db from '../../assets/db.json'

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  // constructor(private http:HttpClient) { }

  getAllActividades(): any[]{
    return db.actividades;
  }

  getActividadById(id:number): Object{
    return db.actividades[id-1];
  }
}