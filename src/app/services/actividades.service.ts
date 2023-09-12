import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ActividadCrear } from '../models/ActividadCrear';
import db from '../../assets/db.json'
import { ActividadCompleta } from '../models/ActividadCompleta';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl: string = "api/Actividads";

  constructor(private http:HttpClient) { }

  getAllActividades():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

  getActividadById(id:number): Observable<ActividadCompleta>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const actividad: ActividadCompleta = {
          id: response.id,
          titulo: response.titulo,
          descripcion: response.descripcion,
          idDireccion: response.idDireccion,
          pais: response.pais,
          calle: response.calle,
          numero: response.numero,
          codigoPostal: response.codigoPostal,
          provincia: response.provincia,
          localidad: response.localidad,
          imagenes: response.imagenes
        };
        return actividad;
      })
    );
  }

  updateActividad(actividad: ActividadCompleta): Observable<any> {
    
    console.log("Actividad actualizada correctamente");
    console.log(actividad);

    return this.http.put<ActividadCompleta>(`${this.baseUrl}/${actividad.id}`, actividad);
  }

  addActividad(actividad: ActividadCrear){
    this.http.post<ActividadCrear>(this.baseUrl, actividad).subscribe(
      () => {
        console.log('Actividad subida correctamente');
        console.log(actividad);
      },
      (error) => {
        console.error("Ha habido un errooooooooor aaaaaaaaaaaaaahhhhh" + error);
        throw error;
      }
    );
  }
}
