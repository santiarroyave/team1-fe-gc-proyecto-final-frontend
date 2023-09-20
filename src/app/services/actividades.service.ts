import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ActividadCrear } from '../models/actividades/ActividadCrear';
import { ActividadCard } from '../models/actividades/ActividadCard';
import { ActividadCompleta } from '../models/actividades/ActividadCompleta';
import { Actividad } from '../models/Actividad';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl: string = environment.url+"api/Actividads";

  constructor(private http:HttpClient) { }

  getAllActividades():Observable<ActividadCard[]>{
    return this.http.get<ActividadCard[]>(this.baseUrl);
  }

  getActividadById(id:number): Observable<ActividadCompleta>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const actividad: ActividadCompleta = {
          id: response.id,
          titulo: response.titulo,
          descripcion: response.descripcion,
          direccion: {
            id: response.direccion.id,
            pais: response.direccion.pais,
            calle: response.direccion.calle,
            numero: response.direccion.numero,
            codigoPostal: response.direccion.codigoPostal,
            provincia: response.direccion.provincia,
            localidad: response.direccion.localidad
        },
          imagenes: response.imagenes
        };
        return actividad;
      })
    );
  }

  getActividadesByOfertaId(id_oferta:number):Observable<Actividad>{
    return this.http.get<Actividad>('api/OfertasActividades/IdOferta/'+id_oferta);
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
