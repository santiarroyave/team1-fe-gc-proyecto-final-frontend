import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import db from '../../assets/db.json'

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  noches: number = 0;

  // constructor(private http:HttpClient) { }

  getAllOfertas(): any[]{
    return db.ofertas;
  }

  getOfertaById(id:number): Object{
    return db.ofertas[id-1];
  }
}
