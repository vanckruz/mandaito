import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class TiendasProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TiendasProvider Provider');
  }

  get($id, $lat, $long): Observable<any> {

    let Params = new HttpParams();

    console.log($lat, $long)
    if($lat != undefined && $long != undefined){
      Params = Params.append('email', $lat);
      Params = Params.append('name', $long);
    }

    // return this.http.get(routes.stores($id, $lat, $long), {params: Params});
    return this.http.get(routes.stores($id, $lat, $long));
  }
}
