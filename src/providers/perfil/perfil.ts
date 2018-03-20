import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  setDirections($idUser, data): Observable<any>{
    let directions = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(routes.direcciones($idUser), directions, { headers: headers });    
  }

  setMethods($idUser, data): Observable<any>{
    let methods = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(routes.metodos($idUser), methods, { headers: headers });    
  }
}
