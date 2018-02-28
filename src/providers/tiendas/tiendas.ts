import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class TiendasProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TiendasProvider Provider');
  }

  get($id): Observable<any> {
    return this.http.get(routes.stores($id));
  }
}
