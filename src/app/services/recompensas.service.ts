import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nivel } from '../models/Nivel';

@Injectable({
  providedIn: 'root'
})
export class RecompensasService {
  baseUrl: string = "api/";

  constructor(private http:HttpClient) { }

  getNivelesById(id:number):Observable<Nivel>{
    return  this.http.get<Nivel>(this.baseUrl+'Nivels/'+id);
  }
}
