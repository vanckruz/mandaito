import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  test(usuario: {email: string,clave: string}): Observable <any> {
    let user = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    return this.http.post(routes.login(), user, { headers: headers });
  }

}
