import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class ProductosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductosProvider Provider');
  }

  get($id): Observable<any> {
    return this.http.get(routes.products($id));
  }
}
