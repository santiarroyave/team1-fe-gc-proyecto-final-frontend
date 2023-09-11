import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import db from '../../assets/db.json'

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  // constructor(private http:HttpClient) { }

  getAllAlojamientos(): any[]{
    return db.alojamientos;
  }

  getAlojamientoById(id:number): Object{
    return db.alojamientos[id-1];
  }

  updateAlojamiento(alojamiento: any){
    db.alojamientos[alojamiento.id-1] = alojamiento;
  }

  addAlojamiento(alojamiento: any){
    console.log("alojamiento añadido" + JSON.stringify(alojamiento));
  }
}
