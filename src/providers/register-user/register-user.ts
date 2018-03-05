import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routes } from '../../config/routes';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RegisterUserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RegisterUserProvider Provider');
  }

  register(usuario: { nombre: string, apellido: string, correo: string, idProvincia: number, telefono: string }): Observable<any> {
    let user = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    return this.http.post(routes.registerUser(), user, { headers: headers });
  }
}
