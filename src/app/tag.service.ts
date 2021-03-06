import { Injectable } 
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';


import { Observable, of } 
	from 'rxjs';

import { Tag }
	from './tag';


@Injectable({
  providedIn: 'root',
})


export class TagService {

  	constructor(
  		private http    	: HttpClient,
	) {}
  	

	search(): Observable<searchTagResponse>{
		return this.http.post<searchTagResponse>(`${localStorage.getItem("server")}/tag/search`, { condition: {} });
	}
}

interface searchTagResponse{
	ok			: string;
	response 	: string;
	problem		: string;
	tags		: [Tag]
}
