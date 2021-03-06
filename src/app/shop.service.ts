import { Injectable } 
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { Observable, of } 
	from 'rxjs';

import { buyResponse }
	from './buyResponse';
	
import { shopSearchResponse }
	from './shopSearchResponse';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  	constructor(
  		private http    	: HttpClient,
	) {}
  	

	buy(goodID: string): Observable<buyResponse>{
		return this.http.post<buyResponse>(`${localStorage.getItem("server")}/shop/good/${goodID}/buy`, {});
	}
	
	search(): Observable<shopSearchResponse>{
		return this.http.post<shopSearchResponse>(`${localStorage.getItem("server")}/shop/search`, {});
	}

}
