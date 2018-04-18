import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  getActive($idPerfil): Observable<any> {
    return this.http.get(routes.orderActive($idPerfil));
  }

  detailOrder($idPerfil, $idOrder): Observable<any> {
    return this.http.get(routes.detailOrden($idPerfil, $idOrder));
  }  

  changeStatus(numOrden, data){
    let payload = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    return this.http.post(routes.statusOrden(numOrden), payload, { headers: headers });

  }

  calificar(numOrden, data){
    let payload = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    return this.http.post(routes.calificar(numOrden), payload, { headers: headers });
  }

  closeOrder(numOrden, data){
    let payload = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    return this.http.post(routes.cerrar(numOrden), payload, { headers: headers });
  }
}
