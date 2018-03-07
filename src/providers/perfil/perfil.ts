import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class PerfilProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PerfilProvider Provider');
  }

  get($idUser): Observable<any> {
    return this.http.get(routes.perfil($idUser));
  }

}
