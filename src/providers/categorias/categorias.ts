import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';
@Injectable()
export class CategoriasProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoriasProvider Provider');
  }

  get(): Observable<any> {
    return this.http.get(routes.categories());
  }
}
