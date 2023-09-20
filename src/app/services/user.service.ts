import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { Observable, catchError } from 'rxjs';
import { Direccion } from '../models/Direccion';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(environment.url+'api/Usuarios/' + id);
  }

  updateUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(environment.url+'api/Usuarios/' + user.id, user).pipe(
      catchError((error) => {
        console.error('Error al actualizar el usuario:', error);
        throw error;
      })
    );
  }
  
  getUserDireccion(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(environment.url+'api/Direccions/' + id);
  }

  updateDireccionUser(direccion: Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(environment.url+'api/Direccions/' + direccion.id, direccion).pipe(
      catchError((error) => {
        console.error('Error al actualizar la dirección:', error);
        throw error;
      })
    );
  }
}
