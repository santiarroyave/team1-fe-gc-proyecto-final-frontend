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

  getOfertaById(id:number): Object{
    return db.alojamientos[id-1];
  }
}
