import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';
@Injectable()
export class ProvinciasProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProvinciasProvider Provider');
  }

  get(): Observable <any> {
    return this.http.get(routes.provincias());
  }
}
