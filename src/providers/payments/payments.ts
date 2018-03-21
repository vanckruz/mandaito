import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class PaymentsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PaymentsProvider Provider');
  }

  pay($idUser, data): Observable<any> {
    let dataParse = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(routes.order($idUser), dataParse, { headers: headers });
  }
}
