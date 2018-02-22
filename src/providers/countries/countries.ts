import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CountriesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CountriesProvider Provider');
  }

	get(): Observable<any>{
		return this.http.get('https://restcountries.eu/rest/v2/all');
	}

}