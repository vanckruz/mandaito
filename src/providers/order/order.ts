import { HttpClient } from '@angular/common/http';
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
}
