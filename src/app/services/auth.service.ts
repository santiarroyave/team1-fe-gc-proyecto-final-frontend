import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.url+'api/Auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  showAdminBoard = false;

  constructor(private http: HttpClient) { }

  login(email: string, pass: string): Observable<any>{
    return this.http.post(AUTH_API+'signin',{
      email,
      pass
    }, httpOptions);
  }

  register(nombre:string,email: string, pass: string): Observable<any>{
    return this.http.post(AUTH_API+'signup',{
      nombre,
      email,
      pass
    }, httpOptions);
  }
}
