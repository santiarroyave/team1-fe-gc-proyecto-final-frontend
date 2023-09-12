import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import db from '../../assets/db.json'
import { AlojamientoCrear } from '../models/alojamientos/AlojamientoCrear';
import { AlojamientoCompleto } from '../models/alojamientos/AlojamientoCompleto';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  baseUrl: string = "api/Alojamientoes";

  constructor(private http:HttpClient) { }

  getAllAlojamientos(): Observable<AlojamientoCompleto[]> {
    return this.http.get<AlojamientoCompleto[]>(this.baseUrl);
  }

  getAlojamientoById(id:number): Observable<AlojamientoCompleto>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const alojamiento: AlojamientoCompleto = {
          id: response.id,
          nombre: response.nombre,
          categoria: response.categoria,
          telefono: response.telefono,
          email: response.email,
          idDireccion: response.idDireccion,
          pais: response.pais,
          calle: response.calle,
          numero: response.numero,
          codigoPostal: response.codigoPostal,
          provincia: response.provincia,
          localidad: response.localidad,
          imagenes: response.imagenes
        };
        return alojamiento;
      })
    );
  }

  updateAlojamiento(alojamiento: AlojamientoCompleto): Observable<AlojamientoCompleto>{
    return this.http.put<AlojamientoCompleto>(`${this.baseUrl}/${alojamiento.id}`, alojamiento);
  }

  addAlojamiento(alojamiento: AlojamientoCrear){
    this.http.post<AlojamientoCrear>(this.baseUrl, alojamiento).subscribe(
      () => {
        console.log('alojamiento subida correctamente');
        console.log(alojamiento);
      },
      (error) => {
        console.error("Ha habido un errooooooooor aaaaaaaaaaaaaahhhhh" + error);
        throw error;
      }
    );
  }
}
