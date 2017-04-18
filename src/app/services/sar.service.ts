import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { CONFIG } from '../shared/config';


let baseUrl = CONFIG.urls.baseUrl;


@Injectable()
export class SARService {
	
	constructor(private http: Http) {
	}


	private _createAuthorizationHeader(headers: Headers) {
		headers.append('Authorization', 'Bearer ');
	}


	/**
	 * Catches http errors
	 * @param error 
	 */
	private handleError(error: Response) {
		let msg = `Status ${error.status}, url: ${error.url}`;
		console.error(msg);
		return Observable.throw(msg || 'Server error');
	}

	/**
	 * Get alarms 
	 */
	getMissions() {

	}




	/**
	 * Filter out ID from JSON-object. 
	 * @param key 
	 * @param value 
	 */
	private _replacer(key, value) {
		if (key == "ID") return undefined;
		else return value;
	}



}