import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { CONFIG } from '../shared/config';



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
	getAlarms() {

	}








	/**
	 * Filter out ID from JSON-object. 
	 * @param key 
	 * @param value 
	 */
	_replacer(key, value) {
		if (key == "ID") return undefined;
		else return value;
	}



}